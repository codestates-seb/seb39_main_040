package seb39_40.coffeewithme.cafe.domain;

import lombok.Getter;
import seb39_40.coffeewithme.exception.BusinessLogicException;

import static seb39_40.coffeewithme.exception.ExceptionCode.INVALID_INPUT_VALUE;

public enum SortType {
    N("newest", false, "id"),
    L("likes", false, "likeCount"),
    R("reviews", false, "reviewCount"),
    N_C("newest", true, "cafe_id"),
    L_C("likes", true,"like_cnt"),
    R_C("reviews", true, "rvw_cnt");

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
        throw new BusinessLogicException(INVALID_INPUT_VALUE);
    }
}
