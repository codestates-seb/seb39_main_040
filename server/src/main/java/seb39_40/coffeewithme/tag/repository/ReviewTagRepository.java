package seb39_40.coffeewithme.tag.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import seb39_40.coffeewithme.review.domain.ReviewTag;

import java.util.List;

public interface ReviewTagRepository extends JpaRepository<ReviewTag, Long> {
    List<ReviewTag> findByReviewId(Long reviewId);
}
