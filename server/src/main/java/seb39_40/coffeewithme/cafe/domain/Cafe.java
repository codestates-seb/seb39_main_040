package seb39_40.coffeewithme.cafe.domain;

import lombok.Data;

import javax.persistence.*;

@Entity
public class Cafe {
    @Id @Column(name = "CAFE_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String address;

    private String phone;
    private String homepage;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private Boolean badge = false;

    // am/pm 00시 00분 형태 validation 추후 추가
    @Column(nullable = false)
    private String openTime;

    @Column(nullable = false)
    private String closeTime;

    // 연관관계 매핑 여부 검토중
    private Long mainImg;
    private Long menuImg;

    // 찜 수
    private Long likeCount = 0L;
}
