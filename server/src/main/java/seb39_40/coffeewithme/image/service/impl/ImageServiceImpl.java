package seb39_40.coffeewithme.image.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import seb39_40.coffeewithme.exception.BusinessLogicException;
import seb39_40.coffeewithme.exception.ExceptionCode;
import seb39_40.coffeewithme.image.domain.Image;
import seb39_40.coffeewithme.image.dto.ImageResponseDto;
import seb39_40.coffeewithme.image.mapper.ImageMapper;
import seb39_40.coffeewithme.image.repository.ImageRepository;
import seb39_40.coffeewithme.image.service.ImageService;
import seb39_40.coffeewithme.image.service.S3UploaderService;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ImageServiceImpl implements ImageService {
    private final ImageRepository imageRepository;
    private final ImageMapper imageMapper;
    private final S3UploaderService s3Service;

    private String defaultImageName = "basic-profile.jpg"; // 기본 프로필 이미지

    public Long save(MultipartFile file) throws IOException {
        String[] split = s3Service.upload(file).split("/");
        String fileName = split[split.length - 1];
        Image image = imageRepository.save(Image.builder()
                .name(fileName).build());
        return image.getId();
    }

    public void delete(Long id) {
        Image img = findById(id);
        if (!img.getName().equals(defaultImageName)) s3Service.delete(img);
        imageRepository.delete(img);
    }

    public Image findById(Long id){
        return imageRepository.findById(id).orElseThrow(() -> new BusinessLogicException(ExceptionCode.IMAGE_NOT_FOUND));
    }

    public ImageResponseDto findImage(Long id){
        return imageMapper.imageToImageResponseDto(findById(id));
    }

    public List<Image> findTempImages() {
        return imageRepository.findByCafeIdIsNullAndReviewIdIsNullAndUserIdIsNull();
    }

    @Override
    public Long saveDefaultImage() {
        return imageRepository.save(Image.builder()
                .name(defaultImageName).build()).getId();
    }
}
