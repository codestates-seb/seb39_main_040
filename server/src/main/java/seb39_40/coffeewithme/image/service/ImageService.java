package seb39_40.coffeewithme.image.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import seb39_40.coffeewithme.exception.BusinessLogicException;
import seb39_40.coffeewithme.exception.ExceptionCode;
import seb39_40.coffeewithme.image.domain.Image;
import seb39_40.coffeewithme.image.repository.ImageRepository;

@Service
@RequiredArgsConstructor
public class ImageService {
    private final ImageRepository imageRepository;

    public Long save(String url){
        Image image = imageRepository.save(Image.builder().path(url).build());
        return image.getId();
    }

    public Image findById(Long id){
        return imageRepository.findById(id).orElseThrow(() -> new BusinessLogicException(ExceptionCode.IMAGE_NOT_FOUND));
    }
}
