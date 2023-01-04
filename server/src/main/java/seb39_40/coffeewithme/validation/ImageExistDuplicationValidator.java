package seb39_40.coffeewithme.validation;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import seb39_40.coffeewithme.cafe.domain.Cafe;
import seb39_40.coffeewithme.exception.BusinessLogicException;
import seb39_40.coffeewithme.exception.ExceptionCode;
import seb39_40.coffeewithme.image.domain.Image;
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
        if (isExist){
            try {
                Image image = imageRepository.findById(id).get();
                if (image.getUser() != null || image.getCafe() != null || image.getReview() != null){
                    throw new BusinessLogicException(ExceptionCode.ALREADY_USED_IMAGE);
                }
            }catch (Exception e){
                return false;
            }
        }
        return isExist;
    }
}
