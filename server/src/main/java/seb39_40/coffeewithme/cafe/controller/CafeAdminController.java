package seb39_40.coffeewithme.cafe.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import seb39_40.coffeewithme.cafe.domain.Cafe;
import seb39_40.coffeewithme.cafe.dto.CafeRequestDto;
import seb39_40.coffeewithme.cafe.mapper.CafeMapper;
import seb39_40.coffeewithme.cafe.service.CafeService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin")
public class CafeAdminController {
    private final CafeService cafeService;
    private final CafeMapper cafeMapper;

    @PostMapping("/cafe")
    public ResponseEntity postCafe(@RequestBody CafeRequestDto.Post postDto){
        Long id = cafeService.save(cafeMapper.cafeDtoToCafe(postDto));
        return new ResponseEntity<>(id, HttpStatus.CREATED);
    }

    @DeleteMapping("/cafe/{cafeId}")
    public ResponseEntity deleteCafe(@PathVariable Long cafeId){
        cafeService.delete(cafeId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
