package seb39_40.coffeewithme.cafe.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import seb39_40.coffeewithme.cafe.dto.CafeRequestDto;
import seb39_40.coffeewithme.cafe.service.CafePostService;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
public class CafeAdminController {
    private final CafePostService cafePostService;

    @PostMapping("/cafe")
    public ResponseEntity postCafe(@RequestBody @Valid CafeRequestDto.Post postDto){
        Long id = cafePostService.register(postDto);
        return new ResponseEntity<>(id, HttpStatus.CREATED);
    }

    @PatchMapping("/cafe/{cafeId}")
    public ResponseEntity patchCafe(@PathVariable Long cafeId,
                                    @RequestBody @Valid CafeRequestDto.Patch patchDto){
        cafePostService.repost(cafeId, patchDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/cafe/{cafeId}")
    public ResponseEntity deleteCafe(@PathVariable Long cafeId){
        cafePostService.delete(cafeId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
