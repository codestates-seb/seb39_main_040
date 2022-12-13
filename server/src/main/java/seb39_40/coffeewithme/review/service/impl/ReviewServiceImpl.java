package seb39_40.coffeewithme.review.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import seb39_40.coffeewithme.common.domain.Pagination;
import seb39_40.coffeewithme.common.dto.MultiResponseDto;
import seb39_40.coffeewithme.exception.BusinessLogicException;
import seb39_40.coffeewithme.exception.ExceptionCode;
import seb39_40.coffeewithme.image.domain.Image;
import seb39_40.coffeewithme.review.domain.Review;
import seb39_40.coffeewithme.review.mapper.ReviewMapper;
import seb39_40.coffeewithme.review.repository.ReviewRepository;
import seb39_40.coffeewithme.review.service.ReviewService;

import java.util.List;
import java.util.stream.Collectors;

import static seb39_40.coffeewithme.review.dto.ReviewResponseDto.*;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {
    private final ReviewRepository reviewRepository;
    private final ReviewMapper reviewMapper;

    @Transactional
    public Long save(Review review){
        return reviewRepository.save(review).getId();
    }

    @Transactional
    public void delete(Review review){
        reviewRepository.delete(review);
    }

    @Transactional(readOnly = true)
    public Review find(Long id){
        return reviewRepository.findById(id).orElseThrow(() -> new BusinessLogicException(ExceptionCode.REVIEW_NOT_FOUND));

    }

    @Transactional(readOnly = true)
    public void checkUser(String writer, String user){
        assert writer.equals(user) : ExceptionCode.BAD_REQUEST;
    }

    @Transactional(readOnly = true)
    public ReviewInfo findByReviewId(Long id){
        Review review = reviewRepository.findById(id).orElseThrow(() -> new BusinessLogicException(ExceptionCode.REVIEW_NOT_FOUND));
        return reviewMapper.reviewToReviewDto(review);
    }

    @Transactional(readOnly = true)
    public List<ReviewInfo> findByCafeId(Long cafeId, Pagination pagination) {
        if (pagination.getTotalPageCount() == 0) return null;

        List<ReviewInfo> reviews = reviewMapper.reviewToReviewDtos(reviewRepository.findByCafeId(cafeId, pagination));
        return reviews;
    }

    @Transactional(readOnly = true)
    public Pagination getPagination(Long cafeId, Integer page){
        Long size = reviewRepository.countByCafeId(cafeId); // 카페기준으로 pagination 생성
        return new Pagination(size, 10, page);
    }

    @Transactional(readOnly = true)
    public List<ImageInfo> getReviewImages(Long cafeId){
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