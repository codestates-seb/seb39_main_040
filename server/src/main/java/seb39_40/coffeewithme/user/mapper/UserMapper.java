package seb39_40.coffeewithme.user.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import seb39_40.coffeewithme.user.domain.User;
import seb39_40.coffeewithme.user.dto.UserRequestDto;
import seb39_40.coffeewithme.user.dto.UserResponseDto;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(target = "name", source = "userName")
    UserResponseDto.SimpleUserInfo userToUserSimpleInfoDto(User user);
    User userJoinToUser(UserRequestDto.UserJoin userJoin);
    UserResponseDto.UserInfo userToUserInfo(User user);
}
