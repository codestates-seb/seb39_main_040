package seb39_40.coffeewithme.jwt;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RequiredArgsConstructor
@Component
public class AuthenticationSuccessHandler implements org.springframework.security.web.authentication.AuthenticationSuccessHandler {
    private final JwtProvider jwtProvider;
    private final String TYPE="Bearer ";


    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        CustomUserDetails user = (CustomUserDetails) authentication.getPrincipal();
        String at = jwtProvider.createAccessToken(user.getUser().getId(), user.getUser().getEmail());
        String rt = jwtProvider.createRefreshToken(user.getUser().getEmail());

        jwtProvider.saveRefreshToken(user.getUser().getEmail(),rt);
        response.setHeader("AccessToken",TYPE+at);
        response.setHeader("RefreshToken",TYPE+rt);
    }
}
