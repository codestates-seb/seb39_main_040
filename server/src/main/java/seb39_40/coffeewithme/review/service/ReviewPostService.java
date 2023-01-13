package seb39_40.coffeewithme.review.service;

import seb39_40.coffeewithme.review.dto.ReviewRequestDto;

import java.util.List;

public interface ReviewPostService {
    Long post(Long cafeId, ReviewRequestDto reviewRequestDto);
    Long repost(Long id, ReviewRequestDto patchDto, List<String> tags);
    void delete(Long cafeId, Long reviewId);
}

