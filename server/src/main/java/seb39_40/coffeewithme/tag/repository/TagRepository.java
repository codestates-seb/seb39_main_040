package seb39_40.coffeewithme.tag.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import seb39_40.coffeewithme.tag.domain.Tag;

import java.util.Optional;

public interface TagRepository extends JpaRepository<Tag, Long> {
    Optional<Tag> findByName(String name);
}
