package seb39_40.coffeewithme.jwt;


import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.filter.CorsFilter;
import seb39_40.coffeewithme.user.service.UserService;


@Configuration //이것은 설정파일입니다
@EnableWebSecurity//스프링 시큐리티 필터를 스프링 필터 체인에 등록되도록 해주는 애너테이션
@RequiredArgsConstructor
@EnableGlobalMethodSecurity(securedEnabled = true, prePostEnabled = true) //Controller내의 핸들러 메서드 위에 바로 접근 권한 설정을 바로 해줄 수 있다
public class SecurityConfig {


    private final CorsFilter corsFilter;
    private final AuthenticationSuccessHandler authenticationSuccessHandler;
    private final AuthenticationFailureHandler authenticationFailureHandler;
    private final CustomAuthorizationFilter customAuthorizationFilter;
    

    @Bean //필터 체인 메서드를 스프링 컨테이너가 관리할 수 있는 빈으로 등록해 줍니다.
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf().disable(); //폼 태그로만 가능하고 postman같은 요청은 안된다는데 다음에 살퍼보자
        http.headers().frameOptions().disable(); //h2연결시 필요. mysql 쓸 거니까 이따가 빼주자

        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) //session이나 cookie를 만들지 않고 Stateeless로 진행하겠다
                .and()
                .formLogin().disable() //form login을 하지 않는다
                .logout().disable() //로그아웃 사용하지 않음
                .httpBasic().disable() //http 로그인 방식을 사용하지 않는다
                .apply(new CustomDsl())
                .and()
                .authorizeRequests()
                .anyRequest().permitAll();
        return http.build();
    }

    public class CustomDsl extends AbstractHttpConfigurer<CustomDsl, HttpSecurity> {

        @Override
        public void configure(HttpSecurity builder) throws Exception {
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);
            CustomAuthenticationFilter customAuthenticationFilter = new CustomAuthenticationFilter(authenticationManager);
            customAuthenticationFilter.setFilterProcessesUrl("/users/login");
            customAuthenticationFilter.setAuthenticationSuccessHandler(authenticationSuccessHandler);
            customAuthenticationFilter.setAuthenticationFailureHandler(authenticationFailureHandler);
            builder
                    .addFilter(corsFilter)
                    .addFilter(customAuthenticationFilter)
                    .addFilterBefore(customAuthorizationFilter, UsernamePasswordAuthenticationFilter.class);
        }
    }
}
