package seb39_40.coffeewithme.cafe.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import seb39_40.coffeewithme.cafe.domain.Cafe;
import seb39_40.coffeewithme.cafe.service.impl.CafeServiceImpl;
import seb39_40.coffeewithme.common.dto.MultiResponseDto;

import java.util.List;

import static seb39_40.coffeewithme.cafe.domain.QCafe.cafe;
import static seb39_40.coffeewithme.cafe.dto.CafeResponseDto.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/cafe")
public class CafeController {
    private final CafeServiceImpl cafeServiceImpl;

    @GetMapping("/{cafeId}")
    public ResponseEntity<?> getCafe(@PathVariable Long cafeId){
        return new ResponseEntity<>(cafeServiceImpl.findById(cafeId), HttpStatus.OK);
    }

    @GetMapping("")
    public ResponseEntity<?> getCafes(@RequestParam(required = false, defaultValue = "1") Integer page,
                                     @RequestParam(required = false, defaultValue = "newest") String sort,
                                     @RequestParam(required = false, defaultValue = "all") String category){
        MultiResponseDto<SimpleCafeInfo> result = cafeServiceImpl.findCafe(category, page - 1, sort);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchCafe(@RequestParam(required = false) String keyword,
                                     @RequestParam(required = false, defaultValue = "1") Integer page,
                                     @RequestParam(required = false, defaultValue = "newest") String sort){
        MultiResponseDto<SimpleCafeInfo> result = cafeServiceImpl.searchCafe(keyword, page - 1, sort);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
