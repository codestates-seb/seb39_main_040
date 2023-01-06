package seb39_40.coffeewithme.validation;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Documented
@Target({ElementType.METHOD, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = {ImageExistDuplicationValidator.class})
public @interface ImageExist {
    String message() default "사용할 수 없는 이미지입니다.";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
