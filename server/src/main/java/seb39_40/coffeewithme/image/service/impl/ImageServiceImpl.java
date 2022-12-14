package seb39_40.coffeewithme.image.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import seb39_40.coffeewithme.common.domain.Status;
import seb39_40.coffeewithme.exception.BusinessLogicException;
import seb39_40.coffeewithme.exception.ExceptionCode;
import seb39_40.coffeewithme.image.domain.Image;
import seb39_40.coffeewithme.image.repository.ImageRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ImageService {
    private final ImageRepository imageRepository;
    private final S3UploaderService s3Service;

    public Long save(String url){
        Image image = imageRepository.save(Image.builder()
                .path(url).status(Status.TEMP).build());
        return image.getId();
    }

    public void delete(Image img) {
        s3Service.delete(img);
        imageRepository.delete(img);
    }

    public Image findById(Long id){
        return imageRepository.findById(id).orElseThrow(() -> new BusinessLogicException(ExceptionCode.IMAGE_NOT_FOUND));
    }

    public List<Image> findTempImages() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime tenDaysAgo = now.minusDays(10);
        return imageRepository.findByStatusAndModifiedAtLessThan(Status.TEMP, tenDaysAgo);
    }
}
