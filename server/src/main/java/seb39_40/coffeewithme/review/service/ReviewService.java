package seb39_40.coffeewithme.review.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import seb39_40.coffeewithme.cafe.domain.Cafe;
import seb39_40.coffeewithme.cafe.service.CafeService;
import seb39_40.coffeewithme.common.domain.Pagination;
import seb39_40.coffeewithme.common.dto.MultiResponseDto;
import seb39_40.coffeewithme.common.dto.PageInfo;
import seb39_40.coffeewithme.exception.BusinessLogicException;
import seb39_40.coffeewithme.exception.ExceptionCode;
import seb39_40.coffeewithme.image.domain.Image;
import seb39_40.coffeewithme.review.domain.Review;
import seb39_40.coffeewithme.review.domain.ReviewTag;
import seb39_40.coffeewithme.review.dto.ReviewRequestDto;
import seb39_40.coffeewithme.review.dto.ReviewResponseDto;
import seb39_40.coffeewithme.review.mapper.ReviewMapper;
import seb39_40.coffeewithme.review.repository.ReviewRepository;
import seb39_40.coffeewithme.tag.domain.Tag;
import seb39_40.coffeewithme.tag.service.TagService;
import seb39_40.coffeewithme.user.domain.User;
import seb39_40.coffeewithme.user.service.UserService;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import static seb39_40.coffeewithme.review.dto.ReviewResponseDto.*;

@Service
@RequiredArgsConstructor
public class ReviewService {
    // 서비스 분리 필요
    private final ReviewRepository reviewRepository;
    private final CafeService cafeService;
    private final UserService userService;
    private final TagService tagService;

    private final ReviewMapper reviewMapper;

    @Transactional
    public Long save(String email, Long cafeId, ReviewRequestDto reviewRequestDto, List<String> tags){
        Review review = reviewMapper.reviewDtoToReview(reviewRequestDto);

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
    public Long update(String email, Long id, ReviewRequestDto patchDto, List<String> tags){
        Review origin = reviewRepository.findById(id).orElseThrow(() -> new BusinessLogicException(ExceptionCode.REVIEW_NOT_FOUND));
        Review target = reviewMapper.reviewDtoToReview(patchDto);

        if (!Objects.equals(origin.getReviewImg().getId(), target.getReviewImg().getId()))
            origin.getReviewImg().deleteImg();
        checkUser(email, origin.getUser().getEmail());

        tagService.deleteReviewTag(origin);
        List<ReviewTag> reviewTags = tagService.createReviewTag(origin, tags);
        origin.setReviewTags(reviewTags);
        origin.update(target);
        return reviewRepository.save(origin).getId();
    }

    @Transactional
    public void delete(String email, Long cafeId, Long reviewId){
        Review review = reviewRepository.findById(reviewId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.REVIEW_NOT_FOUND));
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
    public ReviewInfo findById(Long id){
        Review review = reviewRepository.findById(id).orElseThrow(() -> new BusinessLogicException(ExceptionCode.REVIEW_NOT_FOUND));
        return reviewMapper.reviewToReviewDto(review);
    }

    @Transactional(readOnly = true)
    public MultiResponseDto<?> findByCafeId(Long cafeId, Integer page) {
        Pagination pagination = new Pagination(reviewRepository.countByCafeId(cafeId), 10, page);

        List<ReviewInfo> reviews = reviewMapper.reviewToReviewDtos(reviewRepository.findByCafeId(cafeId, pagination));
        return new MultiResponseDto<>(reviews, pagination);
    }

    @Transactional(readOnly = true)
    public List<ReviewInfo> findByCafeId(Long cafeId) {
        return reviewMapper.reviewsToReviewDtos(reviewRepository.findByCafeId(cafeId));
    }

    @Transactional(readOnly = true)
    public List<ImageInfo> findReviewImages(Long cafeId){
        // 해당하는 리뷰 읽어오기
        List<Review> reviews = reviewRepository.findByCafeId(cafeId);
        List<Image> images = reviews.stream().map(review -> review.getReviewImg()).collect(Collectors.toList());
        return reviewMapper.reviewsToReviewImageDtos(images);
    }

    @Transactional(readOnly = true)
    public Page<Review> findByUserId(Long userId, Integer page) {
        PageRequest pageRequest = PageRequest.of(page, 10, Sort.by("id").descending());
        return reviewRepository.findByUserId(userId, pageRequest);
    }

}