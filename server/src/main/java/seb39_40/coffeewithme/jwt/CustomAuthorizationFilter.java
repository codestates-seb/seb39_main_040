package seb39_40.coffeewithme.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import seb39_40.coffeewithme.exception.ErrorResponse;
import seb39_40.coffeewithme.exception.ExceptionCode;
import seb39_40.coffeewithme.user.domain.User;
import seb39_40.coffeewithme.user.repository.UserRepository;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Component
@RequiredArgsConstructor
public class CustomAuthorizationFilter extends OncePerRequestFilter {
    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;
    private String TYPE="Bearer ";

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String path = request.getServletPath();
        String token;

        if (path.equals("/users/login") || path.equals("/users/signup")
                || (request.getRequestURI().startsWith("/cafe") && request.getMethod().equals("GET"))) {
            filterChain.doFilter(request, response);
        }else {
            if(path.equals("/users/token"))
                token = request.getHeader("RefreshToken");
            else
                token = request.getHeader("AccessToken");

            if(token==null || !token.startsWith(TYPE)){
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.setContentType(APPLICATION_JSON_VALUE);
                response.setCharacterEncoding("utf-8");
                ErrorResponse errorResponse = ErrorResponse.of(ExceptionCode.TOKEN_BAD_REQUEST);
                new ObjectMapper().writeValue(response.getWriter(), errorResponse);
            }
            String jwt = jwtProvider.substringToken(token);

            try {
                Claims claims = jwtProvider.parseToken(jwt);
                String email = jwtProvider.getEmailToClaims(claims);

                if(path.equals("/users/token")){

                    if (!jwtProvider.validationTheSameToken(email, jwt)){
                        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                        response.setContentType(APPLICATION_JSON_VALUE);
                        response.setCharacterEncoding("utf-8");
                        ErrorResponse errorResponse = ErrorResponse.of(ExceptionCode.TOKEN_UNAUTHORIZED);
                        new ObjectMapper().writeValue(response.getWriter(), errorResponse);
                    }
                    User user = userRepository.findByEmail(email).get();
                    String new_at = jwtProvider.createAccessToken(user.getId(), email);
                    String new_rt = jwtProvider.createRefreshToken(email);

                    jwtProvider.saveRefreshToken(email, new_rt);
                    response.setHeader("AccessToken", TYPE + new_at);
                    response.setHeader("RefreshToken", TYPE + new_rt);
                    filterChain.doFilter(request, response);
                } else {
                    User userEntity = userRepository.findByEmail(email).get();

                    CustomUserDetails principalDetails = new CustomUserDetails(userEntity);
                    Authentication authentication = new UsernamePasswordAuthenticationToken(principalDetails, null, principalDetails.getAuthorities());
                    SecurityContextHolder.getContext().setAuthentication(authentication);

                    filterChain.doFilter(request, response);
                }
            }catch(ExpiredJwtException e){
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.setContentType(APPLICATION_JSON_VALUE);
                response.setCharacterEncoding("utf-8");
                ErrorResponse errorResponse = ErrorResponse.of(ExceptionCode.TOKEN_EXPIRATION);
                new ObjectMapper().writeValue(response.getWriter(), errorResponse);
            }
        }
    }
}

