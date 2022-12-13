package seb39_40.coffeewithme.cafe.service;

import org.springframework.data.domain.Page;
import seb39_40.coffeewithme.cafe.domain.Cafe;
import seb39_40.coffeewithme.common.dto.MultiResponseDto;

import static seb39_40.coffeewithme.cafe.dto.CafeResponseDto.*;

public interface CafeService {
    Long save(Cafe cafe);
    void delete(Cafe cafe);
    Cafe find(Long cafeId);

    MultiResponseDto<?> findCafe(String category, Integer page, String sort);
    Page<Cafe> findAll(Integer page, String sort);
    Page<Cafe> findByCtg(String category, Integer page, String sort);
    DetailCafeInfo findById(Long id);

    MultiResponseDto<?> searchCafe(String keyword, int page, String sort);
    Page<Cafe> searchByTag(String keyword, int page, String sort);
    Page<Cafe> searchByName(String keyword, int page, String sort);

    boolean isCategory(String target);
}