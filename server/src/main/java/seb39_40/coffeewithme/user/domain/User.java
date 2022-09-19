package seb39_40.coffeewithme.user.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Setter
@Getter
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String role;
    @Enumerated(value=EnumType.STRING)
    private UserStatus status;
    private LocalDateTime createdAt;
    /*
    @OneToOne
    @JoinColumn(name = "user_id")
    private Image profileImg; //외부에서 오는 키임둥, 객체를 받아와야할까용

    private List<Review> reviews=new ArrayList<>(); 리뷰
    */
    private List<Like> likes=new ArrayList<>();

    public enum UserStatus {
        USER_SIGNUP("signup"),
        USER_WITHDRAW("withdraw");

        @Getter
        private String status;

        UserStatus(String status) {
            this.status = status;
        }
    }

    /*
    public void addReview(Review review) {
        //리뷰 추가
        this.reviews.add(review);
        if (review.getUser() != this){
            review.setUser(this);
        }
    }
 */
    public void addLike(Like like) {
        this.likes.add(like);
        if (like.getUser() != this){
            like.setUser(this);
        }
    }
}
