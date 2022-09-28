package seb39_40.coffeewithme.image.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import seb39_40.coffeewithme.image.service.ImageService;
import seb39_40.coffeewithme.image.service.S3UploaderService;

import java.io.IOException;

@RequiredArgsConstructor
@RestController
@RequestMapping("/images")
public class ImageController {
    private final S3UploaderService uploaderService;
    private final ImageService imageService;

    @PostMapping("/upload")
    public ResponseEntity uploadFile(@RequestParam("images") MultipartFile multipartFile) throws IOException {
        Long id = imageService.save(uploaderService.upload(multipartFile));
        return new ResponseEntity(imageService.findById(id), HttpStatus.CREATED);
    }


    @GetMapping("/{imageId}")
    public ResponseEntity getFile(@PathVariable Long imageId){
        return new ResponseEntity(imageService.findById(imageId).getPath(), HttpStatus.OK);
    }
}
