package seb39_40.coffeewithme.cafe.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;
import lombok.NoArgsConstructor;

public class CafeRequestDto {
    @Data @NoArgsConstructor
    @JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class Post{
        String name;
        //        List<Tag> tags;
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
