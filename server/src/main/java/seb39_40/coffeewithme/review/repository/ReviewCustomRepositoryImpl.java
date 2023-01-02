package seb39_40.coffeewithme.review.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import seb39_40.coffeewithme.common.dto.PageInfo;
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
    public List<Review> findByCafeId(Long id, PageInfo pageInfo) {
        // toOne 관계부터 조회
        List<Review> result = jpaQueryFactory.selectFrom(review)
                .where(review.cafe.id.eq(id))
                .leftJoin(review.user, user).fetchJoin()
                .leftJoin(review.reviewImg, image).fetchJoin()
                .offset((long) (pageInfo.getPage() - 1) * pageInfo.getSize())
                .limit(10)
                .orderBy(review.createdAt.desc())
                .fetch();
        return result;
    }

    @Override
    public Long countByCafeId(Long id) {
        Long size = jpaQueryFactory.select(review.count())
                .from(review)
                .where(review.cafe.id.eq(id))
                .fetchOne();
        return size;
    }
}
