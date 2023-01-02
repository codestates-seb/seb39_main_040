package seb39_40.coffeewithme.review.repository;

import seb39_40.coffeewithme.common.dto.PageInfo;
import seb39_40.coffeewithme.review.domain.Review;
import seb39_40.coffeewithme.tag.domain.Tag;

import java.util.LinkedHashMap;
import java.util.List;

public interface ReviewCustomRepository {

     List<Review> findByCafeId(Long id, PageInfo pageInfo);
     Long countByCafeId(Long id);
}
