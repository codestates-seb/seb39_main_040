package seb39_40.coffeewithme.image.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
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
        Long id = imageService.saveImage(uploaderService.upload(multipartFile));
        return new ResponseEntity(id, HttpStatus.CREATED);
    }
}
