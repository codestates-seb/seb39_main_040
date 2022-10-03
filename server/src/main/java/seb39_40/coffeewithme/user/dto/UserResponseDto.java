package seb39_40.coffeewithme.user.dto;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import seb39_40.coffeewithme.image.domain.Image;


public class UserResponseDto {
    @Data @NoArgsConstructor
    public static class SimpleUserInfo{
        Long id;
        String name;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UserInfo{
        private String userName;
        private String email;
        private String mobile;
        private Image profilePhoto;
    }
}
