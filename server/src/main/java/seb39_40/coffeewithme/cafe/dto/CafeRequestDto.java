package seb39_40.coffeewithme.cafe.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;
import lombok.NoArgsConstructor;
import seb39_40.coffeewithme.validation.ImageExist;

import javax.validation.constraints.*;
import java.util.List;

public class CafeRequestDto {
    @Data @NoArgsConstructor
    @JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class Post{
        @NotNull(message = "카페 이름이 입력되어야 합니다.")
        @Size(max = 20, message = "카페 이름은 20자 이내여야 합니다.")
        String name;

        List<Long> tags;
        String address;
        String description;

        @NotNull(message = "메인 이미지가 선택되어야 합니다.")
        @ImageExist
        Long mainImg;

        @NotNull(message = "메뉴 이미지가 선택되어야 합니다.")
        @ImageExist
        Long menuImg;

        @NotNull(message = "오픈 시간이 입력되어야 합니다.")
        @Pattern(regexp = "^\\d{2}:\\d{2}$", message = "오픈 시간은 00:00 형식으로 입력되어야 합니다.")
        String openTime;

        @NotNull(message = "마감 시간이 입력되어야 합니다.")
        @Pattern(regexp = "^\\d{2}:\\d{2}$", message = "오픈 시간은 00:00 형식으로 입력되어야 합니다.")
        String closeTime;

        @Pattern(regexp = "^\\d{2,3}-\\d{3,4}-\\d{4}$",
                message = "전화번호는 11자리 숫자와 '-'로 구성되어야 합니다.")
        String phone;

        String homepage;
    }
}
