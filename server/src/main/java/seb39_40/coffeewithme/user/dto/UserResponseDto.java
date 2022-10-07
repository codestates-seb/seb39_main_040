package seb39_40.coffeewithme.user.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import seb39_40.coffeewithme.image.domain.Image;


public class UserResponseDto {
    @Data
    @NoArgsConstructor
    public static class SimpleUserInfo{
        Long id;
        String name;
    }

    @Data
    @NoArgsConstructor
    public static class UserInfo{
        private String userName;
        private String email;
        private String mobile;
        private Image profilePhoto;
    }
}
