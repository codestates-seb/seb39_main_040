package seb39_40.coffeewithme.cafe.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import seb39_40.coffeewithme.cafe.dto.CafeRequestDto;
import seb39_40.coffeewithme.cafe.mapper.CafeMapper;
import seb39_40.coffeewithme.cafe.service.impl.CafePostServiceImpl;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin")
public class CafeAdminController {
    private final CafePostServiceImpl cafePostServiceImpl;
    private final CafeMapper cafeMapper;

    @PostMapping("/cafe")
    public ResponseEntity postCafe(@RequestBody @Valid CafeRequestDto.Post postDto){
        Long id = cafePostServiceImpl.register(cafeMapper.cafeDtoToCafe(postDto));
        return new ResponseEntity<>(id, HttpStatus.CREATED);
    }

    @DeleteMapping("/cafe/{cafeId}")
    public ResponseEntity deleteCafe(@PathVariable Long cafeId){
        cafePostServiceImpl.delete(cafeId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
