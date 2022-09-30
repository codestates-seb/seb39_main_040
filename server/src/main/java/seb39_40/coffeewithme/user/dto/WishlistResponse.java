package seb39_40.coffeewithme.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import seb39_40.coffeewithme.cafe.dto.CafeResponseDto;
import seb39_40.coffeewithme.common.dto.PageInfo;

import java.util.List;

@Getter
@AllArgsConstructor
public class WishlistResponse {

    List<CafeResponseDto.SimpleCafeInfo> wishlist;
    //PageInfo pageInfo;
}
