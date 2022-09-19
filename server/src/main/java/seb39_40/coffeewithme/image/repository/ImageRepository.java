package seb39_40.coffeewithme.image.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import seb39_40.coffeewithme.image.domain.Image;

public interface ImageRepository extends JpaRepository<Image, Long> {
}
