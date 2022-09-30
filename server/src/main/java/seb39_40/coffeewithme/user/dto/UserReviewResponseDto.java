package seb39_40.coffeewithme.user.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.*;
import seb39_40.coffeewithme.cafe.dto.CafeResponseDto;
import seb39_40.coffeewithme.common.dto.PageInfo;
import seb39_40.coffeewithme.review.domain.ReviewTag;

import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class UserReviewResponseDto {

    List<ReviewSimpleDto> reviews;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ReviewSimpleDto{
        Long id;
        ReviewSimpleCafeDto cafe;
        String description;
        Integer score;
        String reviewImg;
        List<String> tags;

        public void setReviewTags(List<ReviewTag> reviewTags){
            this.tags = reviewTags.stream().map(reviewTag -> reviewTag.getTag().getName()).collect(Collectors.toList());
        }
    }

    @Getter
    @AllArgsConstructor
    public static class ReviewSimpleCafeDto{
        Long id;
        String name;
    }
}
