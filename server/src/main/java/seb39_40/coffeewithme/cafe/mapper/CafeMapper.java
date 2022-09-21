package seb39_40.coffeewithme.cafe.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import seb39_40.coffeewithme.cafe.domain.Cafe;
import seb39_40.coffeewithme.cafe.dto.CafeRequestDto;
import seb39_40.coffeewithme.cafe.dto.CafeResponseDto;

import java.util.List;

import static seb39_40.coffeewithme.cafe.dto.CafeResponseDto.*;

@Mapper(componentModel = "spring")
public interface CafeMapper {
    Cafe cafeDtoToCafe(CafeRequestDto.Post post);
    @Mapping(target = "runningTime", expression = "java(cafe.getOpenTime() + '-' + cafe.getCloseTime())")
    DetailCafeInfo cafeToCafeDto(Cafe cafe);
    SimpleCafeInfo cafeToCafeSimpleDto(Cafe cafe);
    List<SimpleCafeInfo> cafListToCafeSimpleDto(List<Cafe> cafe);
}
