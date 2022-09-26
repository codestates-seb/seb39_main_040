package seb39_40.coffeewithme.user.mapper;

import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import seb39_40.coffeewithme.user.domain.User;
import seb39_40.coffeewithme.user.dto.UserRequestDto;
import seb39_40.coffeewithme.user.dto.UserResponseDto;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-09-26T11:09:18+0900",
    comments = "version: 1.5.2.Final, compiler: javac, environment: Java 11.0.15 (Azul Systems, Inc.)"
)
@Component
public class UserMapperImpl implements UserMapper {

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
    public UserResponseDto.UserInformation userToUserInformation(User user) {
        if ( user == null ) {
            return null;
        }

        UserResponseDto.UserInformation userInformation = new UserResponseDto.UserInformation();

        userInformation.setUserName( user.getUserName() );
        userInformation.setEmail( user.getEmail() );
        userInformation.setMobile( user.getMobile() );

        return userInformation;
    }
}
