package seb39_40.coffeewithme.cafe.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import seb39_40.coffeewithme.cafe.domain.Cafe;
import seb39_40.coffeewithme.cafe.mapper.CafeMapper;
import seb39_40.coffeewithme.cafe.service.CafeService;
import seb39_40.coffeewithme.common.dto.MultiResponseDto;

@RestController
@RequiredArgsConstructor
@RequestMapping("/")
public class CafeController {
    private final CafeService cafeService;
    private final CafeMapper cafeMapper;

    @GetMapping("/cafe/{cafeId}")
    public ResponseEntity getCafe(@PathVariable Long cafeId){
        Cafe cafe = cafeService.findOne(cafeId);
        return new ResponseEntity<>(cafeMapper.cafeToCafeDto(cafe), HttpStatus.CREATED);
    }

    @GetMapping("/cafe")
    public ResponseEntity getCafeAll(@RequestParam(required = false, defaultValue = "1") Integer page,
                                     @RequestParam(required = false, defaultValue = "newest") String sort,
                                     @RequestParam(required = false, defaultValue = "all") String category){
        Page<Cafe> cafe = cafeService.findAll(category, page - 1, sort);
        return new ResponseEntity(new MultiResponseDto<>(cafeMapper.cafeListToCafeSimpleDto(cafe.getContent()), cafe),
                HttpStatus.OK);
    }

}
