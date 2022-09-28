package seb39_40.coffeewithme.cafe.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;
import lombok.NoArgsConstructor;
import seb39_40.coffeewithme.cafe.domain.CafeTag;

import java.util.List;

public class CafeRequestDto {
    @Data @NoArgsConstructor
    @JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class Post{
        String name;
        List<Long> tags;
        String address;
        String description;
        Long mainImg;
        Long menuImg;
        String openTime;
        String closeTime;
        String phone;
        String homepage;
    }
}
