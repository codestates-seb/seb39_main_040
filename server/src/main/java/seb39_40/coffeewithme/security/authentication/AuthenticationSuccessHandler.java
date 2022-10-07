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
        String at = jwtProvider.createAccessToken(user.getUser().getId(), user.getUser().getEmail());
        String rt = jwtProvider.createRefreshToken(user.getUser().getEmail());

        jwtProvider.saveRefreshToken(user.getUser().getEmail(),rt);
        response.setHeader("AccessToken",TYPE+at);
        response.setHeader("RefreshToken",TYPE+rt);
        log.info("** Success Login [{}]",user.getUsername());

    }
}
