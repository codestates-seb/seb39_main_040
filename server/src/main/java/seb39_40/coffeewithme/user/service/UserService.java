package seb39_40.coffeewithme.user.service;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import seb39_40.coffeewithme.exception.BusinessLogicException;
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
        User result = User.builder()
                .userName(user.getUserName())
                .mobile(user.getMobile())
                .email(user.getEmail())
                .password(bCryptPasswordEncoder.encode(user.getPassword()))
                .roles("ROLE_USER")
                .status(User.UserStatus.USER_SIGNUP)
                .registerDate(LocalDate.now())
                .profilePhoto(imageService.findById(Long.valueOf(1)))
                .build();
        userRepository.save(result);
    }

    public void withdrawUser(String email){
        User user = findByEmail(email);
        user.updateStatus(User.UserStatus.USER_WITHDRAW);
        userRepository.save(user);
    }

    public User getInformation(String email) {
        User user = findByEmail(email);
        return user;
    }

    public User updateInformation(String email,User temp){
        User result = findByEmail(email);
        result.updateInformation(temp.getUserName(), temp.getMobile(),
                imageService.findById(temp.getProfilePhoto().getId()));
        return userRepository.save(result);
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
            throw new BusinessLogicException(HttpStatus.FORBIDDEN,"이미 탈퇴한 회원입니다.");
        }
    }

    private void verifyEmail(String email){
        Optional<User> user=userRepository.findByEmail(email);
        if(user.isPresent()) {
            throw new BusinessLogicException(HttpStatus.CONFLICT, "이미 사용중인 이메일 입니다.");
        }
    }

    public User findById(Long userId) {
        return userRepository.findById(userId).orElseThrow(() -> {
            throw new BusinessLogicException(HttpStatus.NOT_FOUND, "존재하지 않는 회원 ID입니다.");
        });
    }

    public User findByEmail(String username) {
        return userRepository.findByEmail(username).orElseThrow(() -> {
            throw new BusinessLogicException(HttpStatus.NOT_FOUND, "존재하지 않는 회원 EMAIL입니다.");
        });
    }
}
