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
    private List<FieldError> fieldErrors;
    private List<ConstraintViolationError> violationErrors;

    private ErrorResponse(final List<FieldError> fieldErrors,
                          final List<ConstraintViolationError> violationErrors,
                          final Integer status,final String message) {
        this.fieldErrors = fieldErrors;
        this.violationErrors = violationErrors;
        this.status=status;
        this.message=message;
    }

    public static ErrorResponse of(BindingResult bindingResult, HttpStatus httpStatus) {
        return new ErrorResponse(FieldError.of(bindingResult), null, httpStatus.value(), httpStatus.getReasonPhrase());
    }

    public static ErrorResponse of(Set<ConstraintViolation<?>> violations, HttpStatus httpStatus) {
        return new ErrorResponse(null, ConstraintViolationError.of(violations), httpStatus.value(), httpStatus.getReasonPhrase());
    }
    public static ErrorResponse of(HttpStatus status,String message){
        return new ErrorResponse(null,null,status.value(), message);
    }

    public static ErrorResponse of(HttpStatus httpStatus){
        return new ErrorResponse(null,null, httpStatus.value(), httpStatus.getReasonPhrase());
    }

    @Getter
    public static class FieldError {
        private String field;
        private Object rejectedValue;
        private String reason;

        private FieldError(String field, Object rejectedValue, String reason) {
            this.field = field;
            this.rejectedValue = rejectedValue;
            this.reason = reason;
        }

        public static List<FieldError> of(BindingResult bindingResult) {
            final List<org.springframework.validation.FieldError> fieldErrors =
                    bindingResult.getFieldErrors();
            return fieldErrors.stream()
                    .map(error -> new FieldError(
                            error.getField(),
                            error.getRejectedValue() == null ?
                                    "" : error.getRejectedValue().toString(),
                            error.getDefaultMessage()))
                    .collect(Collectors.toList());
        }
    }

    @Getter
    public static class ConstraintViolationError {
        private String propertyPath;
        private Object rejectedValue;
        private String reason;

        private ConstraintViolationError(String propertyPath, Object rejectedValue,
                                         String reason) {
            this.propertyPath = propertyPath;
            this.rejectedValue = rejectedValue;
            this.reason = reason;
        }

        public static List<ConstraintViolationError> of(
                Set<ConstraintViolation<?>> constraintViolations) {
            return constraintViolations.stream()
                    .map(constraintViolation -> new ConstraintViolationError(
                            constraintViolation.getPropertyPath().toString(),
                            constraintViolation.getInvalidValue().toString(),
                            constraintViolation.getMessage()
                    )).collect(Collectors.toList());
        }
    }
}
