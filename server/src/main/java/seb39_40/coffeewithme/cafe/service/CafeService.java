package seb39_40.coffeewithme.cafe.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import seb39_40.coffeewithme.cafe.domain.Cafe;
import seb39_40.coffeewithme.cafe.repository.CafeRepository;

@Service
@RequiredArgsConstructor
public class CafeService {
    private final CafeRepository cafeRepository;

    public Page<Cafe> findAll(String category, Integer page, String sort) {
        if (category.equals("all")) {
            if (sort.equals("newest")) sort = "id";
            else if (sort.equals("likes")) sort = "likeCount";
            else if (sort.equals("reviews")) sort = "reviewCount";
            else throw new RuntimeException("존재하지 않는 정렬 기준입니다.");

            PageRequest pageRequest = PageRequest.of(page, 10, Sort.by(sort).descending());
            return cafeRepository.findAll(pageRequest);
        }
        else {
            if (sort.equals("newest")) sort = "cafe_id";
            else if (sort.equals("likes")) sort = "like_count";
            else if (sort.equals("reviews")) sort = "review_count";
            else throw new RuntimeException("존재하지 않는 정렬 기준입니다.");

            PageRequest pageRequest = PageRequest.of(page, 10, Sort.by(sort).descending());
            return cafeRepository.findByCategory(category.toUpperCase(), pageRequest);
        }
    }

    public Long save(Cafe cafe){
        return cafeRepository.save(cafe).getId();
    }

    public void delete(Long cafeId){
        cafeRepository.delete(findById(cafeId));
    }

    public Cafe findById(Long cafeId){
        return cafeRepository.findById(cafeId).orElseThrow(() -> new RuntimeException("카페를 찾지 못했습니다."));
    }

    public Page<Cafe> search(String type, String keyword, int page, String sort) {
        if (keyword == null) return findAll("all", page, sort);
        if (sort.equals("newest")) sort = "cafe_id";
        else if (sort.equals("likes")) sort = "like_count";
        else if (sort.equals("reviews")) sort = "review_count";
        else throw new RuntimeException("존재하지 않는 정렬 기준입니다.");
        PageRequest pageRequest = PageRequest.of(page, 10, Sort.by(sort).descending());

        if (type.equals("name")) return cafeRepository.searchByName(keyword, pageRequest);
        else throw new RuntimeException("검색 속성이 유효하지 않습니다.");
    }
}
