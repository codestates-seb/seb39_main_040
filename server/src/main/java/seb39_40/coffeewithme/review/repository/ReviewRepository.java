package seb39_40.coffeewithme.review.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import seb39_40.coffeewithme.review.domain.Review;

import java.util.List;
import java.util.Optional;


public interface ReviewRepository extends JpaRepository<Review, Long>, ReviewCustomRepository {
    @EntityGraph(attributePaths = {"user", "reviewImg"}) //fetch join 적용
    @Override
    Optional<Review> findById(Long id);

    List<Review> findByCafeId(Long id);

    Page<Review> findByUserId(Long id, PageRequest pageRequest);


    List<Review> findAllByUserId(Long userId);
    Long countByUserId(Long userId);
}
