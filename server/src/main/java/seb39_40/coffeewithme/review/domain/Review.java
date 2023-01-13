package seb39_40.coffeewithme.review.domain;

import lombok.*;
import seb39_40.coffeewithme.cafe.domain.Cafe;
import seb39_40.coffeewithme.common.domain.BasicEntity;
import seb39_40.coffeewithme.image.domain.Image;
import seb39_40.coffeewithme.user.domain.User;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity @Getter
@NoArgsConstructor
public class Review extends BasicEntity {
    @Id @Column(name = "REVIEW_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cafe_id")
    private Cafe cafe;

    @Setter
    @OneToMany(mappedBy = "review", cascade = CascadeType.ALL)
    private List<ReviewTag> reviewTags = new ArrayList<>();

    @OneToOne(mappedBy = "review")
    private Image reviewImg;

    @Column(nullable = false, columnDefinition = "TEXT", name = "review_dsrp")
    private String description;

    @Column(nullable = false)
    private Integer score;


    @Builder
    public Review(Image reviewImg, String description, Integer score) {
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

    public void setUser(User user){
        this.user = user;
        if (!user.getReviews().contains(this)){
            user.addReview(this);
        }
    }

    public void setReviewImg(Image image){
       this.reviewImg = image;
       if (image.getReview() != this){
           image.setReview(this);
       }
    }

    public void addReviewTags(ReviewTag reviewTag) {
        this.reviewTags.add(reviewTag);
        if (reviewTag.getReview() != this){
            reviewTag.setReview(this);
        }
    }

    public void update(Review review){
        this.description = review.getDescription();
        this.score = review.getScore();
    }
}
