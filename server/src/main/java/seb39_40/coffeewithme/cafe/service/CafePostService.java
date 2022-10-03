package seb39_40.coffeewithme.cafe.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import seb39_40.coffeewithme.cafe.domain.Cafe;
import seb39_40.coffeewithme.image.service.ImageService;

@Service
@RequiredArgsConstructor
public class CafePostService {
    private final ImageService imageService;
    private final CafeService cafeService;

    @Transactional
    public Long register(Cafe cafe){
        // 여기에 이벤트를 적용하는 건 어떨까? https://wisdom-and-record.tistory.com/133
        // 게시글이 등록되면 이미지도 save되도록, 삭제되면 delete 되도록!
        imageService.findById(cafe.getMainImg()).saveImg();
        imageService.findById(cafe.getMenuImg()).saveImg();
        return cafeService.save(cafe);
    }

    @Transactional
    public void delete(Long id){
        Cafe cafe = cafeService.findById(id);
        imageService.findById(cafe.getMainImg()).deleteImg();
        imageService.findById(cafe.getMenuImg()).deleteImg();
        cafeService.delete(cafe);
    }

}
