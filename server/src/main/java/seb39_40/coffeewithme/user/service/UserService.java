package seb39_40.coffeewithme.user.service;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import seb39_40.coffeewithme.exception.BusinessLogicException;
import seb39_40.coffeewithme.exception.ErrorResponse;
import seb39_40.coffeewithme.image.service.ImageService;
import seb39_40.coffeewithme.review.domain.Review;
import seb39_40.coffeewithme.review.repository.ReviewRepository;
import seb39_40.coffeewithme.user.domain.User;
import seb39_40.coffeewithme.user.repository.UserRepository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final ReviewRepository reviewRepository;
    private final ImageService imageService;

    public void createUser(User user) {
        verifyEmail(user.getEmail());

        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        user.setRoles("ROLE_USER");
        user.setStatus(User.UserStatus.USER_SIGNUP);
        user.setRegisterDate(LocalDate.now());

        //이미지 처리 - 처음엔 기본 이미지로 처리
        user.setProfilePhoto(imageService.findById(Long.valueOf(1)));

        userRepository.save(user);
    }

    public void withdrawUser(String email){
        User user = findVerifiedUserWithEmail(email);
        user.setStatus(User.UserStatus.USER_WITHDRAW);
        userRepository.save(user);
    }
    public boolean logoutUser(String email){
        User user = findVerifiedUserWithEmail(email);
        userRepository.save(user);
        return true;
    }

    public User getInformation(String email) {
        User user = findVerifiedUserWithEmail(email);
        return user;
    }

    public User updateInformation(String email,User temp){
        User result = findVerifiedUserWithEmail(email);
        if(!temp.getUserName().isEmpty())
            result.setUserName(temp.getUserName());
        if(!temp.getMobile().isEmpty())
            result.setMobile(temp.getMobile());
        if(temp.getProfilePhoto().getId()!= result.getProfilePhoto().getId())
            result.setProfilePhoto(imageService.findById(temp.getProfilePhoto().getId()));
        return userRepository.save(result);
    }

    public User findVerifiedUserWithEmail(String email){
        User user = findByEmail(email);
        return user;
    }

    public List<Review> getReview(Long userId) {
        List<Review> reviewList = new ArrayList<>();
        if(reviewRepository.countByUserId(userId)==0)
            return reviewList;
        reviewList = reviewRepository.findAllByUserId(userId);
        return reviewList;
    }

    public void verifyUser(String email){
        User user=userRepository.findByEmail(email).get();
        if(user.getStatus().equals(User.UserStatus.USER_WITHDRAW)) {
            ErrorResponse errorResponse=new ErrorResponse(HttpStatus.FORBIDDEN,"이미 탈퇴한 회원입니다.");
            throw new BusinessLogicException(errorResponse);
        }
    }

    private void verifyEmail(String email){
        Optional<User> user=userRepository.findByEmail(email);
        if(user.isPresent()) {
            ErrorResponse errorResponse=new ErrorResponse(HttpStatus.CONFLICT, "이미 사용중인 이메일 입니다.");
            throw new BusinessLogicException(errorResponse);
        }
    }

    public User findById(Long userId) {
        return userRepository.findById(userId).orElseThrow(() -> {
            ErrorResponse errorResponse = new ErrorResponse(HttpStatus.NOT_FOUND, "존재하지 않는 회원 ID입니다.");
            throw new BusinessLogicException(errorResponse);
        });
    }

    public User findByEmail(String username) {
        return userRepository.findByEmail(username).orElseThrow(() -> {
            ErrorResponse errorResponse = new ErrorResponse(HttpStatus.NOT_FOUND, "존재하지 않는 회원 EMAIL입니다.");
            throw new BusinessLogicException(errorResponse);
        });
    }
}
