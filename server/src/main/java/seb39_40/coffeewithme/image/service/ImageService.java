package seb39_40.coffeewithme.image.service;

import org.springframework.web.multipart.MultipartFile;
import seb39_40.coffeewithme.image.domain.Image;
import seb39_40.coffeewithme.image.dto.ImageResponseDto;

import java.io.IOException;
import java.util.List;

public interface ImageService {
    Long save(MultipartFile file) throws IOException;
    void delete(Long id);

    Image findById(Long id);
    ImageResponseDto findImage(Long id);
    List<Image> findTempImages();

    Long saveDefaultImage();
}
