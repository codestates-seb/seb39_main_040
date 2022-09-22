package seb39_40.coffeewithme.review.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;
import lombok.NoArgsConstructor;
import seb39_40.coffeewithme.user.dto.UserResponseDto;

import java.util.List;

@Data @NoArgsConstructor
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class ReviewResponseDto {
//    List<TagDto> tags;
    UserResponseDto.SimpleUserInfo user;
    Long id;
    String description;
    Integer score;
    Long reviewImg;
}
