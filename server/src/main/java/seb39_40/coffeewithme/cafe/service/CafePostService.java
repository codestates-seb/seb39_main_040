package seb39_40.coffeewithme.cafe.service;


import static seb39_40.coffeewithme.cafe.dto.CafeRequestDto.*;

public interface CafePostService {
    Long register(Post postDto);
    void delete(Long id);
}
