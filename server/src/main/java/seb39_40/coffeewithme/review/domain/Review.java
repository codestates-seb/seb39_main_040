package seb39_40.coffeewithme.review.domain;

import seb39_40.coffeewithme.common.domain.BasicEntity;

import javax.persistence.*;

@Entity
public class Review extends BasicEntity {
    @Id @Column(name = "REVIEW_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 매핑
    private Long userId;
    private Long cafeId;
    private Long reviewImg;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;
    @Column(nullable = false)
    private Integer score;
}
