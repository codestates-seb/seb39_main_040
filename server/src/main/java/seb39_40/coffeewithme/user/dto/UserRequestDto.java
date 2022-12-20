package seb39_40.coffeewithme.user.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

public class UserRequestDto {
    @Data
    @NoArgsConstructor
    public static class UserJoin{
        @NotBlank
        @Size(max=50,message="이름은 50자미만으로 작성해야 합니다.")
        private String userName;
        @NotBlank
        @Size(max=20,message="비밀번호는 20자미만으로 작성해야 합니다.")
        private String password;
        @Email
        @Size(max=20,message="이메일은 20자미만으로 작성해야 합니다.")
        private String email;
        @NotBlank
        @Pattern(regexp = "^\\d{2,3}-\\d{3,4}-\\d{4}$", message = "핸드폰 번호는 11자리 숫자와 '-'로 구성되어야 합니다.")
        private String mobile;
    }

    @Data
    @NoArgsConstructor
    public static class UserUpdate{
        @NotBlank
        @Size(max=50,message="이름은 50자미만으로 작성해야 합니다.")
        private String userName;
        @NotBlank
        @Pattern(regexp = "^\\d{2,3}-\\d{3,4}-\\d{4}$", message = "핸드폰 번호는 11자리 숫자와 '-'로 구성되어야 합니다.")
        private String mobile;
        @NotBlank
        private Long profilePhoto;
    }
}
