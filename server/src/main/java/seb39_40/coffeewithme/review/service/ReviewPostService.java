package seb39_40.coffeewithme.review.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import seb39_40.coffeewithme.cafe.domain.Cafe;
import seb39_40.coffeewithme.cafe.service.CafeService;
import seb39_40.coffeewithme.image.service.ImageService;
import seb39_40.coffeewithme.review.domain.Review;
import seb39_40.coffeewithme.review.domain.ReviewTag;
import seb39_40.coffeewithme.review.dto.ReviewRequestDto;
import seb39_40.coffeewithme.review.mapper.ReviewMapper;
import seb39_40.coffeewithme.tag.service.TagService;
import seb39_40.coffeewithme.user.domain.User;
import seb39_40.coffeewithme.user.service.UserService;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class ReviewPostService {
    private final CafeService cafeService;
    private final UserService userService;
    private final TagService tagService;
    private final ImageService imageService;
    private final ReviewServiceImpl reviewServiceImpl;
    private final ReviewMapper reviewMapper;

    @Transactional
    public Long post(Long cafeId, ReviewRequestDto reviewRequestDto, List<String> tags){
        Review review = reviewMapper.reviewDtoToReview(reviewRequestDto);
        review.setReviewImg(imageService.findById(reviewRequestDto.getReviewImg()));

        Cafe cafe = cafeService.findById(cafeId);
        cafe.updateReviewCount(1);
        review.setCafe(cafe);

        User user = userService.findByEmail(getUserId());
        if (user.getRoles().equals("ROLE_ADMIN") && review.getScore() >= 4 && !cafe.getBadge())
            cafe.updateBadge(true);
        review.setUser(user);

        review.setReviewTags(tagService.createReviewTag(review, tags));
        review.getReviewImg().saveImg();
        return reviewServiceImpl.save(review);
    }

    @Transactional
    public Long repost(Long id, ReviewRequestDto patchDto, List<String> tags){
        Review origin = reviewServiceImpl.find(id);
        Review target = reviewMapper.reviewDtoToReview(patchDto);

        if (!Objects.equals(origin.getReviewImg().getId(), target.getReviewImg().getId()))
            origin.getReviewImg().deleteImg();
        reviewServiceImpl.checkUser(getUserId(), origin.getUser().getEmail());

        tagService.deleteReviewTag(origin);
        List<ReviewTag> reviewTags = tagService.createReviewTag(origin, tags);
        origin.setReviewTags(reviewTags);
        origin.update(target);
        return reviewServiceImpl.save(origin);
    }

    @Transactional
    public void delete(Long cafeId, Long reviewId){
        Review review = reviewServiceImpl.find(reviewId);
        review.getReviewImg().deleteImg();

        reviewServiceImpl.checkUser(getUserId(), review.getUser().getEmail());
        Cafe cafe = cafeService.findById(cafeId);
        cafe.updateReviewCount(-1);
        cafeService.save(cafe);
        reviewServiceImpl.delete(review);
    }

    public String getUserId(){
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }
}
