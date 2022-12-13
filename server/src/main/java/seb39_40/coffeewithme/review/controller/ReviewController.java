package seb39_40.coffeewithme.review.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import seb39_40.coffeewithme.common.domain.Pagination;
import seb39_40.coffeewithme.common.dto.MultiResponseDto;
import seb39_40.coffeewithme.review.service.ReviewService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/cafe")
public class ReviewController {
    private final ReviewService reviewService;

    @GetMapping("/{cafe_id}/reviews")
    public ResponseEntity<?> getReviews(@PathVariable Long cafe_id,
                                     @RequestParam(required = false, defaultValue = "1") Integer page){
        Pagination pagination = reviewService.getPagination(cafe_id, page);
        return new ResponseEntity<>(
                new MultiResponseDto<>(reviewService.findByCafeId(cafe_id, pagination), pagination), HttpStatus.OK);
    }

    @GetMapping("/{cafe_id}/reviews/{review_id}")
    public ResponseEntity<?> getReview(@PathVariable Long review_id){
        return new ResponseEntity<>(reviewService.findByReviewId(review_id), HttpStatus.OK);
    }

    @GetMapping("/{cafe_id}/reviews/images")
    public ResponseEntity<?> getImage(@PathVariable Long cafe_id){
        return new ResponseEntity<>(reviewService.getReviewImages(cafe_id), HttpStatus.OK);
    }
}
