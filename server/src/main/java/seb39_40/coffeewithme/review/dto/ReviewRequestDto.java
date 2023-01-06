package seb39_40.coffeewithme.review.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;
import lombok.NoArgsConstructor;
import seb39_40.coffeewithme.validation.ImageExist;

import javax.validation.constraints.*;
import java.util.List;

@Data @NoArgsConstructor
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class ReviewRequestDto {
    @NotNull(message = "태그는 비어있을 수 없습니다.")
    @Size(min = 1, message = "태그는 하나 이상 선택되어야 합니다.")
    List<String> tags;

    @NotNull(message = "이미지가 선택되어야 합니다.")
    @ImageExist
    Long reviewImg;

    @NotNull(message = "별점이 입력되어야 합니다.")
    @Min(1) @Max(5)
    Integer score;

    @Size(min=0, max=200, message = "최대 입력할 수 있는 글자 수는 200자 입니다.")
    String description;
}
