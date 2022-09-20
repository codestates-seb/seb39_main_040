package seb39_40.coffeewithme.cafe.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import seb39_40.coffeewithme.cafe.dto.CafeRequestDto;

import javax.persistence.*;

@Entity @Getter
@NoArgsConstructor
public class Cafe {
    @Id @Column(name = "CAFE_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

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
    private String openTime = "00:00";

    @Column(nullable = false)
    private String closeTime = "00:00";

    @Column(nullable = false)
    private Long mainImg;

    @Column(nullable = false)
    private Long menuImg;

    private Long likeCount = 0L;
    private Long reviewCount = 0L;

    
    @Builder
    public Cafe(String name, String address, String description, String openTime, String closeTime,
                Long mainImg, Long menuImg, String homepage, String phone) {
        this.name = name;
        this.address = address;
        this.description = description;
        this.openTime = openTime;
        this.closeTime = closeTime;
        this.mainImg = mainImg;
        this.menuImg = menuImg;
        this.homepage = homepage;
        this.phone = phone;
    }
}
