package seb39_40.coffeewithme.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;
//import seb39_40.coffeewithme.common.exeption.ErrorResponse;
import seb39_40.coffeewithme.exception.ErrorResponse;
import seb39_40.coffeewithme.exception.ExceptionCode;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Component
public class AuthenticationFailureHandler implements org.springframework.security.web.authentication.AuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        if(exception instanceof BadCredentialsException){
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType(APPLICATION_JSON_VALUE);
            response.setCharacterEncoding("utf-8");
            ErrorResponse e = new ErrorResponse(HttpStatus.UNAUTHORIZED,"Email 혹은 Password가 일치하지 않습니다.");
            new ObjectMapper().writeValue(response.getWriter(), e);
        }
        else if(exception instanceof DisabledException){
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.setContentType(APPLICATION_JSON_VALUE);
            response.setCharacterEncoding("utf-8");
            ErrorResponse e = new ErrorResponse(HttpStatus.BAD_REQUEST,"존재하지 않는 회원입니다.");
            new ObjectMapper().writeValue(response.getWriter(), e);
        }
    }
}
