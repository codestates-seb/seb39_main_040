package seb39_40.coffeewithme.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;

import javax.validation.ConstraintViolation;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Getter
public class ErrorResponse {

    private Integer status;
    private String message;


    public ErrorResponse(final HttpStatus status, final String message) {
        this.status=status.value();
        this.message=message;
    }

    //public static ErrorResponse of(HttpStatus httpStatus, String message){
    //    return new ErrorResponse(httpStatus.value(), message);
    //}

    //public static ErrorResponse of(HttpStatus httpStatus){
    //    return new ErrorResponse(null,null, httpStatus.value(), httpStatus.getReasonPhrase());
    //}
}
