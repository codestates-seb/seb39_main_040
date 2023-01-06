package seb39_40.coffeewithme.cafe.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import seb39_40.coffeewithme.cafe.service.CafeService;
import seb39_40.coffeewithme.common.dto.MultiResponseDto;

import static seb39_40.coffeewithme.cafe.dto.CafeResponseDto.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/cafe")
public class CafeController {
    private final CafeService cafeService;

    @GetMapping("/{cafeId}")
    public ResponseEntity<?> getCafe(@PathVariable Long cafeId){
        return new ResponseEntity<>(cafeService.findById(cafeId), HttpStatus.OK);
    }

    @GetMapping("")
    public ResponseEntity<?> getCafes(@RequestParam(required = false, defaultValue = "1") Integer page,
                                     @RequestParam(required = false, defaultValue = "newest") String sort,
                                     @RequestParam(required = false, defaultValue = "all") String category){
        MultiResponseDto<SimpleCafeInfo> result = cafeService.findCafe(category, page - 1, sort);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchCafe(@RequestParam(required = false) String keyword,
                                     @RequestParam(required = false, defaultValue = "1") Integer page,
                                     @RequestParam(required = false, defaultValue = "newest") String sort){
        MultiResponseDto<SimpleCafeInfo> result = cafeService.searchCafe(keyword, page - 1, sort);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
