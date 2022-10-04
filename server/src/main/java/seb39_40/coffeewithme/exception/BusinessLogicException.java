package seb39_40.coffeewithme.exception;

import lombok.Getter;

public class BusinessLogicException extends RuntimeException {
    @Getter
    private ErrorResponse errorResponse;
    @Getter
    private ExceptionCode exceptionCode;

    public BusinessLogicException(ErrorResponse errorResponse) {
        this.errorResponse = errorResponse;
    }
    public BusinessLogicException(ExceptionCode exceptionCode){
        super(exceptionCode.getMessage());
        this.exceptionCode = exceptionCode;
    }
}
