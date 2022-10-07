package seb39_40.coffeewithme.security.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
@RequiredArgsConstructor
public class JwtProvider {
    private int ACCESS_EXPIRATION= 1000 * 60 * 10;
    private String SECRET_KEY="cwmsecretkeycwmsecretkeycwmsecretkeycwmsecretkeycwmsecretkey";
    private final RedisRepository redisRepository;

    public String createAccessToken(Long id,String email){
        SecretKey key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(SECRET_KEY));

        return Jwts.builder()
                .signWith(key, SignatureAlgorithm.HS256)
                .setSubject("Access Token")
                .claim("id",id)
                .claim("email",email)
                .setExpiration(new Date(System.currentTimeMillis()+ACCESS_EXPIRATION))
                .compact();
    }
    public String createRefreshToken(String email){
        SecretKey key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(SECRET_KEY));

        return Jwts.builder()
                .signWith(key, SignatureAlgorithm.HS256)
                .setSubject("Refresh Token")
                //.setExpiration(new Date(System.currentTimeMillis()+REFRESH_EXPIRATION))
                .claim("email",email)
                .compact();
    }

    public void saveRefreshToken(String email,String token){
        redisRepository.save(token, email);
    }

    public Claims parseToken(String jwt){
        SecretKey key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(SECRET_KEY));
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jwt)
                .getBody();
    }

    public void validationTheSameToken(String email,String token){
        String result = redisRepository.findByEmail(email);
        if(!result.equals(token))
            throw new JwtException("유효하지 않은 Refresh Token 입니다.");
    }

    public String substringToken(String token){
        if(!token.startsWith("Bearer "))
            throw new JwtException("JWT 토큰 형식이 올바르지 않습니다.");
        else return token.replace("Bearer ", "");
    }

    public String getEmailToClaims(Claims claims){
        return claims.get("email").toString();
    }
}
