package seb39_40.coffeewithme.cafe.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import seb39_40.coffeewithme.cafe.domain.Cafe;
import seb39_40.coffeewithme.cafe.repository.CafeRepository;
import seb39_40.coffeewithme.exception.BusinessLogicException;
import seb39_40.coffeewithme.exception.ExceptionCode;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CafeService {
    private final CafeRepository cafeRepository;

    public Page<Cafe> findAll(String category, Integer page, String sort) {
        if (category.equals("all")) {
            PageRequest pageRequest = PageRequest.of(page, 10, Sort.by(formatSortType(sort + "A")).descending());
            return cafeRepository.findAll(pageRequest);
        }
        else if (isCategory(category)){
            PageRequest pageRequest = PageRequest.of(page, 10, Sort.by(formatSortType(sort)).descending());
            return cafeRepository.findByCategory(category.toUpperCase(), pageRequest);
        }
        else throw new BusinessLogicException(ExceptionCode.INVALID_INPUT_VALUE);
    }

    public boolean isCategory(String target){
        return (target.equals("study") || target.equals("mood") || target.equals("tasty"));
    }

    public String formatSortType(String target){
        Map<String, String> map = new HashMap<>();
        map.put("newest", "cafe_id");
        map.put("likes", "like_cnt");
        map.put("reviews", "rvw_cnt");
        map.put("newestA", "id");
        map.put("likesA", "likeCount");
        map.put("reviewsA", "reviewCount");

        try {
            target = map.get(target);
        }catch (NullPointerException e) {
            throw new BusinessLogicException(ExceptionCode.INVALID_INPUT_VALUE);
        }
        return target;
    }


    public Long save(Cafe cafe){
        return cafeRepository.save(cafe).getId();
    }

    public void delete(Long cafeId){
        cafeRepository.delete(findById(cafeId));
    }

    public Cafe findById(Long cafeId){
        return cafeRepository.findById(cafeId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.CAFE_NOT_FOUND));
    }

    public Page<Cafe> search(String type, String keyword, int page, String sort) {
        if (keyword == null) return findAll("all", page, sort);
        PageRequest pageRequest = PageRequest.of(page, 10, Sort.by(formatSortType(sort)).descending());

        if (type.equals("name")) return cafeRepository.searchByName(keyword, pageRequest);
        else throw new BusinessLogicException(ExceptionCode.INVALID_INPUT_VALUE);
    }
}
