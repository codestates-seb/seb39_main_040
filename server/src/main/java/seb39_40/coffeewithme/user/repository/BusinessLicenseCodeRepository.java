package seb39_40.coffeewithme.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import seb39_40.coffeewithme.user.domain.BusinessLicenseCode;

import java.util.Optional;

public interface BusinessLicenseCodeRepository extends JpaRepository<BusinessLicenseCode,Long> {
    Optional<BusinessLicenseCode> findByCode(String businessLicenseCode);
}
