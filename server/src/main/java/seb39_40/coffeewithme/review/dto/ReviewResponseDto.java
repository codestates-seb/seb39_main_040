package seb39_40.coffeewithme.review.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;
import lombok.NoArgsConstructor;
import seb39_40.coffeewithme.review.domain.ReviewTag;
import seb39_40.coffeewithme.user.dto.UserResponseDto;

import java.util.List;
import java.util.stream.Collectors;

@Data @NoArgsConstructor
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class ReviewResponseDto {
    @Data @NoArgsConstructor
    @JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class ReviewInfo{
        List<String> tags;
        UserResponseDto.SimpleUserInfo user;
        Long id;
        String description;
        Integer score;
        String reviewImg;

        public void setReviewTags(List<ReviewTag> reviewTags){
            this.tags = reviewTags.stream().map(reviewTag -> reviewTag.getTag().getName()).collect(Collectors.toList());
        }
    }

    @Data @NoArgsConstructor
    public static class ImageInfo{
        Long id;
        String path;
    }

}
