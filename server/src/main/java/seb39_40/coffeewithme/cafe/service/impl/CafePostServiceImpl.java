package seb39_40.coffeewithme.cafe.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import seb39_40.coffeewithme.cafe.domain.Cafe;
import seb39_40.coffeewithme.cafe.dto.CafeRequestDto.Patch;
import seb39_40.coffeewithme.cafe.mapper.CafeMapper;
import seb39_40.coffeewithme.cafe.service.CafePostService;
import seb39_40.coffeewithme.cafe.service.CafeService;
import seb39_40.coffeewithme.exception.BusinessLogicException;
import seb39_40.coffeewithme.exception.ExceptionCode;
import seb39_40.coffeewithme.image.domain.Image;
import seb39_40.coffeewithme.image.service.ImageService;
import seb39_40.coffeewithme.review.domain.Review;
import seb39_40.coffeewithme.review.service.ReviewService;
import seb39_40.coffeewithme.tag.service.TagService;

import java.util.List;
import java.util.Objects;

import static seb39_40.coffeewithme.cafe.dto.CafeRequestDto.*;

@Service
@RequiredArgsConstructor
public class CafePostServiceImpl implements CafePostService {
    private final CafeService cafeService;
    private final TagService tagService;
    private final ImageService imageService;
    private final ReviewService reviewService;
    private final CafeMapper cafeMapper;


    @Transactional
    public Long register(Post postDto){
        Cafe cafe = cafeMapper.cafeDtoToCafe(postDto);
        cafe.setCafeTags(tagService.createCafeTag(cafe, postDto.getTags()));

        // 메인, 메뉴 순으로 이미지 저장
        if (Objects.equals(postDto.getMainImg(), postDto.getMenuImg())) throw new BusinessLogicException(ExceptionCode.INVALID_INPUT_VALUE);
        cafe.addImages(imageService.findById(postDto.getMainImg()));
        cafe.addImages(imageService.findById(postDto.getMenuImg()));
        return cafeService.save(cafe);
    }

    @Transactional
    public void delete(Long id){
        Cafe cafe = cafeService.find(id);
        for (Image image : cafe.getImages()) {image.setCafe(null);}
        List<Review> reviews = cafe.getReviews();
        cafeService.delete(cafe);

        for (Review review : reviews) {
            review.getReviewImg().setReview(null);
            reviewService.delete(review);
        }
    }

    @Override
    public void repost(Long id, Patch patchDto) {
        // 권한 확인 추가 예정

        Cafe origin = cafeService.find(id);
        Cafe target = cafeMapper.cafeDtoToCafe(patchDto);
        origin.updateInformation(target);   // 기본 정보 수정

        List<Image> images = origin.getImages();    // 이미지 수정
        for (int i = 0; i < 2; i++) {
            if (!Objects.equals(images.get(i).getId(), patchDto.getMainImg())){
                images.get(i).setCafe(null);
                Image image = (i == 0? imageService.findById(patchDto.getMainImg()) : imageService.findById(patchDto.getMenuImg()));
                origin.getImages().set(i, image);
                image.setCafe(origin);
            }
        }

        tagService.updateCafeTag(origin, patchDto.getTags());   // 태그 수정
    }
}
