package seb39_40.coffeewithme.common.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PageInfo {
    private int page;
    private int size;
    private long totalElement;
    private int totalPage;
}
