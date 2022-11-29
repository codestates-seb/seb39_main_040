package seb39_40.coffeewithme.review.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Repository;
import seb39_40.coffeewithme.common.domain.Pagination;
import seb39_40.coffeewithme.review.domain.Review;
import seb39_40.coffeewithme.review.domain.ReviewTag;
import seb39_40.coffeewithme.tag.domain.Tag;

import java.util.*;
import java.util.stream.Collectors;

import static seb39_40.coffeewithme.image.domain.QImage.image;
import static seb39_40.coffeewithme.review.domain.QReview.review;
import static seb39_40.coffeewithme.review.domain.QReviewTag.*;
import static seb39_40.coffeewithme.tag.domain.QTag.*;
import static seb39_40.coffeewithme.user.domain.QUser.user;

@Repository
@RequiredArgsConstructor
public class ReviewCustomRepositoryImpl implements ReviewCustomRepository {
    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public LinkedHashMap<Review, List<Tag>> findByCafeId(Long id, Pagination pagination) {
        // toOne 관계부터 조회
        List<Review> result = jpaQueryFactory.selectFrom(review)
                .where(review.cafe.id.eq(id))
                .leftJoin(review.user, user).fetchJoin()
                .leftJoin(review.reviewImg, image).fetchJoin()
                .offset(pagination.getLimitStart())
                .limit(10)
                .fetch();

        // 리뷰에 속한 태그를 따로 불러오는 메서드를 만든 다음 서비스레이어에서 DTO를 처리
        List<Long> reviewId = result.stream().map(Review::getId)
                .collect(Collectors.toList());

        List<ReviewTag> reviewTags = jpaQueryFactory.selectFrom(reviewTag)
                .where(reviewTag.review.id.in(reviewId))
                .leftJoin(reviewTag.tag, tag).fetchJoin()
                .fetch();

        LinkedHashMap<Review, List<Tag>> map = new LinkedHashMap<>();

        for (ReviewTag reviewTag : reviewTags) {
            Review review = reviewTag.getReview();
            if (map.containsKey(review)) {
                List<Tag> tags = map.get(review);
                tags.add(reviewTag.getTag());
                map.replace(review, tags);
            } else {
                List<Tag> tags = new ArrayList<>();
                tags.add(reviewTag.getTag());
                map.put(review, tags);
            }
        }

        return map;
    }
}
