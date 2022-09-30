package seb39_40.coffeewithme.user.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.data.repository.query.FluentQuery;
import seb39_40.coffeewithme.cafe.domain.Cafe;
import seb39_40.coffeewithme.cafe.dto.CafeResponseDto;
import seb39_40.coffeewithme.cafe.mapper.CafeMapper;
import seb39_40.coffeewithme.image.domain.Image;
import seb39_40.coffeewithme.image.repository.ImageRepository;
import seb39_40.coffeewithme.image.service.ImageService;
import seb39_40.coffeewithme.review.domain.Review;
import seb39_40.coffeewithme.review.repository.ReviewRepository;
import seb39_40.coffeewithme.user.domain.User;
import seb39_40.coffeewithme.user.dto.UserRequestDto;
import seb39_40.coffeewithme.user.dto.UserResponseDto;
import seb39_40.coffeewithme.user.dto.UserReviewResponseDto;
import seb39_40.coffeewithme.user.dto.WishlistResponse;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", uses = CafeMapper.class)
public abstract class UserMapper {

    @Autowired
    protected ImageService imageService;

    @Mapping(target = "name", source = "userName")
    public abstract UserResponseDto.SimpleUserInfo userToUserSimpleInfoDto(User user);
    public abstract User userJoinToUser(UserRequestDto.UserJoin userJoin);
    public abstract UserResponseDto.UserInfo userToUserInfo(User user);
    public WishlistResponse cafesToWishlistDto(List<CafeResponseDto.SimpleCafeInfo> cafes){
        return new WishlistResponse(cafes);
    }
    @Mapping(target = "reviewImg", expression = "java(imageService.findById(review.getReviewImg()).getPath())")
    public abstract UserReviewResponseDto.ReviewSimpleDto reviewToUserReviewSimpleDto(Review review);

    public abstract List<UserReviewResponseDto.ReviewSimpleDto> reviewsToUserReviewListDto(List<Review> reviews);

    public UserReviewResponseDto reviewsToUserReviewResponseDto(List<Review> reviews){
        return new UserReviewResponseDto(reviewsToUserReviewListDto(reviews));
    }

}

