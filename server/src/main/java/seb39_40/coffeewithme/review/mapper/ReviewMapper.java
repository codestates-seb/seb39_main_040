package seb39_40.coffeewithme.review.mapper;

import org.mapstruct.Mapper;
import seb39_40.coffeewithme.cafe.domain.Cafe;
import seb39_40.coffeewithme.cafe.dto.CafeResponseDto;
import seb39_40.coffeewithme.review.domain.Review;
import seb39_40.coffeewithme.review.dto.ReviewRequestDto;
import seb39_40.coffeewithme.review.dto.ReviewResponseDto;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ReviewMapper {
    Review reviewDtoToReview(ReviewRequestDto.Post postDto);
    ReviewResponseDto reviewToReviewDto(Review review);
    List<ReviewResponseDto> reviewsToReviewDtos(List<Review> reviews);
}
