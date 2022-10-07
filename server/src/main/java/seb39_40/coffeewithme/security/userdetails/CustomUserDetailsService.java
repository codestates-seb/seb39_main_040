package seb39_40.coffeewithme.security.userdetails;


import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import seb39_40.coffeewithme.user.domain.User;
import seb39_40.coffeewithme.user.repository.UserRepository;

import java.util.Optional;


@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public CustomUserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        //존재하지 않는 회원의 경우 먼저 처리하고 user entity 꺼내기 (이 부분이 현재 삭제됨)
        Optional<User> userEntity = userRepository.findByEmail(email);
       // if(!userEntity.isPresent())
       //         throw new UsernameNotFoundException("존재하지 않는 이메일입니다.");
        return new CustomUserDetails(userEntity.get());
    }
}
