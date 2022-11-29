package seb39_40.coffeewithme.common.dto;

import lombok.Getter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.parameters.P;
import seb39_40.coffeewithme.cafe.domain.SortType;
import seb39_40.coffeewithme.common.domain.Pagination;

import java.util.List;

@Getter
public class MultiResponseDto<T> {
    private List<T> data;
    private Object pageInfo;

    public MultiResponseDto(List<T> data, Page page) {
        this.data = data;
        this.pageInfo = new PageInfo(page.getNumber() + 1,
                page.getSize(), page.getTotalElements(), page.getTotalPages());
    }

    public MultiResponseDto(List<T> data, Pagination pagination){
        this.data = data;
        this.pageInfo = pagination;
    }
}
