package seb39_40.coffeewithme.review.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import seb39_40.coffeewithme.review.service.ReviewServiceImpl;

@RestController
@RequiredArgsConstructor
@RequestMapping("/cafe")
public class ReviewController {
    private final ReviewServiceImpl reviewServiceImpl;

    @GetMapping("/{cafe_id}/reviews") //완료
    public ResponseEntity<?> getReviews(@PathVariable Long cafe_id,
                                     @RequestParam(required = false, defaultValue = "1") Integer page){
        return new ResponseEntity<>(reviewServiceImpl.findByCafeId(cafe_id, page), HttpStatus.OK);
    }

    @GetMapping("/{cafe_id}/reviews/{review_id}") //진행중
    public ResponseEntity<?> getReview(@PathVariable Long review_id){
        return new ResponseEntity<>(reviewServiceImpl.findByReviewId(review_id), HttpStatus.OK);
    }

    @GetMapping("/{cafe_id}/reviews/images")
    public ResponseEntity<?> getImage(@PathVariable Long cafe_id){
        return new ResponseEntity<>(reviewServiceImpl.findReviewImages(cafe_id), HttpStatus.OK);
    }
}
