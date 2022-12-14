package seb39_40.coffeewithme.image.service;

import seb39_40.coffeewithme.image.domain.Image;

import java.util.List;

public interface ImageService {
    Long save(String url);
    void delete(Image img);
    Image findById(Long id);
    List<Image> findTempImages();
}
