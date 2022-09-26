package seb39_40.coffeewithme.jwt;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import seb39_40.coffeewithme.user.domain.User;
import seb39_40.coffeewithme.user.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public CustomUserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        //존재하지 않는 회원의 경우 먼저 처리하고 user entity 꺼내기 (이 부분이 현재 삭제됨)
        User userEntity = userRepository.findByEmail(email).get();
        return new CustomUserDetails(userEntity);
    }
}
