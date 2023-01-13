package seb39_40.coffeewithme.image.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import seb39_40.coffeewithme.cafe.domain.Cafe;
import seb39_40.coffeewithme.common.domain.BasicEntity;
import seb39_40.coffeewithme.common.domain.Status;
import seb39_40.coffeewithme.exception.BusinessLogicException;
import seb39_40.coffeewithme.exception.ExceptionCode;
import seb39_40.coffeewithme.review.domain.Review;
import seb39_40.coffeewithme.user.domain.User;

import javax.persistence.*;

@Entity
@Getter @Setter
@NoArgsConstructor
public class Image extends BasicEntity {
    @Id @Column(name = "IMAGE_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "image_nm",nullable = false, columnDefinition = "TEXT")
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cafe_id")
    private Cafe cafe;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "review_id")
    private Review review;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Builder
    public Image(String name) {
        this.name = name;
    }

    public void setCafe(Cafe cafe){
        if (cafe == null) {
            this.cafe = null;
        } else if (this.cafe != cafe && (this.cafe != null || this.review != null || this.user != null)) {
            throw new BusinessLogicException(ExceptionCode.ALREADY_USED_IMAGE); //이미지 중복 사용 방지
        } else {
            this.cafe = cafe;
        }
    }

    public void setReview(Review review){
        if (review == null) {
            this.review = null;
        } else if (this.review != review && (this.cafe != null || this.review != null || this.user != null)) {
            throw new BusinessLogicException(ExceptionCode.ALREADY_USED_IMAGE);
        } else {
            this.review = review;
        }
    }

    public void setUser(User user){
        if (user == null) {
            this.user = null;
        } else if (this.user != user && (this.cafe != null || this.review != null || this.user != null)) {
            throw new BusinessLogicException(ExceptionCode.ALREADY_USED_IMAGE);
        } else {
            this.user = user;
        }
    }

    public String getName(){
        return "https://d20npnyv7efnut.cloudfront.net/" + this.name;
    }
}
