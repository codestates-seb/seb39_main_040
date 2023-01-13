package seb39_40.coffeewithme.cafe.domain;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import seb39_40.coffeewithme.exception.BusinessLogicException;


public enum SortType {
    N("newest", false, "id"),
    L("likes", false, "likeCount"),
    R("reviews", false, "reviewCount"),
    C("name", false, "name"),
    N_C("newest", true, "cafe_id"),
    L_C("likes", true,"like_cnt"),
    R_C("reviews", true, "rvw_cnt"),
    C_C("name", true, "cafe_nm");

    @Getter
    private String text;

    @Getter
    private Boolean category;

    @Getter
    private String type;

    SortType(String text, Boolean category, String type) {
        this.text = text;
        this.category = category;
        this.type = type;
    }

    public static String findType(String text, boolean category) {
        for (SortType sortType :SortType.values())
            if (sortType.category == category && sortType.text.equals(text)) {
                return sortType.type;
            }
        throw new BusinessLogicException(HttpStatus.CONFLICT, "존재하지 않는 카테고리입니다.");
    }
}
