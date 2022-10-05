package seb39_40.coffeewithme.user.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import seb39_40.coffeewithme.cafe.domain.Cafe;
import seb39_40.coffeewithme.cafe.service.CafeService;
import seb39_40.coffeewithme.exception.BusinessLogicException;
import seb39_40.coffeewithme.user.domain.Wishlist;
import seb39_40.coffeewithme.user.repository.WishlistRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class WishlistService {
    private final WishlistRepository wishlistRepository;
    private final CafeService cafeService;
    private final UserService userService;

    public void addLike(Long userId, Long cafeId){
        if(wishlistRepository.findByUserIdAndCafeId(userId,cafeId).isPresent()) {
            throw new BusinessLogicException(HttpStatus.CONFLICT,"이미 찜한 카페입니다.");
        }
        Wishlist like = Wishlist.builder()
                .user(userService.findById(userId))
                .cafe(cafeService.findById(cafeId))
                .build();
        wishlistRepository.save(like);
    }

    public void deleteLike(Long userId, Long cafeId){
        Optional<Wishlist> like = wishlistRepository.findByUserIdAndCafeId(userId,cafeId);
        if(!like.isPresent()) {
            throw new BusinessLogicException(HttpStatus.NOT_FOUND,"해당 카페를 찜한 내역이 존재하지 않습니다.");
        }
        wishlistRepository.delete(like.get());
    }

    public List<Cafe> getLike(Long userId){
        if(wishlistRepository.countByUserId(userId)==0)
            return new ArrayList<>();
        List<Wishlist> likes= wishlistRepository.findAllByUserId(userId);
        List<Cafe> cafes=likes.stream().map(like ->{
            Cafe cafe = cafeService.findById(like.getCafe().getId());
            return cafe;
        }).collect(Collectors.toList());
        return cafes;
    }
}
