package seb39_40.coffeewithme.review.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import seb39_40.coffeewithme.cafe.domain.Cafe;
import seb39_40.coffeewithme.common.domain.BasicEntity;
import seb39_40.coffeewithme.user.domain.User;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity @Getter
@Setter
@NoArgsConstructor
public class Review extends BasicEntity {
    @Id @Column(name = "REVIEW_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "cafe_id")
    private Cafe cafe;

    @OneToMany(mappedBy = "review", cascade = CascadeType.ALL)
    private List<ReviewTag> reviewTags = new ArrayList<>();

    @Column(nullable = false, name = "rvw_img_id")
    private Long reviewImg;

    @Column(nullable = false, columnDefinition = "TEXT", name = "review_dsrp")
    private String description;

    @Column(nullable = false)
    private Integer score;

    public void setCafe(Cafe cafe){
        this.cafe = cafe;
        if (!cafe.getReviews().contains(this)){
            cafe.addReviews(this);
        }
    }

    public void setUser(User user){
        this.user = user;
        if (!user.getReviews().contains(this)){
            user.addReview(this);
        }
    }

    public void addReviewTags(ReviewTag reviewTag) {
        this.reviewTags.add(reviewTag);
        if (reviewTag.getReview() != this){
            reviewTag.setReview(this);
        }
    }

    public void update(Review review){
        this.reviewImg = review.getReviewImg();
        this.description = review.getDescription();
        this.score = review.getScore();
    }
}
