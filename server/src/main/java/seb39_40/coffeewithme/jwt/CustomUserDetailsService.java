package seb39_40.coffeewithme.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import seb39_40.coffeewithme.exception.ErrorResponse;
import seb39_40.coffeewithme.exception.ExceptionCode;
import seb39_40.coffeewithme.user.domain.User;
import seb39_40.coffeewithme.user.repository.UserRepository;

import javax.servlet.http.HttpServletResponse;
import java.util.NoSuchElementException;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

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
