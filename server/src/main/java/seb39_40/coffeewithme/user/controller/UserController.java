package seb39_40.coffeewithme.user.controller;

import lombok.AllArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import seb39_40.coffeewithme.jwt.CustomUserDetails;
import seb39_40.coffeewithme.user.domain.User;
import seb39_40.coffeewithme.user.dto.UserRequestDto;
import seb39_40.coffeewithme.user.mapper.UserMapper;
import seb39_40.coffeewithme.user.service.UserService;

@RestController
@AllArgsConstructor
@RequestMapping("/users")
public class UserController {

    private final UserService userService;
    private final UserMapper mapper;

    @PostMapping("/signup")
    public ResponseEntity joinUser(@RequestBody UserRequestDto.UserJoin join){
        User user = mapper.userJoinToUser(join);
        boolean result=userService.createUser(user);
        if(!result){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity loginUser(@AuthenticationPrincipal CustomUserDetails userDetails){
        if(!userService.verifyUser(userDetails.getUsername()))
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        else {
            System.out.println("** Success Login : " + userDetails.getUsername());
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity logoutUser(@AuthenticationPrincipal CustomUserDetails userDetails){
        userService.logoutUser(userDetails.getUsername());
        System.out.println("** Success Logout : "+userDetails.getUsername());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/withdraw")
    public ResponseEntity withdrawUser(@AuthenticationPrincipal CustomUserDetails userDetails){
        userService.withdrawUser(userDetails.getUsername());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/information")
    public ResponseEntity getUserInformation(@AuthenticationPrincipal CustomUserDetails userDetails){
        System.out.println("** Get User Information : "+userDetails.getUsername());
        User user = userService.getInformation(userDetails.getUsername());
        return new ResponseEntity<>(mapper.userToUserInfo(user),HttpStatus.OK);
    }

}
