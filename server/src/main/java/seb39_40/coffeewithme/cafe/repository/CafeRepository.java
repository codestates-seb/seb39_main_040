package seb39_40.coffeewithme.cafe.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import seb39_40.coffeewithme.cafe.domain.Cafe;


public interface CafeRepository extends JpaRepository<Cafe, Long> {
    @Query(value = "SELECT * FROM cafe WHERE cafe_id " +
            "IN (SELECT distinct cafe_id FROM cafe_tag a LEFT JOIN tag b ON a.tag_id = b.tag_id WHERE tag_ctg=:c)",
            nativeQuery = true)
    Page<Cafe> findByCategory(@Param("c") String c, PageRequest pageRequest);

    @Query(value = "SELECT * FROM cafe WHERE cafe_nm LIKE concat('%',:keyword,'%')",
            nativeQuery = true)
    Page<Cafe> searchByName(@Param("keyword") String keyword, PageRequest pageRequest);
}