package seb39_40.coffeewithme.review.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import seb39_40.coffeewithme.common.domain.Pagination;
import seb39_40.coffeewithme.review.domain.Review;
import seb39_40.coffeewithme.tag.domain.Tag;

import java.util.LinkedHashMap;
import java.util.List;

public interface ReviewCustomRepository {

     LinkedHashMap<Review, List<Tag>> findByCafeId(Long id, Pagination pagination);
}
