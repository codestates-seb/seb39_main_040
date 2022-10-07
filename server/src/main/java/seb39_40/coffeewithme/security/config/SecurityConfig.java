package seb39_40.coffeewithme.security.config;


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
import seb39_40.coffeewithme.security.authorization.CustomAuthorizationFilter;
import seb39_40.coffeewithme.security.authentication.AuthenticationFailureHandler;
import seb39_40.coffeewithme.security.authentication.AuthenticationSuccessHandler;
import seb39_40.coffeewithme.security.authentication.CustomAuthenticationFilter;


@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableGlobalMethodSecurity(securedEnabled = true, prePostEnabled = true)
public class SecurityConfig {


    private final CorsFilter corsFilter;
    private final AuthenticationSuccessHandler authenticationSuccessHandler;
    private final AuthenticationFailureHandler authenticationFailureHandler;
    private final CustomAuthorizationFilter customAuthorizationFilter;
    

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http.headers().frameOptions().disable();

        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .logout().disable()
                .httpBasic().disable()
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
