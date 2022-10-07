package seb39_40.coffeewithme.user.dto;

import lombok.*;
import seb39_40.coffeewithme.review.domain.ReviewTag;

import java.util.List;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserReviewResponseDto {

   private List<ReviewSimpleDto> reviews;

    @Data
    @NoArgsConstructor
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
