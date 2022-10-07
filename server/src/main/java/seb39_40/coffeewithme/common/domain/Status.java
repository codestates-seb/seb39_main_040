package seb39_40.coffeewithme.common.domain;

import lombok.Getter;

public enum Status {
    TEMP("임시"),
    SAVED("저장");

    @Getter
    private String status;

    Status(String status) {
        this.status = status;
    }
}