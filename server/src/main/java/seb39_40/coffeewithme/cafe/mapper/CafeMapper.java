package seb39_40.coffeewithme.cafe.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import seb39_40.coffeewithme.cafe.domain.Cafe;

import java.util.List;

import static seb39_40.coffeewithme.cafe.dto.CafeRequestDto.*;
import static seb39_40.coffeewithme.cafe.dto.CafeResponseDto.*;

@Mapper(componentModel = "spring")
public interface CafeMapper {
    @Mapping(target = "runningTime", expression = "java(cafe.getOpenTime() + '-' + cafe.getCloseTime())")
    @Mapping(target = "mainImg", expression = "java(cafe.getImages().get(0).getPath())")
    @Mapping(target = "menuImg", expression = "java(cafe.getImages().get(1).getPath())")
    DetailCafeInfo cafeToCafeDto(Cafe cafe);
    @Mapping(target = "mainImg", expression = "java(cafe.getImages().get(0).getPath())")
    SimpleCafeInfo cafeToCafeSimpleDto(Cafe cafe);
    List<SimpleCafeInfo> cafeListToCafeSimpleDto(List<Cafe> cafe);

    Cafe cafeDtoToCafeInfo(Post post);
    Cafe cafeDtoToCafe(Post post);
}
