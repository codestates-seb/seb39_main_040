package seb39_40.coffeewithme.user.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import seb39_40.coffeewithme.cafe.domain.Cafe;
import seb39_40.coffeewithme.cafe.mapper.CafeMapper;
import seb39_40.coffeewithme.security.userdetails.CustomUserDetails;
import seb39_40.coffeewithme.user.mapper.UserMapper;
import seb39_40.coffeewithme.user.service.WishlistService;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/users/wishlist")
public class WishlistController {

    private final WishlistService wishlistService;
    private final CafeMapper cafeMapper;
    private final UserMapper userMapper;

    @PostMapping("/{cafeId}")
    public ResponseEntity setLike(@AuthenticationPrincipal CustomUserDetails userDetails,
                                  @PathVariable("cafeId") Long cafeId){
        log.info("** Post Wishlist [user:{}, cafeId:{}]",userDetails.getUsername(),cafeId);
        wishlistService.addLike(userDetails.getUser().getId(), cafeId);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity getLikes(@AuthenticationPrincipal CustomUserDetails userDetails){
        List<Cafe> cafes = wishlistService.getLike(userDetails.getUser().getId());
        log.info("** Get Wishlist [{}]",userDetails.getUsername());
        return new ResponseEntity<>(userMapper.cafesToWishlistDto(cafeMapper.cafeListToCafeSimpleDto(cafes)),HttpStatus.OK);
    }

    @DeleteMapping("/{cafeId}")
    public ResponseEntity deleteLike(@AuthenticationPrincipal CustomUserDetails userDetails,
                                     @PathVariable("cafeId") Long cafeId){
        wishlistService.deleteLike(userDetails.getUser().getId(), cafeId);
        log.info("** Delete Wishlist [user:{}, cafeId:{}]",userDetails.getUsername(), cafeId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
