package seb39_40.coffeewithme.cafe.domain;

import lombok.*;
import seb39_40.coffeewithme.review.domain.Review;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity @Getter @Setter
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

    @OneToMany(mappedBy = "cafe", cascade = CascadeType.ALL)
    private List<Review> reviews = new ArrayList<>();

    @OneToMany(mappedBy = "cafe", cascade = CascadeType.ALL)
    private List<CafeTag> cafeTags = new ArrayList<>();

    public void addReviews(Review review) {
        this.reviews.add(review);

        if (review.getCafe() != this){
            review.setCafe(this);
        }
    }

    public void addCafeTags(CafeTag cafeTag) {
        this.cafeTags.add(cafeTag);

        if (cafeTag.getCafe() != this){
            cafeTag.setCafe(this);
        }
    }

    public void updateReviewCount(Integer num){
        this.reviewCount += num;
    }
}
