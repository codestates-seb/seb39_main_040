package seb39_40.coffeewithme.review.controller;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import seb39_40.coffeewithme.cafe.domain.Cafe;
import seb39_40.coffeewithme.cafe.service.CafeService;
import seb39_40.coffeewithme.common.dto.MultiResponseDto;
import seb39_40.coffeewithme.image.domain.Image;
import seb39_40.coffeewithme.review.domain.Review;
import seb39_40.coffeewithme.review.dto.ReviewRequestDto;
import seb39_40.coffeewithme.review.mapper.ReviewMapper;
import seb39_40.coffeewithme.review.service.ReviewService;
import seb39_40.coffeewithme.tag.service.TagService;
import seb39_40.coffeewithme.user.service.UserService;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/cafe")
public class ReviewController {
    private final ReviewService reviewService;
    private final ReviewMapper reviewMapper;

    @PostMapping("/{cafe_id}/reviews")
    public ResponseEntity postReview(@PathVariable Long cafe_id, @RequestBody @Valid ReviewRequestDto postDto){
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Long id = reviewService.save(email, cafe_id, reviewMapper.reviewDtoToReview(postDto), postDto.getTags());
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

    @GetMapping("/{cafe_id}/reviews/images")
    public ResponseEntity getImage(@PathVariable Long cafe_id){
        List<Review> reviews = reviewService.findByCafeId(cafe_id);
        List<Image> images = reviews.stream().map(review -> review.getReviewImg()).collect(Collectors.toList());
        return new ResponseEntity(reviewMapper.reviewsToReviewImageDtos(images),
                HttpStatus.OK);
    }

    @DeleteMapping("/{cafe_id}/reviews/{review_id}")
    public ResponseEntity deleteReview(@PathVariable Long cafe_id, @PathVariable Long review_id){
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        reviewService.delete(email, cafe_id, review_id);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @PatchMapping("/{cafe_id}/reviews/{review_id}")
    public ResponseEntity patchReview(@PathVariable Long review_id, @RequestBody ReviewRequestDto patchDto){
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        reviewService.update(email, review_id, reviewMapper.reviewDtoToReview(patchDto), patchDto.getTags());
        return new ResponseEntity(HttpStatus.OK);
    }
}
