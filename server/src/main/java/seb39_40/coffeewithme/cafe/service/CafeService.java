package seb39_40.coffeewithme.cafe.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import seb39_40.coffeewithme.cafe.domain.Cafe;
import seb39_40.coffeewithme.cafe.repository.CafeRepository;

import java.util.List;

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
        cafeRepository.delete(findOne(cafeId));
    }

    public Cafe findOne(Long cafeId){
        return cafeRepository.findById(cafeId).orElseThrow(() -> new RuntimeException("카페를 찾지 못했습니다."));
    }
}
