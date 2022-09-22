package seb39_40.coffeewithme.user.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

public class UserResponseDto {
    @Data @NoArgsConstructor
    public static class SimpleUserInfo{
        Long id;
        String name;
    }
}
