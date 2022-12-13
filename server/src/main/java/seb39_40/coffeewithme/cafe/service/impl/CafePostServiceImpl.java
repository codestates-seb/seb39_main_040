package seb39_40.coffeewithme.cafe.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import seb39_40.coffeewithme.cafe.domain.Cafe;
import seb39_40.coffeewithme.cafe.service.CafePostService;
import seb39_40.coffeewithme.image.service.ImageService;

@Service
@RequiredArgsConstructor
public class CafePostServiceImpl implements CafePostService {
    private final ImageService imageService;
    private final CafeServiceImpl cafeServiceImpl;

    @Transactional
    public Long register(Cafe cafe){
        imageService.findById(cafe.getMainImg()).saveImg();
        imageService.findById(cafe.getMenuImg()).saveImg();
        return cafeServiceImpl.save(cafe);
    }

    @Transactional
    public void delete(Long id){
        Cafe cafe = cafeServiceImpl.find(id);
        imageService.findById(cafe.getMainImg()).deleteImg();
        imageService.findById(cafe.getMenuImg()).deleteImg();
        cafeServiceImpl.delete(cafe);
    }
}
