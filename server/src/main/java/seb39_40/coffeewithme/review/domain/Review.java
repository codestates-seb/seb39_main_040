package seb39_40.coffeewithme.review.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import seb39_40.coffeewithme.cafe.domain.Cafe;
import seb39_40.coffeewithme.common.domain.BasicEntity;

import javax.persistence.*;

@Entity @Getter
@NoArgsConstructor
public class Review extends BasicEntity {
    @Id @Column(name = "REVIEW_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 매핑
//    private Long userId;

    @ManyToOne
    @JoinColumn(name = "CAFE_ID")
    private Cafe cafe;

    @Column(nullable = false)
    private Long reviewImg;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private Integer score;

    @Builder
    public Review(Long reviewImg, String description, Integer score) {
        this.reviewImg = reviewImg;
        this.description = description;
        this.score = score;
    }

    public void setCafe(Cafe cafe){
        this.cafe = cafe;
        if (!cafe.getReviews().contains(this)){
            cafe.addReviews(this);
        }
    }
}
