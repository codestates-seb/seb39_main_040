package seb39_40.coffeewithme.image.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import seb39_40.coffeewithme.image.domain.Image;
import seb39_40.coffeewithme.image.repository.ImageRepository;

@Service
@RequiredArgsConstructor
public class ImageService {
    private final ImageRepository imageRepository;

    public Long saveImage(String url){
        Image image = imageRepository.save(Image.builder().path(url).build());
        return image.getId();
    }
}
