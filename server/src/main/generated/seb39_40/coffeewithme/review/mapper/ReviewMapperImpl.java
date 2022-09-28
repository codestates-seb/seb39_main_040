package seb39_40.coffeewithme.review.mapper;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import seb39_40.coffeewithme.review.domain.Review;
import seb39_40.coffeewithme.review.domain.ReviewTag;
import seb39_40.coffeewithme.review.dto.ReviewRequestDto;
import seb39_40.coffeewithme.review.dto.ReviewResponseDto;
import seb39_40.coffeewithme.user.mapper.UserMapper;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-09-27T22:29:22+0900",
    comments = "version: 1.5.2.Final, compiler: javac, environment: Java 11.0.15 (Azul Systems, Inc.)"
)
@Component
public class ReviewMapperImpl extends ReviewMapper {

    @Autowired
    private UserMapper userMapper;

    @Override
    public Review reviewDtoToReview(ReviewRequestDto postDto) {
        if ( postDto == null ) {
            return null;
        }

        Review review = new Review();

        review.setReviewImg( postDto.getReviewImg() );
        review.setDescription( postDto.getDescription() );
        review.setScore( postDto.getScore() );

        return review;
    }

    @Override
    public ReviewResponseDto reviewToReviewDto(Review review) {
        if ( review == null ) {
            return null;
        }

        ReviewResponseDto reviewResponseDto = new ReviewResponseDto();

        List<ReviewTag> list = review.getReviewTags();
        if ( list != null ) {
            reviewResponseDto.setReviewTags( new ArrayList<ReviewTag>( list ) );
        }
        reviewResponseDto.setUser( userMapper.userToUserSimpleInfoDto( review.getUser() ) );
        reviewResponseDto.setId( review.getId() );
        reviewResponseDto.setDescription( review.getDescription() );
        reviewResponseDto.setScore( review.getScore() );

        reviewResponseDto.setReviewImg( imageService.findById(review.getReviewImg()).getPath() );

        return reviewResponseDto;
    }

    @Override
    public List<ReviewResponseDto> reviewsToReviewDtos(List<Review> reviews) {
        if ( reviews == null ) {
            return null;
        }

        List<ReviewResponseDto> list = new ArrayList<ReviewResponseDto>( reviews.size() );
        for ( Review review : reviews ) {
            list.add( reviewToReviewDto( review ) );
        }

        return list;
    }
}
