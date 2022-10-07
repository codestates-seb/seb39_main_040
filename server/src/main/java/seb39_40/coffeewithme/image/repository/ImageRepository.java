package seb39_40.coffeewithme.image.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import seb39_40.coffeewithme.common.domain.Status;
import seb39_40.coffeewithme.image.domain.Image;

import java.time.LocalDateTime;
import java.util.List;

public interface ImageRepository extends JpaRepository<Image, Long> {
    List<Image> findByStatusAndModifiedAtLessThan(Status status, LocalDateTime TenDaysAgo);
}
