package seb39_40.coffeewithme.cafe.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import seb39_40.coffeewithme.cafe.domain.Cafe;
import seb39_40.coffeewithme.cafe.mapper.CafeMapper;
import seb39_40.coffeewithme.cafe.service.CafePostService;
import seb39_40.coffeewithme.cafe.service.CafeService;
import seb39_40.coffeewithme.exception.BusinessLogicException;
import seb39_40.coffeewithme.exception.ExceptionCode;
import seb39_40.coffeewithme.image.domain.Image;
import seb39_40.coffeewithme.image.service.ImageService;
import seb39_40.coffeewithme.tag.service.TagService;

import java.util.Objects;

import static seb39_40.coffeewithme.cafe.dto.CafeRequestDto.*;

@Service
@RequiredArgsConstructor
public class CafePostServiceImpl implements CafePostService {
    private final CafeService cafeService;
    private final TagService tagService;
    private final ImageService imageService;
    private final CafeMapper cafeMapper;


    @Transactional
    public Long register(Post postDto){
        Cafe cafe = cafeMapper.cafeDtoToCafe(postDto);
        cafe.setCafeTags(tagService.createCafeTag(cafe, postDto.getTags()));

        // 메인, 메뉴 순으로 이미지 저장
        if (Objects.equals(postDto.getMainImg(), postDto.getMenuImg())) throw new BusinessLogicException(ExceptionCode.INVALID_INPUT_VALUE);
        cafe.addImages(imageService.findById(postDto.getMainImg()));
        cafe.addImages(imageService.findById(postDto.getMenuImg()));

        for (Image image : cafe.getImages()){
            image.saveImg();
        }

        return cafeService.save(cafe);
    }

    @Transactional
    public void delete(Long id){
        Cafe cafe = cafeService.find(id);
        for (Image image : cafe.getImages()){
            image.deleteImg();
        }
        cafeService.delete(cafe);
    }
}
