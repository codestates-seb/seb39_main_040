package seb39_40.coffeewithme.cafe.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import seb39_40.coffeewithme.cafe.domain.Cafe;
import seb39_40.coffeewithme.cafe.repository.CustomCafeRepository;
import seb39_40.coffeewithme.tag.domain.Tag;

import java.util.List;

import static seb39_40.coffeewithme.cafe.domain.QCafe.cafe;
import static seb39_40.coffeewithme.cafe.domain.QCafeTag.cafeTag;
import static seb39_40.coffeewithme.tag.domain.QTag.tag;

@Repository
@RequiredArgsConstructor
public class CustomCafeRepositoryImpl implements CustomCafeRepository {
    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public Page<Cafe> findByCategory(String category, Pageable pageable) {
        List<Cafe> result = jpaQueryFactory.selectFrom(cafe)
                .where(cafe.id.in(
                        jpaQueryFactory.select(cafeTag.cafe.id)
                                .distinct()
                                .from(cafeTag)
                                .leftJoin(tag)
                                .on(tag.id.eq(cafeTag.tag.id))
                                .where(tag.category.eq(Tag.findCategory(category)))
                )).offset(pageable.getOffset())
                .limit(pageable.getPageSize()).fetch();

        return new PageImpl<>(result, pageable, result.size());
    }

    @Override
    public Page<Cafe> searchByName(String keyword, Pageable pageable) {
        List<Cafe> result = jpaQueryFactory.selectFrom(cafe)
                .where(cafe.name.like('%' + keyword + '%'))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();
        return new PageImpl<>(result, pageable, result.size());
    }

    @Override
    public Page<Cafe> searchByTag(String keyword, Pageable pageable){
        List<Cafe> result = jpaQueryFactory.selectFrom(cafe)
                .where(cafe.id.in(
                        jpaQueryFactory.select(cafeTag.cafe.id)
                                .distinct()
                                .from(cafeTag)
                                .leftJoin(tag)
                                .on(tag.id.eq(cafeTag.tag.id))
                                .where(tag.name.like('%' + keyword + '%'))
                )).offset(pageable.getOffset())
                .limit(pageable.getPageSize()).fetch();

        return new PageImpl<>(result, pageable, result.size());
    }

}
