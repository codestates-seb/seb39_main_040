package seb39_40.coffeewithme.review.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import seb39_40.coffeewithme.review.dto.ReviewRequestDto;
import seb39_40.coffeewithme.review.service.impl.ReviewPostServiceImpl;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("/cafe")
public class ReviewPostController {
    private final ReviewPostServiceImpl reviewPostServiceImpl;

    @PostMapping("/{cafe_id}/reviews")
    public ResponseEntity<?> postReview(@PathVariable Long cafe_id, @RequestBody @Valid ReviewRequestDto postDto){
        Long id = reviewPostServiceImpl.post(cafe_id, postDto, postDto.getTags());
        return new ResponseEntity<>(id, HttpStatus.CREATED);
    }

    @DeleteMapping("/{cafe_id}/reviews/{review_id}")
    public ResponseEntity<?> deleteReview(@PathVariable Long cafe_id, @PathVariable Long review_id){
        reviewPostServiceImpl.delete(cafe_id, review_id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PatchMapping("/{cafe_id}/reviews/{review_id}")
    public ResponseEntity<?> patchReview(@PathVariable Long review_id, @RequestBody ReviewRequestDto patchDto){
        reviewPostServiceImpl.repost(review_id, patchDto, patchDto.getTags());
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
