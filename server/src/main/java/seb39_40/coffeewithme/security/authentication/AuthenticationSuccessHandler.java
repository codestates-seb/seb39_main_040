package seb39_40.coffeewithme.security.authentication;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import seb39_40.coffeewithme.security.userdetails.CustomUserDetails;
import seb39_40.coffeewithme.security.jwt.JwtProvider;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
@Component
public class AuthenticationSuccessHandler implements org.springframework.security.web.authentication.AuthenticationSuccessHandler {
    private final JwtProvider jwtProvider;
    private String TYPE="Bearer ";


    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        CustomUserDetails user = (CustomUserDetails) authentication.getPrincipal();
        //권한도 넘겨줌 (여기서 user 자체를 넘겨주는 게 좋을지... 아님 각각 주는게 좋을지 거시기 허네)
        //근데 User에 접근해서 get으로 이렇게 가져와도 되나?
        String at = jwtProvider.createAccessToken(user.getUser().getId(), user.getUser().getEmail(),user.getUser().getRoles().name()); //원래에 role 추가해봄
        String rt = jwtProvider.createRefreshToken(user.getUser().getEmail());

        jwtProvider.saveRefreshToken(user.getUser().getEmail(),rt);
        response.setHeader("AccessToken",TYPE+at);
        response.setHeader("RefreshToken",TYPE+rt);
        log.info("** Success Login [{}]",user.getUsername());
        
    }
}
