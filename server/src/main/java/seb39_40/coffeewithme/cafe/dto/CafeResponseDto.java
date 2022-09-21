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
        String mainImg; //추후 이미지 url로 변경

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
        String mainImg; //추후 이미지 url로 변경
        String menuImg; //추후 이미지 url로 변경
        Boolean badge;
        String runningTime;

        public void setCafeTags(List<CafeTag> cafeTags){
            this.tags = cafeTags.stream().map(cafeTag -> cafeTag.getTag().getName()).collect(Collectors.toList());
        }
    }
}
