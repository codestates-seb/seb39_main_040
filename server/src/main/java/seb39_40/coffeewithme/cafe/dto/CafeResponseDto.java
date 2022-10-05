package seb39_40.coffeewithme.cafe.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;
import lombok.NoArgsConstructor;
import seb39_40.coffeewithme.cafe.domain.CafeTag;

import java.util.List;
import java.util.stream.Collectors;

public class CafeResponseDto {
    @Data @NoArgsConstructor
    @JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class SimpleCafeInfo{
        Long id;
        String name;
        List<String> tags;
        String description;
        String mainImg;

        public void setCafeTags(List<CafeTag> cafeTags){
            this.tags = cafeTags.stream().map(cafeTag -> cafeTag.getTag().getName()).collect(Collectors.toList());
        }
    }

    @Data @NoArgsConstructor
    @JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class DetailCafeInfo{
        Long id;
        String name;
        List<String> tags;
        String description;
        String address;
        Long likeCount;
        Long reviewCount;
        String mainImg;
        String menuImg;
        Boolean badge;
        String runningTime;
        String homepage;
        String phone;

        public void setCafeTags(List<CafeTag> cafeTags){
            this.tags = cafeTags.stream().map(cafeTag -> cafeTag.getTag().getName()).collect(Collectors.toList());
        }
    }
}
