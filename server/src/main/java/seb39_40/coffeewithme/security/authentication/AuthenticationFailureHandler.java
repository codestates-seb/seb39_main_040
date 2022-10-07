package seb39_40.coffeewithme.security.authentication;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;
//import seb39_40.coffeewithme.common.exeption.ErrorResponse;
import seb39_40.coffeewithme.exception.ErrorResponse;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Slf4j
@Component
public class AuthenticationFailureHandler implements org.springframework.security.web.authentication.AuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        if(exception instanceof BadCredentialsException){
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType(APPLICATION_JSON_VALUE);
            response.setCharacterEncoding("utf-8");
            ErrorResponse e = ErrorResponse.of(HttpStatus.UNAUTHORIZED,"Email 혹은 Password가 일치하지 않습니다.");
            log.error("** BadCredentialsException in Login : Email 혹은 Password가 일치하지 않습니다.");
            new ObjectMapper().writeValue(response.getWriter(), e);
        }
        else if(exception instanceof DisabledException){
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.setContentType(APPLICATION_JSON_VALUE);
            response.setCharacterEncoding("utf-8");
            ErrorResponse e = ErrorResponse.of(HttpStatus.BAD_REQUEST,"존재하지 않는 회원입니다.");
            log.error("** DisabledException in Login : 존재하지 않는 회원입니다.");
            new ObjectMapper().writeValue(response.getWriter(), e);
        }
    }
}
