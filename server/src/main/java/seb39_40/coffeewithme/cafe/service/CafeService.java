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

@Service
@RequiredArgsConstructor
public class CafeService {
    private final CafeRepository cafeRepository;

    @Transactional
    public Long save(Cafe cafe){
        return cafeRepository.save(cafe).getId();
    }

    @Transactional
    public void delete(Cafe cafe){
        cafeRepository.delete(cafe);
    }

    @Transactional(readOnly = true)
    public Page<Cafe> find(String category, Integer page, String sort) {
        if (!isCategory(category)) throw new BusinessLogicException(ExceptionCode.INVALID_INPUT_VALUE);
        else if (category.equals("all")) return findAll(page, sort);
        else return findByCtg(category, page, sort);
    }

    public Page<Cafe> findAll(Integer page, String sort){
        PageRequest pageRequest = PageRequest.of(page, 10, Sort.by(SortType.findType(sort, false)).descending());
        return cafeRepository.findAll(pageRequest);
    }

    public Page<Cafe> findByCtg(String category, Integer page, String sort){
        PageRequest pageRequest = PageRequest.of(page, 10, Sort.by(SortType.findType(sort, true)).descending());
        return cafeRepository.findByCategory(category, pageRequest);
    }

    @Transactional(readOnly = true)
    public Cafe findById(Long cafeId){
        return cafeRepository.findById(cafeId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.CAFE_NOT_FOUND));
    }

    public boolean isCategory(String target){
        return (target.equals("all") || target.equals("study") || target.equals("mood") || target.equals("tasty"));
    }

    @Transactional(readOnly = true)
    public Page<Cafe> search(String keyword, int page, String sort) {
        if (keyword == null) return find("all", page, sort);
        else if (keyword.startsWith("-")) return searchByTag(keyword, page, sort);
        else return searchByName(keyword, page, sort);
    }

    private Page<Cafe> searchByTag(String keyword, int page, String sort) {
        keyword = keyword.replace("-", "");
        PageRequest pageRequest = PageRequest.of(page, 10, Sort.by(SortType.findType(sort, true)).descending());
        return cafeRepository.searchByTag(keyword, pageRequest);
    }

    public Page<Cafe> searchByName(String keyword, int page, String sort){
        PageRequest pageRequest = PageRequest.of(page, 10, Sort.by(SortType.findType(sort, true)).descending());
        return cafeRepository.searchByName(keyword, pageRequest);
    }
}
