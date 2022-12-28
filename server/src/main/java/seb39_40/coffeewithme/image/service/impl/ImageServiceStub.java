package seb39_40.coffeewithme.image.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import seb39_40.coffeewithme.common.domain.Status;
import seb39_40.coffeewithme.exception.BusinessLogicException;
import seb39_40.coffeewithme.exception.ExceptionCode;
import seb39_40.coffeewithme.image.domain.Image;
import seb39_40.coffeewithme.image.repository.ImageRepository;
import seb39_40.coffeewithme.image.service.ImageService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ImageServiceStub implements ImageService {
    private final ImageRepository imageRepository;

    @Override
    public Long save(String url) {
        System.out.println(url);
        return imageRepository.save(Image.builder()
                .name(url)
                .status(Status.TEMP).build()).getId();
    }

    @Override
    public void delete(Image img) {
        imageRepository.delete(img);
    }

    @Override
    public Image findById(Long id) {
        return imageRepository.findById(id).orElseThrow(() -> new BusinessLogicException(ExceptionCode.IMAGE_NOT_FOUND));
    }

    @Override
    public List<Image> findTempImages() {
        return null;
    }
}
