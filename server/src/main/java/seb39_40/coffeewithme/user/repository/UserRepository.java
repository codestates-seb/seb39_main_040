package seb39_40.coffeewithme.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import seb39_40.coffeewithme.user.domain.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}