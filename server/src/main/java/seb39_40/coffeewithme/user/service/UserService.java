package seb39_40.coffeewithme.user.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import seb39_40.coffeewithme.exception.BusinessLogicException;
import seb39_40.coffeewithme.exception.ExceptionCode;
import seb39_40.coffeewithme.user.domain.User;
import seb39_40.coffeewithme.user.repository.UserRepository;

import java.time.LocalDate;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public void createUser(User user) {
        verifyEmail(user.getEmail());

        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        user.setRoles("ROLE_USER");
        user.setStatus(User.UserStatus.USER_SIGNUP);
        user.setRegisterDate(LocalDate.now());
        userRepository.save(user);
    }

    public void withdrawUser(String email){
        User user = findVerifiedUserWithEmail(email);
        //false인 경우 - 로그아웃에 실패한 경우는 뭘로 해야되나 이미 null인 경우를 봐야하는 건가? 일단 보류
        user.setStatus(User.UserStatus.USER_WITHDRAW);
        user.setRefresh("");
        userRepository.save(user);
    }
    public boolean logoutUser(String email){
        User user = findVerifiedUserWithEmail(email);
        //false인 경우 - 로그아웃에 실패한 경우는 뭘로 해야되나 이미 null인 경우를 봐야하는 건가? 일단 보류
        user.setRefresh("");
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
        return userRepository.save(result);
    }

    public User findVerifiedUserWithEmail(String email){
        Optional<User> user = userRepository.findByEmail(email);
        user.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
        return user.get();
    }

    public void saveRefreshToken(String email,String token){
        User user = findVerifiedUserWithEmail(email);
        user.setRefresh(token);
        userRepository.save(user);
    }

    public void verifyUser(String email){
        User user=userRepository.findByEmail(email).get();
        if(user.getStatus().equals(User.UserStatus.USER_WITHDRAW))
            throw new BusinessLogicException(ExceptionCode.EMAIL_ALREADY_EXISTS); //이미 이메일이 존재합니다(이미 사용중인 이메일입니다.)
    }

    private void verifyEmail(String email){
        Optional<User> user=userRepository.findByEmail(email);
        if(user.isPresent())
            throw new BusinessLogicException(ExceptionCode.EMAIL_ALREADY_EXISTS); //이미 이메일이 존재합니다(이미 사용중인 이메일입니다.)
    }

    public User findById(Long userId) {
        return userRepository.findById(userId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
    }

    public User findByEmail(String username) {
        return userRepository.findByEmail(username).orElseThrow(() -> new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
    }
}
