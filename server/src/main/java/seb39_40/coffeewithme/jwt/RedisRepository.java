package seb39_40.coffeewithme.jwt;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Repository;

import java.util.Objects;
import java.util.concurrent.TimeUnit;

@Repository
@RequiredArgsConstructor
public class RedisRepository {

    private final RedisTemplate redisTemplate;

    public void save(String jwt, String email){
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        valueOperations.set(email, jwt,13, TimeUnit.MINUTES);
    }

    public String findByEmail(String user){
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        String redis = valueOperations.get(user);
        if(Objects.isNull(redis))
            return "false";
        return redis;
    }

}
