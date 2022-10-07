package seb39_40.coffeewithme.exception;

import lombok.Getter;

public enum ExceptionCode {
    // 500 Server
    INTERNAL_SERVER_ERROR(500, "서버가 응답하지 않습니다."),
    NOT_IMPLEMENTATION(501, "Not Implementation"),

    // 400 Common
    METHOD_NOT_ALLOWED(405, "적절하지 않은 HTTP 메소드입니다."),
    INVALID_TYPE_VALUE(400, "요청 값의 타입이 잘못되었습니다."),
    INVALID_INPUT_VALUE(400, "적절하지 않은 값입니다."),
    NOT_FOUND(404, "해당 리소스를 찾을 수 없습니다."),
    BAD_REQUEST(400, "잘못된 요청입니다."),
    MISSING_REQUEST_PARAMETER(400, "필수 파라미터가 누락되었습니다."),
    INVALID_LENGTH(400, "올바르지 않은 길이입니다."),

    // 카페 관련 Exception
    CAFE_NOT_FOUND(404, "카페를 찾을 수 없습니다."),
    REVIEW_NOT_FOUND(404, "리뷰를 찾을 수 없습니다."),
    IMAGE_NOT_FOUND(404, "이미지를 찾을 수 없습니다."),
    TAG_NOT_FOUND(404, "태그를 찾을 수 없습니다.");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}