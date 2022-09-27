package seb39_40.coffeewithme.user.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import seb39_40.coffeewithme.cafe.domain.Cafe;
import seb39_40.coffeewithme.cafe.repository.CafeRepository;
import seb39_40.coffeewithme.exception.BusinessLogicException;
import seb39_40.coffeewithme.exception.ExceptionCode;
import seb39_40.coffeewithme.user.domain.Wishlist;
import seb39_40.coffeewithme.user.repository.LikeRepository;
import seb39_40.coffeewithme.user.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LikeService {
    private final UserRepository userRepository;
    private final LikeRepository likeRepository;
    private final CafeRepository cafeRepository;

    //위시리스트 등록
    public void addLike(Long userId, Long cafeId){
        if(likeRepository.findByUserIdAndCafeId(userId,cafeId).isPresent())
            throw new BusinessLogicException(ExceptionCode.LIKE_ALREADY_EXISTS);
        else {
            Wishlist like = new Wishlist();
            like.setUser(userRepository.findById(userId).get());
            Optional<Cafe> cafe=cafeRepository.findById(cafeId);
            if(!cafe.isPresent())
                throw new BusinessLogicException(ExceptionCode.CAFE_NOT_FOUND);
            like.setCafe(cafe.get());
            likeRepository.save(like);
        }
        /*
    1. 요청에 유저정보, 카페정보가 같이 넘어옴
    2. 찜하기에 유저 아이디랑 카페 아이디랑 담아서 저장
    3. 유저에 등록
    4. 카페에 등록
     */
    }

    //위시리스트 삭제
    public void deleteLike(Long userId, Long cafeId){
        Optional<Wishlist> like = likeRepository.findByUserIdAndCafeId(userId,cafeId);
        if(!like.isPresent())
            throw new BusinessLogicException(ExceptionCode.LIKE_NOT_FOUND);
        likeRepository.delete(like.get());
    }
    /*
    1. 해당 찜하기의 유저 아이디랑 카페 아이디를 꺼냄
    2. 유저에 삭제
    3. 카페에 삭제
    4. 해당 찜하기 삭제
     */
    //멤버에 맞는 위시리스트 조회
    public List<Cafe> getLike(Long userId){
        if(likeRepository.countByUserId(userId)==0)
            return new ArrayList<>();
        List<Wishlist> likes=likeRepository.findAllByUserId(userId);
        List<Cafe> cafes=likes.stream().map(like ->{
            Cafe cafe = cafeRepository.findById(like.getCafe().getId()).get();
            return cafe;
        }).collect(Collectors.toList());
        return cafes;
    }
    /*
    1. 멤버 아이디로 찜하기 조회
    2. 찜하기에 맞는 카페정보 가져오기 - user_id에 해당하는 컬럼 가져오기
    3. 맵퍼에서 일정 정보만 빼내서 전달하기 - 리스트마다 cafe_id 기준으로 카페 조회해서 담음
    */
    /*
    public void verifyLikeWithUserId(Long userId){
        Optional<Wishlist> like=likeRepository.findByUserId(userId);
        if(!like.isPresent())
            throw new BusinessLogicException(ExceptionCode.Li)
    }
    */
}
