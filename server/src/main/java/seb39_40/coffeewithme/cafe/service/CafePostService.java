package seb39_40.coffeewithme.cafe.service;

import seb39_40.coffeewithme.cafe.domain.Cafe;

public interface CafePostService {
    Long register(Cafe cafe);
    void delete(Long id);
}
