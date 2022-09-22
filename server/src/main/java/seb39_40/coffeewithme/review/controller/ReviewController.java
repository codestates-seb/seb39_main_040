package seb39_40.coffeewithme.review.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import seb39_40.coffeewithme.cafe.domain.Cafe;
import seb39_40.coffeewithme.cafe.service.CafeService;
import seb39_40.coffeewithme.common.dto.MultiResponseDto;
import seb39_40.coffeewithme.review.domain.Review;
import seb39_40.coffeewithme.review.dto.ReviewRequestDto;
import seb39_40.coffeewithme.review.mapper.ReviewMapper;
import seb39_40.coffeewithme.review.service.ReviewService;
import seb39_40.coffeewithme.user.service.UserService;
import seb39_40.coffeewithme.user.domain.User;

@RestController
@RequiredArgsConstructor
@RequestMapping("/cafe")
public class ReviewController {
    private final ReviewService reviewService;
    private final CafeService cafeService;
    private final ReviewMapper reviewMapper;

    private final UserService userService;

    @PostMapping("/{cafe_id}/reviews")
    public ResponseEntity postReview(@PathVariable Long cafe_id, @RequestBody ReviewRequestDto.Post postDto){
        // 유저 정보는 현재 로그인한 유저로 받아와야 함 (미완)
        User user = userService.findById(1L);

        Cafe cafe = cafeService.findById(cafe_id);
        cafe.updateReviewCount(1);

        Review review = reviewMapper.reviewDtoToReview(postDto);
        review.setCafe(cafe);
        review.setUser(user);

        return new ResponseEntity(reviewService.save(review), HttpStatus.CREATED);
    }

    @GetMapping("/{cafe_id}/reviews")
    public ResponseEntity getReviews(@PathVariable Long cafe_id,
                                     @RequestParam(required = false, defaultValue = "1") Integer page){
        Page<Review> reviews = reviewService.findByCafeId(cafe_id, page - 1);
        return new ResponseEntity(new MultiResponseDto<>(reviewMapper.reviewsToReviewDtos(reviews.getContent()), reviews),
                HttpStatus.OK);
    }

    @GetMapping("/{cafe_id}/reviews/{review_id}")
    public ResponseEntity getReview(@PathVariable Long review_id){
        Review review = reviewService.findById(review_id);
        return new ResponseEntity(reviewMapper.reviewToReviewDto(review), HttpStatus.OK);
    }

    @DeleteMapping("/{cafe_id}/reviews/{review_id}")
    public ResponseEntity deleteReview(@PathVariable Long cafe_id, @PathVariable Long review_id){
        Cafe cafe = cafeService.findById(cafe_id);
        reviewService.delete(review_id);

        cafe.updateReviewCount(-1);
        cafeService.save(cafe);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
