package seb39_40.coffeewithme.validation;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import seb39_40.coffeewithme.image.repository.ImageRepository;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

@Component
@RequiredArgsConstructor
public class ImageExistDuplicationValidator implements ConstraintValidator<ImageExist, Long> {
    private final ImageRepository imageRepository;

    @Override
    public void initialize(ImageExist constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(Long id, ConstraintValidatorContext context) {
        boolean isExist = imageRepository.findById(id).isPresent();
        return isExist;
    }
}
