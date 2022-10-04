package seb39_40.coffeewithme.user.service;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import seb39_40.coffeewithme.cafe.domain.Cafe;
import seb39_40.coffeewithme.cafe.service.CafeService;
import seb39_40.coffeewithme.exception.BusinessLogicException;
import seb39_40.coffeewithme.exception.ErrorResponse;
import seb39_40.coffeewithme.exception.ExceptionCode;
import seb39_40.coffeewithme.user.domain.Wishlist;
import seb39_40.coffeewithme.user.repository.LikeRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LikeService {
    //private final UserRepository userRepository;
    private final LikeRepository likeRepository;
    //private final CafeRepository cafeRepository;
    private final CafeService cafeService;
    private final UserService userService;

    public void addLike(Long userId, Long cafeId){
        if(likeRepository.findByUserIdAndCafeId(userId,cafeId).isPresent()) {
            ErrorResponse errorResponse = new ErrorResponse(HttpStatus.CONFLICT,"이미 찜한 카페입니다.");
            throw new BusinessLogicException(errorResponse);
        }
        else {
            Wishlist like = new Wishlist();
            //like.setUser(userRepository.findById(userId).get());
            like.setUser(userService.findById(userId));
            //Optional<Cafe> cafe=cafeRepository.findById(cafeId);
            Cafe cafe=cafeService.findById(cafeId);
            //if(!cafe.isPresent())
            //    throw new BusinessLogicException(ExceptionCode.CAFE_NOT_FOUND);
            like.setCafe(cafe);
            likeRepository.save(like);
        }
    }

    public void deleteLike(Long userId, Long cafeId){
        Optional<Wishlist> like = likeRepository.findByUserIdAndCafeId(userId,cafeId);
        if(!like.isPresent()) {
            ErrorResponse errorResponse = new ErrorResponse(HttpStatus.NOT_FOUND,"해당 카페를 찜한 내역이 존재하지 않습니다.");
            throw new BusinessLogicException(errorResponse);
        }
        likeRepository.delete(like.get());
    }

    public List<Cafe> getLike(Long userId){
        if(likeRepository.countByUserId(userId)==0)
            return new ArrayList<>();
        List<Wishlist> likes=likeRepository.findAllByUserId(userId);
        List<Cafe> cafes=likes.stream().map(like ->{
            Cafe cafe = cafeService.findById(like.getCafe().getId());
            return cafe;
        }).collect(Collectors.toList());
        return cafes;
    }
}
