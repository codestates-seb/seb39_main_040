package seb39_40.coffeewithme.cafe.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;
import lombok.NoArgsConstructor;

public class CafeResponseDto {
    @Data @NoArgsConstructor
    @JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class SimpleCafeInfo{
        Long id;
        String name;
//        List<TagDto> tagDtoList;
        String description;
        Long likeCount;
        Long reviewCount;
        Boolean badge;
        String mainImg;
    }

    @Data @NoArgsConstructor
    @JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class DetailCafeInfo{
        Long id;
        String name;
        //        List<TagDto> tagDtoList;
        String description;
        String address;
        Long likeCount;
        Long reviewCount;
        String mainImg;
        String menuImg;
        Boolean badge;
        String runningTime;
    }
}
