package seb39_40.coffeewithme.tag.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import seb39_40.coffeewithme.cafe.domain.CafeTag;
import seb39_40.coffeewithme.review.domain.Review;
import seb39_40.coffeewithme.review.domain.ReviewTag;
import seb39_40.coffeewithme.tag.domain.Tag;
import seb39_40.coffeewithme.tag.repository.TagRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TagService {
    private final TagRepository tagRepository;

    public Long save(Tag tag){
        return tagRepository.save(tag).getId();
    }

    public Tag findByName(String name){
        return tagRepository.findByName(name).orElseThrow(() -> new RuntimeException("태그를 찾을 수 없습니다."));
    }

    public List<ReviewTag> createReviewTag(Review review, List<String> tags) {
        List<ReviewTag> reviewTags = tags.stream().map(tag -> {
            Tag t;
            Optional<Tag> tempTag = tagRepository.findByName(tag);
            if (tempTag.isEmpty()){
                t = new Tag();
                t.setName(tag);
                t.setCategory(Tag.Category.NONE);
            }
            else t = tempTag.get();

            ReviewTag reviewTag = new ReviewTag();
            reviewTag.setReview(review);
            reviewTag.setTag(t);
            return reviewTag;
        }).collect(Collectors.toList());
        return reviewTags;
    }
}
