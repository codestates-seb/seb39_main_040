package seb39_40.coffeewithme.review.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import seb39_40.coffeewithme.image.domain.Image;
import seb39_40.coffeewithme.review.domain.Review;
import seb39_40.coffeewithme.review.dto.ReviewRequestDto;
import seb39_40.coffeewithme.review.dto.ReviewResponseDto;
import seb39_40.coffeewithme.tag.domain.Tag;
import seb39_40.coffeewithme.user.mapper.UserMapper;

import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;

import static seb39_40.coffeewithme.review.dto.ReviewResponseDto.*;
import static seb39_40.coffeewithme.user.dto.UserResponseDto.*;

@Mapper(componentModel = "spring", uses = {UserMapper.class, Collections.class})
public interface ReviewMapper {
    @Mapping(target = "reviewImg", ignore = true)
    Review reviewDtoToReview(ReviewRequestDto postDto);

    @Mapping(target = "reviewImg", expression = "java(review.getReviewImg().getName())")
    @Mapping(target = "tags", expression = "java(review.getReviewTags().stream().map(o -> o.getTag().getName()).toArray(String[]::new))")
    ReviewInfo reviewToReviewDto(Review review);

    ImageInfo reviewToReviewImageDto(Image image);
    List<ImageInfo> reviewsToReviewImageDtos(List<Image> images);

    default List<ReviewInfo> reviewToReviewDtos(List<Review> reviews){
        List<ReviewInfo> reviewInfos = new ArrayList<>();

        for (Review review : reviews){
            ReviewInfo reviewInfo = new ReviewResponseDto.ReviewInfo();

            SimpleUserInfo userInfo = new SimpleUserInfo();
            userInfo.setId(review.getUser().getId());
            userInfo.setName(review.getUser().getUserName());
            reviewInfo.setUser( userInfo );

            reviewInfo.setId( review.getId() );
            reviewInfo.setDescription( review.getDescription() );
            reviewInfo.setScore( review.getScore() );

            String[] tags = review.getReviewTags().stream().map(o -> o.getTag().getName()).toArray(String[]::new);
            reviewInfo.setTags(tags);
            reviewInfo.setReviewImg(review.getReviewImg().getName());
            reviewInfos.add(reviewInfo);
        }

        return reviewInfos;
    }
}
