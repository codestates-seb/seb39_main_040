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
//      List<TagDto> tagDtoList;
        String mainImg; //추후 이미지 url로 변경
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
        String mainImg; //추후 이미지 url로 변경
        String menuImg; //추후 이미지 url로 변경
        Boolean badge;
        String runningTime;
    }
}
