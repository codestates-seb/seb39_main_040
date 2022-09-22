package seb39_40.coffeewithme.review.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import seb39_40.coffeewithme.review.domain.Review;
import seb39_40.coffeewithme.review.domain.ReviewTag;
import seb39_40.coffeewithme.review.repository.ReviewRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;

    public Long save(Review review){
        return reviewRepository.save(review).getId();
    }

    @Transactional
    public Long update(Long id, Review updateReview){
        Review review = findById(id);
        review.update(updateReview);
        return save(review);
    }

    public void delete(Long id){
        Review review = findById(id);
        reviewRepository.delete(review);
    }

    public Review findById(Long id){
        return reviewRepository.findById(id).orElseThrow(() -> new RuntimeException("리뷰를 찾을 수 없습니다."));
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
