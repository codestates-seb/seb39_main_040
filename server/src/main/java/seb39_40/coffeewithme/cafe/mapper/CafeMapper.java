package seb39_40.coffeewithme.cafe.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import seb39_40.coffeewithme.cafe.domain.Cafe;
import seb39_40.coffeewithme.cafe.domain.CafeTag;
import seb39_40.coffeewithme.tag.domain.Tag;
import seb39_40.coffeewithme.cafe.dto.CafeRequestDto;

import java.util.List;
import java.util.stream.Collectors;

import static seb39_40.coffeewithme.cafe.dto.CafeResponseDto.*;

@Mapper(componentModel = "spring")
public interface CafeMapper {
    @Mapping(target = "runningTime", expression = "java(cafe.getOpenTime() + '-' + cafe.getCloseTime())")
    DetailCafeInfo cafeToCafeDto(Cafe cafe);
    SimpleCafeInfo cafeToCafeSimpleDto(Cafe cafe);
    List<SimpleCafeInfo> cafeListToCafeSimpleDto(List<Cafe> cafe);
    Cafe cafeDtoToCafeInfo(CafeRequestDto.Post post);

    default Cafe cafeDtoToCafe(CafeRequestDto.Post post) {
        Cafe cafe = cafeDtoToCafeInfo(post);
        System.out.println(cafe.toString());
        List<CafeTag> cafeTags = post.getTags().stream().distinct().map(cafeTagDto -> {
                    CafeTag cafeTag = new CafeTag();
                    Tag tag = new Tag();
                    tag.setId(cafeTagDto);
                    cafeTag.setCafe(cafe);
                    cafeTag.setTag(tag);
                    return cafeTag;
                }).collect(Collectors.toList());
        cafe.setCafeTags(cafeTags);
        return cafe;
    }
}
