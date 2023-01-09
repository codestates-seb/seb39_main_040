package seb39_40.coffeewithme.tag.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import seb39_40.coffeewithme.cafe.domain.CafeTag;

import java.util.List;

public interface CafeTagRepository extends JpaRepository<CafeTag, Long> {
    List<CafeTag> findByCafeId(Long cafeId);
}
