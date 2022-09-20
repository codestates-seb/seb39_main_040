package seb39_40.coffeewithme.cafe.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import seb39_40.coffeewithme.cafe.domain.Cafe;
import seb39_40.coffeewithme.cafe.mapper.CafeMapper;
import seb39_40.coffeewithme.cafe.service.CafeService;

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

}
