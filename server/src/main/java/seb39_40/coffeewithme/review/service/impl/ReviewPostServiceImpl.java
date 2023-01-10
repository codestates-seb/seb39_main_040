package seb39_40.coffeewithme.review.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import seb39_40.coffeewithme.cafe.domain.Cafe;
import seb39_40.coffeewithme.cafe.service.CafeService;
import seb39_40.coffeewithme.common.domain.Status;
import seb39_40.coffeewithme.image.service.ImageService;
import seb39_40.coffeewithme.review.domain.Review;
import seb39_40.coffeewithme.review.domain.ReviewTag;
import seb39_40.coffeewithme.review.dto.ReviewRequestDto;
import seb39_40.coffeewithme.review.mapper.ReviewMapper;
import seb39_40.coffeewithme.review.service.ReviewPostService;
import seb39_40.coffeewithme.review.service.ReviewService;
import seb39_40.coffeewithme.tag.service.TagService;
import seb39_40.coffeewithme.user.domain.User;
import seb39_40.coffeewithme.user.service.UserService;

import java.util.List;
import java.util.Objects;

import static seb39_40.coffeewithme.common.service.GetUserInfo.getUserId;

@Service
@RequiredArgsConstructor
public class ReviewPostServiceImpl implements ReviewPostService {
    private final CafeService cafeService;
    private final UserService userService;
    private final TagService tagService;
    private final ImageService imageService;
    private final ReviewService reviewService;
    private final ReviewMapper reviewMapper;

    @Transactional
    public Long post(Long cafeId, ReviewRequestDto postDto){
        Review review = reviewMapper.reviewDtoToReview(postDto);
        review.setReviewImg(imageService.findById(postDto.getReviewImg()));

        Cafe cafe = cafeService.find(cafeId);
        cafe.updateReviewCount(1);
        review.setCafe(cafe);

        User user = userService.findByEmail(getUserId());
        if (user.getRoles().equals("ROLE_ADMIN") && review.getScore() >= 4 && !cafe.getBadge())
            cafe.updateBadge(true);
        review.setUser(user);
        review.setReviewTags(tagService.createReviewTag(review, postDto.getTags()));
        return review.getId();
    }

    @Transactional
    public Long repost(Long id, ReviewRequestDto patchDto, List<String> tags){
        Review origin = reviewService.find(id);
        Review target = reviewMapper.reviewDtoToReview(patchDto);

        if (!Objects.equals(origin.getReviewImg().getId(), patchDto.getReviewImg())) {
            origin.getReviewImg().setReview(null);
            origin.setReviewImg(imageService.findById(patchDto.getReviewImg()));
        }
        reviewService.checkUser(getUserId(), origin.getUser().getEmail()); //작성자인지 확인

        tagService.updateReviewTag(origin, tags);
        origin.update(target);
        return reviewService.save(origin);
    }

    @Transactional
    public void delete(Long cafeId, Long reviewId){
        Review review = reviewService.find(reviewId);
        review.getReviewImg().setReview(null);

        reviewService.checkUser(getUserId(), review.getUser().getEmail());
        Cafe cafe = cafeService.find(cafeId);
        cafe.updateReviewCount(-1);
        cafeService.save(cafe);
        reviewService.delete(review);
    }
}
