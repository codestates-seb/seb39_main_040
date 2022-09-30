package seb39_40.coffeewithme.user.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import seb39_40.coffeewithme.cafe.domain.Cafe;
import seb39_40.coffeewithme.cafe.dto.CafeResponseDto;
import seb39_40.coffeewithme.image.repository.ImageRepository;
import seb39_40.coffeewithme.user.domain.User;
import seb39_40.coffeewithme.user.dto.UserRequestDto;
import seb39_40.coffeewithme.user.dto.UserResponseDto;
import seb39_40.coffeewithme.user.dto.WishlistResponse;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(target = "name", source = "userName")
    UserResponseDto.SimpleUserInfo userToUserSimpleInfoDto(User user);
    User userJoinToUser(UserRequestDto.UserJoin userJoin);
    UserResponseDto.UserInfo userToUserInfo(User user);

    default WishlistResponse cafesToWishlistDto(List<CafeResponseDto.SimpleCafeInfo> cafes){
        return new WishlistResponse(cafes);
    }
    /*
    default WishlistResponse cafesToWishlistDto(List<Cafe> cafes){
        List<CafeResponseDto.SimpleCafeInfo> simpleCafeInfos
                =cafes.stream().map(cafe -> {
                    CafeResponseDto.SimpleCafeInfo simpleCafe=new CafeResponseDto.SimpleCafeInfo();
                    simpleCafe.setCafeTags(cafe.getCafeTags());

                    simpleCafe.setMainImg(cafe.getMainImg());

        }).collect(Collectors.toList());
        return new WishlistResponse(simpleCafeInfos);
    };
     */
}
