package seb39_40.coffeewithme.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

public class BusinessLogicException extends RuntimeException {
    @Getter
    private HttpStatus status;
    @Getter
    private ExceptionCode exceptionCode;

    public BusinessLogicException(HttpStatus status,String message) {
        super(message);
        this.status=status;
    }
    public BusinessLogicException(ExceptionCode exceptionCode){
        super(exceptionCode.getMessage());
        this.exceptionCode = exceptionCode;
    }
}
