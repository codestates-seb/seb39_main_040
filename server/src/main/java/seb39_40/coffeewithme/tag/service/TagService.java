package seb39_40.coffeewithme.tag.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import seb39_40.coffeewithme.exception.BusinessLogicException;
import seb39_40.coffeewithme.exception.ExceptionCode;
import seb39_40.coffeewithme.review.domain.Review;
import seb39_40.coffeewithme.review.domain.ReviewTag;
import seb39_40.coffeewithme.tag.domain.Tag;
import seb39_40.coffeewithme.tag.repository.ReviewTagRepository;
import seb39_40.coffeewithme.tag.repository.TagRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TagService {
    private final TagRepository tagRepository;
    private final ReviewTagRepository reviewTagRepository;

    public Long save(Tag tag){
        return tagRepository.save(tag).getId();
    }

    public Tag findByName(String name){
        return tagRepository.findByName(name).orElseThrow(() -> new BusinessLogicException(ExceptionCode.TAG_NOT_FOUND));
    }

    public List<ReviewTag> createReviewTag(Review review, List<String> tags) {
        List<ReviewTag> reviewTags = tags.stream().map(tag -> {
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

    public List<ReviewTag> findByReviewId(Long id) {
        return reviewTagRepository.findByReviewId(id);
    }

    @Transactional
    public void deleteReviewTag(Review review){
       List<ReviewTag> reviewTags = reviewTagRepository.findByReviewId(review.getId());
        System.out.println(reviewTags.size());
       for (ReviewTag reviewTag : reviewTags){
           System.out.println("삭제");
           System.out.println(reviewTag.getTag().getCategory());
           reviewTagRepository.delete(reviewTag);
       }
    }


}
