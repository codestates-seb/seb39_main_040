package seb39_40.coffeewithme.review.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import seb39_40.coffeewithme.cafe.domain.Cafe;
import seb39_40.coffeewithme.cafe.service.CafeService;
import seb39_40.coffeewithme.exception.BusinessLogicException;
import seb39_40.coffeewithme.exception.ExceptionCode;
import seb39_40.coffeewithme.review.domain.Review;
import seb39_40.coffeewithme.review.domain.ReviewTag;
import seb39_40.coffeewithme.review.repository.ReviewRepository;
import seb39_40.coffeewithme.tag.service.TagService;
import seb39_40.coffeewithme.user.service.UserService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final CafeService cafeService;
    private final UserService userService;
    private final TagService tagService;

    public Long save(Long userId, Long cafeId, Review review, List<String> tags){
        Cafe cafe = cafeService.findById(cafeId);
        cafe.updateReviewCount(1);

        review.setCafe(cafe);
        review.setUser(userService.findById(userId));
        review.setReviewTags(tagService.createReviewTag(review, tags));
        return reviewRepository.save(review).getId();
    }

    @Transactional
    public Long update(Long id, Review updateReview){
        Review review = findById(id);
        review.update(updateReview);
        return reviewRepository.save(review).getId();
    }

    public void delete(Long cafeId, Long reviewId){
        Review review = findById(reviewId);

        Cafe cafe = cafeService.findById(cafeId);
        cafe.updateReviewCount(-1);
        cafeService.save(cafe);
        reviewRepository.delete(review);
    }

    public Review findById(Long id){
        return reviewRepository.findById(id).orElseThrow(() -> new BusinessLogicException(ExceptionCode.REVIEW_NOT_FOUND));
    }

    public Page<Review> findByCafeId(Long cafe_id, Integer page) {
        PageRequest pageRequest = PageRequest.of(page, 10, Sort.by("id").descending());
        return reviewRepository.findByCafeId(cafe_id, pageRequest);
    }

    public Page<Review> findByUserId(Long user_id, Integer page) {
        PageRequest pageRequest = PageRequest.of(page, 10, Sort.by("id").descending());
        return reviewRepository.findByUserId(user_id, pageRequest);
    }
}
