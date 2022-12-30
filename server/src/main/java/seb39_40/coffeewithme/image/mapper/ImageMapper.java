package seb39_40.coffeewithme.image.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import seb39_40.coffeewithme.image.domain.Image;
import seb39_40.coffeewithme.image.dto.ImageResponseDto;

@Mapper(componentModel = "spring")
public interface ImageMapper {
    @Mapping(target = "path", expression = "java(image.getName())")
    ImageResponseDto imageToImageResponseDto(Image image);
}
