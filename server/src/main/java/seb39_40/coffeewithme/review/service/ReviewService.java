package seb39_40.coffeewithme.review.service;

import org.springframework.data.domain.Page;
import seb39_40.coffeewithme.common.dto.PageInfo;
import seb39_40.coffeewithme.review.domain.Review;

import java.util.List;

import static seb39_40.coffeewithme.review.dto.ReviewResponseDto.*;

public interface ReviewService {
    Long save(Review review);
    void delete(Review review);
    Review find(Long id);
    void checkUser(String writer, String user);

    ReviewInfo findByReviewId(Long id);
    List<ReviewInfo> findByCafeId(Long cafeId, PageInfo pageInfo);
    Page<Review> findByUserId(Long userId, Integer page);
    PageInfo getPagination(Long cafeId, Integer page);

    List<ImageInfo> getReviewImages(Long cafeId);
}
