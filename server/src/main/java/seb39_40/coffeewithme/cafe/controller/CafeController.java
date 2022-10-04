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
@RequestMapping("/cafe")
public class CafeController {
    private final CafeService cafeService;
    private final CafeMapper cafeMapper;

    @GetMapping("/{cafeId}")
    public ResponseEntity getCafe(@PathVariable Long cafeId){
        Cafe cafe = cafeService.findById(cafeId);
        return new ResponseEntity<>(cafeMapper.cafeToCafeDto(cafe), HttpStatus.CREATED);
    }

    @GetMapping("")
    public ResponseEntity getCafes(@RequestParam(required = false, defaultValue = "1") Integer page,
                                     @RequestParam(required = false, defaultValue = "newest") String sort,
                                     @RequestParam(required = false, defaultValue = "all") String category){
        Page<Cafe> cafe = cafeService.find(category, page - 1, sort);
        return new ResponseEntity(new MultiResponseDto<>(cafeMapper.cafeListToCafeSimpleDto(cafe.getContent()), cafe),
                HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity searchCafe(@RequestParam(required = false) String keyword,
                                     @RequestParam(required = false, defaultValue = "1") Integer page,
                                     @RequestParam(required = false, defaultValue = "newest") String sort){
        Page<Cafe> cafe = cafeService.search(keyword, page - 1, sort);
        return new ResponseEntity(new MultiResponseDto<>(cafeMapper.cafeListToCafeSimpleDto(cafe.getContent()), cafe),
                HttpStatus.OK);
    }
}
