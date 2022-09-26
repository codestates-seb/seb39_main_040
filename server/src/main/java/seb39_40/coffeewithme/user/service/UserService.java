package seb39_40.coffeewithme.user.service;

import lombok.AllArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import seb39_40.coffeewithme.user.domain.User;
import seb39_40.coffeewithme.user.repository.UserRepository;

import java.time.LocalDate;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    public boolean createUser(User user) {
        boolean verify=verifyEmail(user.getEmail());
        if(!verify){
            return false;
        }
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        user.setRoles("ROLE_USER");
        user.setStatus(User.UserStatus.USER_SIGNUP);
        user.setRegisterDate(LocalDate.now());
        userRepository.save(user);
        return true;
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

    public User updateInformation(User temp){
        User result = findVerifiedUserWithEmail(temp.getEmail());
        return null;
    }

    public User findVerifiedUserWithEmail(String email){
        Optional<User> user = userRepository.findByEmail(email);
      //  user.orElseThrow(() ->
      //          new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
        return user.get();
    }

    public void saveRefreshToken(String email,String token){
        User user = findVerifiedUserWithEmail(email);
        user.setRefresh(token);
        userRepository.save(user);
    }

    public boolean verifyUser(String email){
        User user=userRepository.findByEmail(email).get();
        if(user.getStatus().equals(User.UserStatus.USER_WITHDRAW))
            return false;
        //throw new BusinessLogicException(ExceptionCode.EMAIL_ALREADY_EXISTS); //이미 이메일이 존재합니다(이미 사용중인 이메일입니다.)
        return true;
    }

    //이메일 중복 검증 - 예외 처리 되면 반환 값 없애기! boolean -> void 로
    private boolean verifyEmail(String email){
        Optional<User> user=userRepository.findByEmail(email);
        if(user.isPresent())
            return false;
            //throw new BusinessLogicException(ExceptionCode.EMAIL_ALREADY_EXISTS); //이미 이메일이 존재합니다(이미 사용중인 이메일입니다.)
        return true;
    }
}
