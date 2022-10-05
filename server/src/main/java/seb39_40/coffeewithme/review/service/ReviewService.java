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
import seb39_40.coffeewithme.user.domain.User;
import seb39_40.coffeewithme.user.service.UserService;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final CafeService cafeService;
    private final UserService userService;
    private final TagService tagService;

    @Transactional
    public Long save(String email, Long cafeId, Review review, List<String> tags){
        Cafe cafe = cafeService.findById(cafeId);
        cafe.updateReviewCount(1);
        review.setCafe(cafe);

        User user = userService.findByEmail(email);
        if (user.getRoles().equals("ROLE_ADMIN") && review.getScore() >= 4 && !cafe.getBadge())
            cafe.updateBadge(true);
        review.setUser(user);

        review.setReviewTags(tagService.createReviewTag(review, tags));
        review.getReviewImg().saveImg();
        return reviewRepository.save(review).getId();
    }

    @Transactional
    public Long update(String email, Long id, Review updateReview, List<String> tags){
        Review review = findById(id);
        // 이벤트로 업데이트시에 temp, 등록시에 save로 상태 바꾸게
        if (!Objects.equals(review.getReviewImg().getId(), updateReview.getReviewImg().getId()))
            review.getReviewImg().deleteImg();
        checkUser(email, review.getUser().getEmail());

        tagService.deleteReviewTag(review);
        List<ReviewTag> reviewTags = tagService.createReviewTag(review, tags);
        review.setReviewTags(reviewTags);
        review.update(updateReview);
        return reviewRepository.save(review).getId();
    }

    @Transactional
    public void delete(String email, Long cafeId, Long reviewId){
        Review review = findById(reviewId);
        review.getReviewImg().deleteImg();

        checkUser(email, review.getUser().getEmail());
        Cafe cafe = cafeService.findById(cafeId);
        cafe.updateReviewCount(-1);
        cafeService.save(cafe);
        reviewRepository.delete(review);
    }

    @Transactional(readOnly = true)
    public void checkUser(String writer, String user){
        assert writer.equals(user) : ExceptionCode.BAD_REQUEST;
    }

    @Transactional(readOnly = true)
    public Review findById(Long id){
        return reviewRepository.findById(id).orElseThrow(() -> new BusinessLogicException(ExceptionCode.REVIEW_NOT_FOUND));
    }

    @Transactional(readOnly = true)
    public Page<Review> findByCafeId(Long cafeId, Integer page) {
        PageRequest pageRequest = PageRequest.of(page, 10, Sort.by("id").descending());
        return reviewRepository.findByCafeId(cafeId, pageRequest);
    }

    @Transactional(readOnly = true)
    public List<Review> findByCafeId(Long cafeId) {
        return reviewRepository.findByCafeId(cafeId);
    }

    @Transactional(readOnly = true)
    public Page<Review> findByUserId(Long userId, Integer page) {
        PageRequest pageRequest = PageRequest.of(page, 10, Sort.by("id").descending());
        return reviewRepository.findByUserId(userId, pageRequest);
    }

}