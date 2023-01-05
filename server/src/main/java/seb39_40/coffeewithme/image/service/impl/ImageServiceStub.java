package seb39_40.coffeewithme.image.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import seb39_40.coffeewithme.common.domain.Status;
import seb39_40.coffeewithme.exception.BusinessLogicException;
import seb39_40.coffeewithme.exception.ExceptionCode;
import seb39_40.coffeewithme.image.domain.Image;
import seb39_40.coffeewithme.image.dto.ImageResponseDto;
import seb39_40.coffeewithme.image.mapper.ImageMapper;
import seb39_40.coffeewithme.image.repository.ImageRepository;
import seb39_40.coffeewithme.image.service.ImageService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ImageServiceStub implements ImageService {
    private final ImageRepository imageRepository;
    private final ImageMapper imageMapper;

    public Long save(MultipartFile file) {
        return imageRepository.save(Image.builder()
                .name(file.getName()).build()).getId();
    }

    public void delete(Long id) {
        Image img = findById(id);
        imageRepository.delete(img);
    }

    public Image findById(Long id) {
        return imageRepository.findById(id).orElseThrow(() -> new BusinessLogicException(ExceptionCode.IMAGE_NOT_FOUND));
    }

    public ImageResponseDto findImage(Long id){
        return imageMapper.imageToImageResponseDto(findById(id));
    }

    public List<Image> findTempImages() {
        return null;
    }

    @Override
    public Long saveDefaultImage() {
        return imageRepository.save(Image.builder()
                .name("basic-profile.jpg").build()).getId();
    }
}
