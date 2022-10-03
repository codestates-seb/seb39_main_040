package seb39_40.coffeewithme.cafe.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import seb39_40.coffeewithme.cafe.domain.Cafe;
import seb39_40.coffeewithme.cafe.domain.SortType;
import seb39_40.coffeewithme.cafe.repository.CafeRepository;
import seb39_40.coffeewithme.exception.BusinessLogicException;
import seb39_40.coffeewithme.exception.ExceptionCode;
import seb39_40.coffeewithme.image.domain.Image;
import seb39_40.coffeewithme.image.service.ImageService;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CafeService {
    private final CafeRepository cafeRepository;

    @Transactional(readOnly = true)
    public Page<Cafe> findAll(String category, Integer page, String sort) {
        // 정규성 검사 밖으로 빼기 (여기서는 all이냐 아니냐만 판단!)
        if (!isCategory(category)) throw new BusinessLogicException(ExceptionCode.INVALID_INPUT_VALUE);

        PageRequest pageRequest = PageRequest.of(page, 10, Sort.by(SortType.findType(sort, !category.equals("all"))).descending());
        // 이거 두개는 분리
        if (category.equals("all")) return cafeRepository.findAll(pageRequest);
        else return cafeRepository.findByCategory(category.toUpperCase(), pageRequest);
    }

    public boolean isCategory(String target){
        return (target.equals("all") || target.equals("study") || target.equals("mood") || target.equals("tasty"));
    }

    @Transactional
    public Long save(Cafe cafe){
        return cafeRepository.save(cafe).getId();
    }

    @Transactional
    public void delete(Cafe cafe){
        cafeRepository.delete(cafe);
    }

    @Transactional(readOnly = true)
    public Cafe findById(Long cafeId){
        return cafeRepository.findById(cafeId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.CAFE_NOT_FOUND));
    }

    @Transactional(readOnly = true)
    public Page<Cafe> search(String type, String keyword, int page, String sort) {
        if (keyword == null) return findAll("all", page, sort);
        PageRequest pageRequest = PageRequest.of(page, 10, Sort.by(SortType.findType(sort, true)).descending());

        if (type.equals("name")) return cafeRepository.searchByName(keyword, pageRequest);
        else throw new BusinessLogicException(ExceptionCode.INVALID_INPUT_VALUE);
    }
}
