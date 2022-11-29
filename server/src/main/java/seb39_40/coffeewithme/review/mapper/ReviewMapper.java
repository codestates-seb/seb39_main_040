package seb39_40.coffeewithme.review.mapper;

import lombok.RequiredArgsConstructor;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.beans.factory.annotation.Autowired;
import seb39_40.coffeewithme.image.domain.Image;
import seb39_40.coffeewithme.image.service.ImageService;
import seb39_40.coffeewithme.review.domain.Review;
import seb39_40.coffeewithme.review.domain.ReviewTag;
import seb39_40.coffeewithme.review.dto.ReviewRequestDto;
import seb39_40.coffeewithme.review.dto.ReviewResponseDto;
import seb39_40.coffeewithme.tag.domain.Tag;
import seb39_40.coffeewithme.user.mapper.UserMapper;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.stream.Collectors;

import static seb39_40.coffeewithme.review.dto.ReviewResponseDto.*;

@RequiredArgsConstructor
@Mapper(componentModel = "spring", uses = UserMapper.class)
public abstract class ReviewMapper {
    @Autowired
    protected ImageService imageService;

    @Mapping(target = "reviewImg", expression = "java(imageService.findById(postDto.getReviewImg()))")
    public abstract Review reviewDtoToReview(ReviewRequestDto postDto);
//    @Mapping(target = "reviewImg", expression = "java(review.getReviewImg().getPath())")
    @Mapping(target = "reviewImg", ignore = true)
    public abstract ReviewInfo reviewToReviewDto(Review review);
    public abstract ImageInfo reviewToReviewImageDto(Image image);
    public abstract List<ReviewInfo> reviewsToReviewDtos(List<Review> reviews);
    public abstract List<ImageInfo> reviewsToReviewImageDtos(List<Image> images);

    public List<ReviewInfo> reviewToReviewDtos(LinkedHashMap<Review, List<Tag>> map){
        List<ReviewInfo> reviewInfos = new ArrayList<>();

        for (Review review : map.keySet()){
            ReviewInfo reviewInfo = reviewToReviewDto(review);
            List<String> tags = map.get(review).stream().map(o -> o.getName()).collect(Collectors.toList());
            reviewInfo.setTags(tags);
            reviewInfo.setReviewImg(review.getReviewImg().getPath());
            reviewInfos.add(reviewInfo);
        }

        return reviewInfos;
    }
}
