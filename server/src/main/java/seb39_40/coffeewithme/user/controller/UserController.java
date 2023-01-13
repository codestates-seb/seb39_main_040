package seb39_40.coffeewithme.user.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import seb39_40.coffeewithme.security.userdetails.CustomUserDetails;
import seb39_40.coffeewithme.review.domain.Review;
import seb39_40.coffeewithme.user.domain.User;
import seb39_40.coffeewithme.user.dto.UserRequestDto;
import seb39_40.coffeewithme.user.mapper.UserMapper;
import seb39_40.coffeewithme.user.service.UserService;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {

    private final UserService userService;
    private final UserMapper userMapper;

    @PostMapping("/signup")
    public ResponseEntity joinUser(@RequestBody UserRequestDto.UserJoin join){
        User user = userMapper.userJoinToUser(join);
        userService.createUser(user);
        log.info("** Success Signup [{}]",user.getEmail());
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity loginUser(@AuthenticationPrincipal CustomUserDetails userDetails){
        userService.verifyUser(userDetails.getUsername());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/logout")
    public ResponseEntity logoutUser(@AuthenticationPrincipal CustomUserDetails userDetails){
        log.info("** Success Logout [{}]",userDetails.getUsername());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/withdraw")
    public ResponseEntity withdrawUser(@AuthenticationPrincipal CustomUserDetails userDetails){
        userService.withdrawUser(userDetails.getUsername());
        log.info("** Success Withdraw [{}]",userDetails.getUsername());
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @PatchMapping("/token")
    public ResponseEntity reissuanceToken(@AuthenticationPrincipal CustomUserDetails userDetails){
        log.info("** Success Reissuance [{}] Token",userDetails.getUsername());
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @GetMapping("/information")
    public ResponseEntity getUserInformation(@AuthenticationPrincipal CustomUserDetails userDetails){
        log.info("** Get [{}] Information",userDetails.getUsername());
        User user = userService.getInformation(userDetails.getUsername());
        return new ResponseEntity<>(userMapper.userToUserInfo(user), HttpStatus.OK);
    }

    @PatchMapping("/information")
    public ResponseEntity updateUserInformation(@AuthenticationPrincipal CustomUserDetails userDetails,
                                                @RequestBody UserRequestDto.UserUpdate userRequestDto){
        log.info("** Patch [{}] Information",userDetails.getUsername());
        User user = userMapper.userUpdateDtoToUser(userRequestDto);
        User result = userService.updateInformation(userDetails.getUsername(), user);
        return new ResponseEntity<>(userMapper.userToUserInfo(result),HttpStatus.OK);
    }

    @GetMapping("/reviews")
    public ResponseEntity getUserReviews(@AuthenticationPrincipal CustomUserDetails userDetails){
        List<Review> reviewList = userService.getReview(userDetails.getUser().getId());
        log.info("** Get Reviews [{}]",userDetails.getUsername());
        return new ResponseEntity<>(userMapper.reviewsToUserReviewResponseDto(reviewList),HttpStatus.OK);
    }
}
