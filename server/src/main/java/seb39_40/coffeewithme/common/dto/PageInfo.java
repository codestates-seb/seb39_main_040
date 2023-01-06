package seb39_40.coffeewithme.common.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

@Data
@AllArgsConstructor
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class PageInfo {
    private int page;
    private int size;
    private long totalElement;
    private int totalPage;

    public PageInfo(){};

    public PageInfo(long totalElement, int size, int page) {
        if (totalElement > 0) {
            this.size = size;
            this.page = page;
            this.totalElement = totalElement;
            this.calculation(size, page);
        }
    }

    private void calculation(int size, int page) {
        // 전체 페이지 수 계산
        totalPage = (int) (((totalElement - 1) / size) + 1);

        if (page > totalPage) {
            page = totalPage;
        }
    }
}
