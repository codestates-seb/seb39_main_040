package seb39_40.coffeewithme.cafe.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import seb39_40.coffeewithme.cafe.domain.Cafe;


public interface CafeRepository extends JpaRepository<Cafe, Long>, CustomCafeRepository {
}