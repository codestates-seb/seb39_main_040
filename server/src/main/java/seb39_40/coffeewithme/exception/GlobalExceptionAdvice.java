package seb39_40.coffeewithme.exception;

import io.jsonwebtoken.JwtException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.validation.ConstraintViolationException;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionAdvice {

    @ExceptionHandler
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponse handleBusinessLogicException(BusinessLogicException e) {
        final ErrorResponse response = ErrorResponse.of(e.getStatus(),e.getMessage());
        log.error("** BusinessLogicException - status : {} , message : {}",response.getStatus(),response.getMessage());
        return response;
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.METHOD_NOT_ALLOWED)
    public ErrorResponse handleMethodNotAllowedException(HttpRequestMethodNotSupportedException e) {
        final ErrorResponse response = ErrorResponse.of(HttpStatus.METHOD_NOT_ALLOWED);
        log.error("** HttpRequestMethodNotSupportedException : {}", response.getMessage());
        return response;
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleMethodArgumentNotValidException(
            MethodArgumentNotValidException e) {
        final ErrorResponse response = ErrorResponse.of(e.getBindingResult(), HttpStatus.BAD_REQUEST);
        log.error("** MethodArgumentNotValidException - count : {}",response.getFieldErrors().stream().count());
        return response;
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleConstraintViolationException(
            ConstraintViolationException e) {
        final ErrorResponse response = ErrorResponse.of(e.getConstraintViolations(), HttpStatus.BAD_REQUEST);
        log.error("** ConstraintViolationException - count : {}", response.getViolationErrors().stream().count());
        return response;
    }
}
