package seb39_40.coffeewithme.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
//import seb39_40.coffeewithme.common.exeption.ErrorResponse;
import seb39_40.coffeewithme.exception.ExceptionCode;
import seb39_40.coffeewithme.user.domain.User;
import seb39_40.coffeewithme.user.repository.UserRepository;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static javax.servlet.http.HttpServletResponse.SC_BAD_REQUEST;
import static javax.servlet.http.HttpServletResponse.SC_UNAUTHORIZED;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Component
@RequiredArgsConstructor
public class CustomAuthorizationFilter extends OncePerRequestFilter {
    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String path = request.getServletPath();
        String at = request.getHeader("AccessToken");

        //인가 필요 없는 요청은 넘어가도록
        if (path.equals("/users/login") || path.equals("/users/signup")) {
            filterChain.doFilter(request, response);
        }else if(path.equals("/users/token")){
            String jwt = jwtProvider.substringToken(at);
            Jws<Claims> claims = jwtProvider.parseToken(jwt);
            String email=jwtProvider.getEmailToClaims(claims);
            if(!jwtProvider.validationTheSameToken(email,jwt)){
                response.setStatus(SC_UNAUTHORIZED);
                response.setContentType(APPLICATION_JSON_VALUE);
                response.setCharacterEncoding("utf-8");
                //ErrorResponse errorResponse = new ErrorResponse(401, "유효한 Refresh Token이 아닙니다.");
                //new ObjectMapper().writeValue(response.getWriter(), errorResponse);
                new ObjectMapper().writeValue(response.getWriter(), ExceptionCode.TOKEN_UNAUTHORIZED);
           // }else{
//
//                String new_at = jwtProvider.createAccessToken(user.getUser().getId(), user.getUser().getEmail());
//                String new_rt = jwtProvider.createRefreshToken(user.getUser().getEmail());
//
//                jwtProvider.saveRefreshToken(user.getUser().getEmail(),rt);
//                response.setHeader("AccessToken",TYPE+at);
//                response.setHeader("RefreshToken",TYPE+rt);
//                filterChain.doFilter(request, response);
            }
        }else if(at==null || !at.startsWith("Bearer ")) {
            System.out.println("** Not a jwt token");
            response.setStatus(SC_BAD_REQUEST);
            response.setContentType(APPLICATION_JSON_VALUE);
            response.setCharacterEncoding("utf-8");
            //ErrorResponse errorResponse = new ErrorResponse(400, "JWT Token이 존재하지 않습니다.");
            //new ObjectMapper().writeValue(response.getWriter(), errorResponse);
            new ObjectMapper().writeValue(response.getWriter(), ExceptionCode.TOKEN_BAD_REQUEST);
       //정상적으로 인가 요청이 들어온 경우
        }else{
            String jwt = jwtProvider.substringToken(at);
            Jws<Claims> claims = jwtProvider.parseToken(jwt);
            String email = jwtProvider.getEmailToClaims(claims);

            //만료된 토큰의 경우
            if (!jwtProvider.validationTimeToken(claims)) {
                System.out.println("** Expired token");
                response.setStatus(SC_UNAUTHORIZED);
                response.setContentType(APPLICATION_JSON_VALUE);
                response.setCharacterEncoding("utf-8");
                //ErrorResponse errorResponse = new ErrorResponse(401, "JWT 토큰이 만료되었습니다.");
                //new ObjectMapper().writeValue(response.getWriter(), errorResponse);
                new ObjectMapper().writeValue(response.getWriter(), ExceptionCode.TOKEN_EXPIRATION);
            }else {
                User userEntity = userRepository.findByEmail(email).get();

                CustomUserDetails principalDetails = new CustomUserDetails(userEntity);
                Authentication authentication = new UsernamePasswordAuthenticationToken(principalDetails, null, principalDetails.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authentication);

                filterChain.doFilter(request, response);
            }
        }
    }
}

