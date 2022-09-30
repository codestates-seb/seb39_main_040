package seb39_40.coffeewithme.cafe.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @Column(nullable = false, length = 20, name="cafe_nm")
    private String name;

    @Column(nullable = false, name = "cafe_addr")
    private String address;

    @Column(nullable = false, name = "cafe_phn")
    private String phone;

    @Column(name = "cafe_url")
    private String homepage;

    @Column(nullable = false, columnDefinition = "TEXT", name = "cafe_dsrp")
    private String description;

    @Column(nullable = false, name="cafe_bdg")
    private Boolean badge = false;

    // am/pm 00시 00분 형태 validation 추후 추가
    @Column(nullable = false, name = "open_tm")
    private String openTime = "00:00";

    @Column(nullable = false, name = "close_tm")
    private String closeTime = "00:00";

    @Column(nullable = false, name = "mn_img_id")
    private Long mainImg;

    @Column(nullable = false, name = "mu_img_id")
    private Long menuImg;

    @Column(name = "like_cnt")
    private Long likeCount = 0L;
    @Column(name = "rvw_cnt")
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
