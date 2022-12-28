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

import javax.persistence.*;

@Entity
@Getter @Setter
@NoArgsConstructor
public class Image extends BasicEntity {
    @Id @Column(name = "IMAGE_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String name;

    @Column(nullable = false)
    @Enumerated(value = EnumType.STRING)
    private Status status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cafe_id")
    private Cafe cafe;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "review_id")
    private Review review;

    @Builder
    public Image(String name, Status status) {
        this.name = name;
        this.status = status;
    }

    public void setCafe(Cafe cafe){
        if (cafe == null) {
            this.cafe = null;
        } else if (this.cafe != cafe && (this.cafe != null || this.review != null)) {
            throw new BusinessLogicException(ExceptionCode.ALREADY_USED_IMAGE); //이미지 중복 사용 방지
        } else {
            this.cafe = cafe;
        }
    }

    public void setReview(Review review){
        if (review == null) {
            this.review = null;
        } else if (this.review != review && (this.cafe != null || this.review != null)) {
            throw new BusinessLogicException(ExceptionCode.ALREADY_USED_IMAGE);
        } else {
            this.review = review;
        }
    }

    public void deleteImg(){
        this.status = Status.TEMP;
    }

    public void saveImg(){
        this.status = Status.SAVED;
    }

    public String getName(){
        return "https://d20npnyv7efnut.cloudfront.net/" + this.name;
    }
}
