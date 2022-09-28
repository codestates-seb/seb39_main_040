package seb39_40.coffeewithme.user.mapper;

import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import seb39_40.coffeewithme.user.domain.User;
import seb39_40.coffeewithme.user.dto.UserRequestDto;
import seb39_40.coffeewithme.user.dto.UserResponseDto;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-09-27T22:29:22+0900",
    comments = "version: 1.5.2.Final, compiler: javac, environment: Java 11.0.15 (Azul Systems, Inc.)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public UserResponseDto.SimpleUserInfo userToUserSimpleInfoDto(User user) {
        if ( user == null ) {
            return null;
        }

        UserResponseDto.SimpleUserInfo simpleUserInfo = new UserResponseDto.SimpleUserInfo();

        simpleUserInfo.setName( user.getUserName() );
        simpleUserInfo.setId( user.getId() );

        return simpleUserInfo;
    }

    @Override
    public User userJoinToUser(UserRequestDto.UserJoin userJoin) {
        if ( userJoin == null ) {
            return null;
        }

        User user = new User();

        user.setUserName( userJoin.getUserName() );
        user.setPassword( userJoin.getPassword() );
        user.setEmail( userJoin.getEmail() );
        user.setMobile( userJoin.getMobile() );

        return user;
    }

    @Override
    public UserResponseDto.UserInfo userToUserInfo(User user) {
        if ( user == null ) {
            return null;
        }

        UserResponseDto.UserInfo userInfo = new UserResponseDto.UserInfo();

        userInfo.setUserName( user.getUserName() );
        userInfo.setEmail( user.getEmail() );
        userInfo.setMobile( user.getMobile() );

        return userInfo;
    }
}
