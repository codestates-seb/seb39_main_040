package seb39_40.coffeewithme.image.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import seb39_40.coffeewithme.exception.BusinessLogicException;
import seb39_40.coffeewithme.exception.ExceptionCode;
import seb39_40.coffeewithme.image.domain.Image;
import seb39_40.coffeewithme.image.dto.ImageResponseDto;
import seb39_40.coffeewithme.image.mapper.ImageMapper;
import seb39_40.coffeewithme.image.repository.ImageRepository;
import seb39_40.coffeewithme.image.service.ImageService;
import seb39_40.coffeewithme.image.service.S3UploaderService;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ImageServiceImpl implements ImageService {
    private final ImageRepository imageRepository;
    private final ImageMapper imageMapper;
    private final S3UploaderService s3Service;

    public Long save(String url){
        String[] split = url.split("/");
        String fileName = split[split.length - 1];
        Image image = imageRepository.save(Image.builder()
                .name(fileName).build());
        return image.getId();
    }

    public void delete(Image img) {
        if (!img.getName().equals("basic-profile.jpg")) s3Service.delete(img);
        imageRepository.delete(img);
    }

    public Image findById(Long id){
        return imageRepository.findById(id).orElseThrow(() -> new BusinessLogicException(ExceptionCode.IMAGE_NOT_FOUND));
    }

    public ImageResponseDto findImage(Long id){
        return imageMapper.imageToImageResponseDto(findById(id));
    }

    public List<Image> findTempImages() {

//        LocalDateTime tenDaysAgo = now.minusDays(10);
        return imageRepository.findByCafeIdIsNullAndReviewIdIsNullAndUserIdIsNull();
    }
}
