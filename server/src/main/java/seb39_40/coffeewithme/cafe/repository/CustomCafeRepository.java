package seb39_40.coffeewithme.cafe.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import seb39_40.coffeewithme.cafe.domain.Cafe;

public interface CustomCafeRepository {
    Page<Cafe> findByCategory(String category, Pageable pageable);
    Page<Cafe> searchByName(String keyword, Pageable pageable);
    Page<Cafe> searchByTag(String keyword, Pageable pageable);
}
