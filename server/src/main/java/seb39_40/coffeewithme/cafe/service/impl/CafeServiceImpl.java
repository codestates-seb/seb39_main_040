package seb39_40.coffeewithme.cafe.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import seb39_40.coffeewithme.cafe.domain.Cafe;
import seb39_40.coffeewithme.cafe.domain.SortType;
import seb39_40.coffeewithme.cafe.mapper.CafeMapper;
import seb39_40.coffeewithme.cafe.repository.CafeRepository;
import seb39_40.coffeewithme.cafe.service.CafeService;
import seb39_40.coffeewithme.common.dto.MultiResponseDto;
import seb39_40.coffeewithme.exception.BusinessLogicException;
import seb39_40.coffeewithme.exception.ExceptionCode;

import static seb39_40.coffeewithme.cafe.dto.CafeResponseDto.*;

@Service
@RequiredArgsConstructor
public class CafeServiceImpl implements CafeService {
    private final CafeRepository cafeRepository;
    private final CafeMapper cafeMapper;

    @Transactional
    public Long save(Cafe cafe){
        return cafeRepository.save(cafe).getId();
    }

    @Transactional
    public void delete(Cafe cafe){
        cafeRepository.delete(cafe);
    }

    @Transactional(readOnly = true)
    public Cafe find(Long cafeId){
        return cafeRepository.findById(cafeId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.CAFE_NOT_FOUND));
    }

    @Transactional(readOnly = true)
    public MultiResponseDto<SimpleCafeInfo> findCafe(String category, Integer page, String sort) {
        Page<Cafe> result;
        if (!isCategory(category)) throw new BusinessLogicException(ExceptionCode.INVALID_INPUT_VALUE);
        else if (category.equals("all")) result = findAll(page, sort);
        else result = findByCtg(category, page, sort);

        return new MultiResponseDto<>(cafeMapper.cafeListToCafeSimpleDto(result.getContent()), result);
    }

    public Page<Cafe> findAll(Integer page, String sort){
        PageRequest pageRequest = PageRequest.of(page, 10, Sort.by(SortType.findType(sort, false)).descending());
        return cafeRepository.findAll(pageRequest);
    }

    public Page<Cafe> findByCtg(String category, Integer page, String sort){
        PageRequest pageRequest = PageRequest.of(page, 10, Sort.by(SortType.findType(sort, true)).descending());
        return cafeRepository.findByCategory(category, pageRequest);
    }

    public DetailCafeInfo findById(Long id){
        return cafeMapper.cafeToCafeDto(find(id));
    }

    public boolean isCategory(String target){
        return (target.equals("all") || target.equals("study") || target.equals("mood") || target.equals("tasty"));
    }

    @Transactional(readOnly = true)
    public MultiResponseDto<SimpleCafeInfo> searchCafe(String keyword, int page, String sort) {
        Page<Cafe> result;
        if (keyword == null) return findCafe("all", page, sort);
        else if (keyword.startsWith("-")) result = searchByTag(keyword, page, sort);
        else result = searchByName(keyword, page, sort);

        return new MultiResponseDto<>(cafeMapper.cafeListToCafeSimpleDto(result.getContent()), result);
    }

    public Page<Cafe> searchByTag(String keyword, int page, String sort) {
        keyword = keyword.replace("-", "");
        PageRequest pageRequest = PageRequest.of(page, 10, Sort.by(SortType.findType(sort, true)).descending());
        return cafeRepository.searchByTag(keyword, pageRequest);
    }

    public Page<Cafe> searchByName(String keyword, int page, String sort){
        PageRequest pageRequest = PageRequest.of(page, 10, Sort.by(SortType.findType(sort, true)).descending());
        return cafeRepository.searchByName(keyword, pageRequest);
    }
}
