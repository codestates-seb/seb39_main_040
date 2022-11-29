package seb39_40.coffeewithme.review.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import seb39_40.coffeewithme.review.domain.Review;

import java.util.List;


public interface ReviewRepository extends JpaRepository<Review, Long>, ReviewCustomRepository {
//    @EntityGraph(attributePaths = {"user", "reviewTags", "reviewImg"})
//    Page<Review> findByCafeId(Long id, PageRequest pageRequest);
    List<Review> findByCafeId(Long id);

    Page<Review> findByUserId(Long id, PageRequest pageRequest);


    List<Review> findAllByUserId(Long userId);
    Long countByUserId(Long userId);

    int countByCafeId(Long cafeId);
}
