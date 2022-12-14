package seb39_40.coffeewithme.review.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import seb39_40.coffeewithme.review.dto.ReviewRequestDto;
import seb39_40.coffeewithme.review.service.ReviewPostService;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("/cafe")
public class ReviewPostController {
    private final ReviewPostService reviewPostService;

    @PostMapping("/{cafe_id}/reviews")
    public ResponseEntity<?> postReview(@PathVariable Long cafe_id, @RequestBody @Valid ReviewRequestDto postDto){
        Long id = reviewPostService.post(cafe_id, postDto);
        return new ResponseEntity<>(id, HttpStatus.CREATED);
    }

    @DeleteMapping("/{cafe_id}/reviews/{review_id}")
    public ResponseEntity<?> deleteReview(@PathVariable Long cafe_id, @PathVariable Long review_id){
        reviewPostService.delete(cafe_id, review_id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PatchMapping("/{cafe_id}/reviews/{review_id}")
    public ResponseEntity<?> patchReview(@PathVariable Long review_id, @RequestBody ReviewRequestDto patchDto){
        reviewPostService.repost(review_id, patchDto, patchDto.getTags());
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
