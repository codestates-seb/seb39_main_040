package seb39_40.coffeewithme.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import seb39_40.coffeewithme.cafe.dto.CafeResponseDto;

import java.util.List;

@Getter
@AllArgsConstructor
public class WishlistResponse {
    private List<CafeResponseDto.SimpleCafeInfo> wishlist;
}
