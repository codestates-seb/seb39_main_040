package seb39_40.coffeewithme.cafe.mapper;

import org.mapstruct.Mapper;
import seb39_40.coffeewithme.cafe.domain.Cafe;
import seb39_40.coffeewithme.cafe.dto.CafeRequestDto;
import seb39_40.coffeewithme.cafe.dto.CafeResponseDto;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CafeMapper {
    Cafe cafeDtoToCafe(CafeRequestDto.Post post);
    CafeResponseDto.SimpleCafeInfo cafeToCafeDto(Cafe cafe);
}
