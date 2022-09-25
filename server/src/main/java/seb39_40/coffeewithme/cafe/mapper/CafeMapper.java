package seb39_40.coffeewithme.cafe.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.beans.factory.annotation.Autowired;
import seb39_40.coffeewithme.cafe.domain.Cafe;
import seb39_40.coffeewithme.cafe.domain.CafeTag;
import seb39_40.coffeewithme.image.service.ImageService;
import seb39_40.coffeewithme.tag.domain.Tag;
import seb39_40.coffeewithme.cafe.dto.CafeRequestDto;

import java.util.List;
import java.util.stream.Collectors;

import static seb39_40.coffeewithme.cafe.dto.CafeResponseDto.*;

@Mapper(componentModel = "spring")
public abstract class CafeMapper {
    @Autowired
    protected ImageService imageService;

    @Mapping(target = "runningTime", expression = "java(cafe.getOpenTime() + '-' + cafe.getCloseTime())")
    @Mapping(target = "mainImg", expression = "java(imageService.findById(cafe.getMainImg()).getPath())")
    @Mapping(target = "menuImg", expression = "java(imageService.findById(cafe.getMenuImg()).getPath())")
    public abstract DetailCafeInfo cafeToCafeDto(Cafe cafe);
    @Mapping(target = "mainImg", expression = "java(imageService.findById(cafe.getMainImg()).getPath())")
    public abstract SimpleCafeInfo cafeToCafeSimpleDto(Cafe cafe);
    public abstract List<SimpleCafeInfo> cafeListToCafeSimpleDto(List<Cafe> cafe);

    public abstract Cafe cafeDtoToCafeInfo(CafeRequestDto.Post post);

    public Cafe cafeDtoToCafe(CafeRequestDto.Post post) {
        Cafe cafe = cafeDtoToCafeInfo(post);
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
