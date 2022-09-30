package seb39_40.coffeewithme.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import seb39_40.coffeewithme.common.dto.PageInfo;
import seb39_40.coffeewithme.review.domain.ReviewTag;

import java.util.List;
import java.util.stream.Collectors;

public class UserReviewResponseDto {

    List<ReviewSimpleDto> reviews;
   // PageInfo pageInfo;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ReviewSimpleDto{
        String cafeName;
        Long id;
        String description;
        Integer score;
        String reviewImg;
        List<String> tags;
    }
}
