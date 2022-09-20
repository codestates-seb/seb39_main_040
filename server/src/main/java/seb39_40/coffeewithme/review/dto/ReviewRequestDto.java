package seb39_40.coffeewithme.review.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;
import lombok.NoArgsConstructor;

public class ReviewRequestDto {
    @Data @NoArgsConstructor
    @JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class Post{
//        List<Tag> tags;
        Long reviewImg;
        Integer score;
        String description;
    }
}
