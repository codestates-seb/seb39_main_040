package seb39_40.coffeewithme.review.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import seb39_40.coffeewithme.user.dto.UserResponseDto;

import java.util.List;

@Data @NoArgsConstructor
public class ReviewResponseDto {
//    List<TagDto> tags;
    UserResponseDto.SimpleUserInfo user;
    Long id;
    String description;
    Integer score;
    Long reviewImg;
}
