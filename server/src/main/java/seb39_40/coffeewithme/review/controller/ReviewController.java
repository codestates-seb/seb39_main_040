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
import seb39_40.coffeewithme.tag.service.TagService;
import seb39_40.coffeewithme.user.service.UserService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/cafe")
public class ReviewController {
    private final ReviewService reviewService;
    private final ReviewMapper reviewMapper;

    @PostMapping("/{cafe_id}/reviews")
    public ResponseEntity postReview(@PathVariable Long cafe_id, @RequestBody ReviewRequestDto postDto){
        // 유저 정보는 현재 로그인한 유저로 받아와야 함 (미완)
        Long id = reviewService.save(1L, cafe_id, reviewMapper.reviewDtoToReview(postDto), postDto.getTags());
        return new ResponseEntity(id, HttpStatus.CREATED);
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
        reviewService.delete(cafe_id, review_id);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @PatchMapping("/{cafe_id}/reviews/{review_id}")
    public ResponseEntity patchReview(@PathVariable Long cafe_id, @RequestBody ReviewRequestDto patchDto){
        reviewService.update(cafe_id, reviewMapper.reviewDtoToReview(patchDto));
        return new ResponseEntity(HttpStatus.OK);
    }
}