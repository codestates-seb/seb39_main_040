package seb39_40.coffeewithme.review.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.beans.factory.annotation.Autowired;
import seb39_40.coffeewithme.image.domain.Image;
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

    @Mapping(target = "reviewImg", expression = "java(imageService.findById(postDto.getReviewImg()))")
    public abstract Review reviewDtoToReview(ReviewRequestDto postDto);
    @Mapping(target = "reviewImg", expression = "java(review.getReviewImg().getPath())")
    public abstract ReviewResponseDto.ReviewInfo reviewToReviewDto(Review review);
    public abstract ReviewResponseDto.ImageInfo reviewToReviewImageDto(Image image);
    public abstract List<ReviewResponseDto.ReviewInfo> reviewsToReviewDtos(List<Review> reviews);
    public abstract List<ReviewResponseDto.ImageInfo> reviewsToReviewImageDtos(List<Image> images);
}
