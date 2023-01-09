package seb39_40.coffeewithme.tag.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import seb39_40.coffeewithme.cafe.domain.Cafe;
import seb39_40.coffeewithme.cafe.domain.CafeTag;
import seb39_40.coffeewithme.exception.BusinessLogicException;
import seb39_40.coffeewithme.exception.ExceptionCode;
import seb39_40.coffeewithme.review.domain.Review;
import seb39_40.coffeewithme.review.domain.ReviewTag;
import seb39_40.coffeewithme.tag.domain.Tag;
import seb39_40.coffeewithme.tag.repository.CafeTagRepository;
import seb39_40.coffeewithme.tag.repository.ReviewTagRepository;
import seb39_40.coffeewithme.tag.repository.TagRepository;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TagService {
    private final TagRepository tagRepository;
    private final ReviewTagRepository reviewTagRepository;
    private final CafeTagRepository cafeTagRepository;

    public Long save(Tag tag){
        return tagRepository.save(tag).getId();
    }

    public Tag findByName(String name){
        return tagRepository.findByName(name).orElseThrow(() -> new BusinessLogicException(ExceptionCode.TAG_NOT_FOUND));
    }

    @Transactional
    public List<ReviewTag> createReviewTag(Review review, List<String> tags) {
        List<ReviewTag> reviewTags = tags.stream().distinct().map(tag -> {
            Tag t;
            Optional<Tag> tempTag = tagRepository.findByName(tag);
            if (tempTag.isEmpty()){
                t = new Tag();
                t.setName(tag);
                t.setCategory(Tag.Category.NONE);
                tagRepository.save(t);
                t = tagRepository.findByName(tag).get();
            }
            else t = tempTag.get();

            ReviewTag reviewTag = new ReviewTag();
            reviewTag.setReview(review);
            reviewTag.setTag(t);
            return reviewTag;
        }).collect(Collectors.toList());
        return reviewTags;
    }

    @Transactional
    public List<CafeTag> createCafeTag(Cafe cafe, List<String> tags){
        List<CafeTag> cafeTags = tags.stream().distinct().map(tag -> {
            Tag t;
            Optional<Tag> tempTag = tagRepository.findByName(tag);
            if (tempTag.isEmpty()){
                t = new Tag();
                t.setName(tag);
                t.setCategory(Tag.Category.NONE);
                tagRepository.save(t);
                t = tagRepository.findByName(tag).get();
            }
            else t = tempTag.get();

            CafeTag cafeTag = new CafeTag();
            cafeTag.setCafe(cafe);
            cafeTag.setTag(t);
            return cafeTag;
        }).collect(Collectors.toList());
        return cafeTags;
    }

    public List<ReviewTag> findByReviewId(Long id) {
        return reviewTagRepository.findByReviewId(id);
    }

    @Transactional
    public void updateReviewTag(Review review, List<String> tags){
       List<ReviewTag> reviewTags = reviewTagRepository.findByReviewId(review.getId());

       Set<String> tagSet = new HashSet<>(tags); // 빠른 조회를 위해 Set 변환
       Set<String> existTag = new HashSet<>(); // 수정되지 않은(유지) 태그 보관을 위한 List
       for (ReviewTag reviewTag : reviewTags){
           if (tagSet.contains(reviewTag.getTag().getName())) {
               existTag.add(reviewTag.getTag().getName());
               continue;
           }

           reviewTagRepository.delete(reviewTag);
       }

       List<String> newTags = new ArrayList<>();
       for (String tag: tags) {
           if(existTag.contains(tag)) continue;
           newTags.add(tag);
        }

        List<ReviewTag> result = createReviewTag(review, newTags);
        review.setReviewTags(result);
    }

    @Transactional
    public void updateCafeTag(Cafe cafe, List<String> tags){
        List<CafeTag> reviewTags = cafeTagRepository.findByCafeId(cafe.getId());

        Set<String> tagSet = new HashSet<>(tags); 
        Set<String> existTag = new HashSet<>(); 
        for (CafeTag cafeTag : reviewTags){
            if (tagSet.contains(cafeTag.getTag().getName())) {
                existTag.add(cafeTag.getTag().getName());
                continue;
            }

            cafeTagRepository.delete(cafeTag);
        }

        List<String> newTags = new ArrayList<>();
        for (String tag: tags) {
            if(existTag.contains(tag)) continue;
            newTags.add(tag);
        }

        List<CafeTag> result = createCafeTag(cafe, newTags);
        cafe.setCafeTags(result);
    }

}
