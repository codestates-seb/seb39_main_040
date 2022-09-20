package seb39_40.coffeewithme.review.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data @NoArgsConstructor
public class ReviewResponseDto {
//    List<TagDto> tags;
//    String userId;
    Long id;
    String description;
    Integer score;
    Long reviewImg;
}
