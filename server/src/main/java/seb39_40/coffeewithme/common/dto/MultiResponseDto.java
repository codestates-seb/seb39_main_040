package seb39_40.coffeewithme.common.dto;

import lombok.Getter;
import org.springframework.data.domain.Page;

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

    public MultiResponseDto(List<T> data, PageInfo pageInfo){
        this.data = data;
        this.pageInfo = pageInfo;
    }
}
