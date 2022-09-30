package seb39_40.coffeewithme.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;
import seb39_40.coffeewithme.user.service.UserService;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtProvider {
    //액세스 토큰 만료 시간
    private int ACCESS_EXPIRATION= 1000 * 60 * 3;
    //리프레시 토큰 만료 시간
    private int REFRESH_EXPIRATION= 1000 * 60 * 120;
    //secret키 관련 정보
    private String SECRET_KEY="cwmsecretkeycwmsecretkeycwmsecretkeycwmsecretkeycwmsecretkey";


    private final UserService userService;

    public JwtProvider(UserService userService) {
        this.userService = userService;
    }

    public String createAccessToken(Long id,String email){
        SecretKey key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(SECRET_KEY));

        return Jwts.builder()
                .signWith(key, SignatureAlgorithm.HS256)
                .setSubject("cwm_access_token")
                .claim("id",id)
                .claim("email",email)
                .setExpiration(new Date(System.currentTimeMillis()+ACCESS_EXPIRATION))
                .compact();
    }
    public String createRefreshToken(String email){
        SecretKey key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(SECRET_KEY));
        return Jwts.builder()
                .signWith(key, SignatureAlgorithm.HS256)
                .setSubject("cwm_refresh_token")
                .setExpiration(new Date(System.currentTimeMillis()+REFRESH_EXPIRATION))
                .claim("email",email)
                .compact();
    }

    public void saveRefreshToken(String email,String token){
        userService.saveRefreshToken(email,token);
    }

    public Claims parseToken(String jwt){
        SecretKey key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(SECRET_KEY));
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jwt)
                .getBody();
    }

    public boolean validationTheSameToken(String email,String token){
        return token.equals(userService.findVerifiedUserWithEmail(email).getRefresh());
    }

    public String substringToken(String token){
        if(!token.startsWith("Bearer "))
            throw new JwtException("JWT 토큰 형식이 올바르지 않습니다.");
        else return token.replace("Bearer ", "");
    }

    /*
    public boolean validationTimeToken(Claims claims){
        System.out.println("Date : "+claims.getExpiration());
        System.out.println(new Date());
        return !claims
                .getExpiration()
                .before(new Date());
    }
     */

    public String getEmailToClaims(Claims claims){
        return claims.get("email").toString();
    }
}
