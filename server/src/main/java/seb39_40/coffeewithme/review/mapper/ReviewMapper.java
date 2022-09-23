package seb39_40.coffeewithme.review.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.beans.factory.annotation.Autowired;
import seb39_40.coffeewithme.image.service.ImageService;
import seb39_40.coffeewithme.review.domain.Review;
import seb39_40.coffeewithme.review.dto.ReviewRequestDto;
import seb39_40.coffeewithme.review.dto.ReviewResponseDto;
import seb39_40.coffeewithme.user.mapper.UserMapper;

import java.util.List;

@Mapper(componentModel = "spring", uses = UserMapper.class)
public abstract class ReviewMapper {
    @Autowired
    protected ImageService imageService;

    public abstract Review reviewDtoToReview(ReviewRequestDto postDto);
    @Mapping(target = "reviewImg", expression = "java(imageService.find(review.getReviewImg()).getPath())")
    public abstract ReviewResponseDto reviewToReviewDto(Review review);
    public abstract List<ReviewResponseDto> reviewsToReviewDtos(List<Review> reviews);
}
