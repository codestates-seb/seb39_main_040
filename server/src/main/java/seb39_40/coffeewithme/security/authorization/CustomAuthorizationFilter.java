package seb39_40.coffeewithme.security.authorization;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import seb39_40.coffeewithme.exception.ErrorResponse;
import seb39_40.coffeewithme.security.jwt.JwtProvider;
import seb39_40.coffeewithme.security.userdetails.CustomUserDetails;
import seb39_40.coffeewithme.user.domain.User;
import seb39_40.coffeewithme.user.repository.UserRepository;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Slf4j
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

            try{
                String jwt = jwtProvider.substringToken(token);
                Claims claims = jwtProvider.parseToken(jwt);
                String email = jwtProvider.getEmailToClaims(claims);

                if(path.equals("/users/token")){
                    jwtProvider.validationTheSameToken(email, jwt);
                    User user = userRepository.findByEmail(email).get();
                    String new_at = jwtProvider.createAccessToken(user.getId(), email, user.getRoles());
                    String new_rt = jwtProvider.createRefreshToken(email);

                    jwtProvider.saveRefreshToken(email, new_rt);
                    response.setHeader("AccessToken", TYPE + new_at);
                    response.setHeader("RefreshToken", TYPE + new_rt);
                }
                    User userEntity = userRepository.findByEmail(email).get();

                    CustomUserDetails principalDetails = new CustomUserDetails(userEntity);
                    Authentication authentication = new UsernamePasswordAuthenticationToken(principalDetails, null, principalDetails.getAuthorities());
                    SecurityContextHolder.getContext().setAuthentication(authentication);

                    filterChain.doFilter(request, response);

            }catch(ExpiredJwtException e){
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.setContentType(APPLICATION_JSON_VALUE);
                response.setCharacterEncoding("utf-8");
                ErrorResponse errorResponse = ErrorResponse.of(HttpStatus.UNAUTHORIZED,"????????? Token ?????????. ????????? ????????????.");
                log.error("** ExpiredJwtException in Authorization : ????????? Token?????? ????????? ???????????????.");
                new ObjectMapper().writeValue(response.getWriter(), errorResponse);
            }catch(NullPointerException e){
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.setContentType(APPLICATION_JSON_VALUE);
                response.setCharacterEncoding("utf-8");
                ErrorResponse errorResponse = ErrorResponse.of(HttpStatus.BAD_REQUEST,"?????? ????????? ????????? ????????? ???????????????.");
                log.error("** NullPointerException in Authorization : ?????? ????????? ????????? ????????? ???????????????.");
                new ObjectMapper().writeValue(response.getWriter(), errorResponse);
            }catch(JwtException e){
                response.setStatus(HttpServletResponse.SC_PRECONDITION_FAILED);
                response.setContentType(APPLICATION_JSON_VALUE);
                response.setCharacterEncoding("utf-8");
                ErrorResponse errorResponse = ErrorResponse.of(HttpStatus.PRECONDITION_FAILED,e.getMessage());
                log.error("** JwtException in Authorization : {}",e.getMessage());
                new ObjectMapper().writeValue(response.getWriter(), errorResponse);
            }
        }
    }
}

