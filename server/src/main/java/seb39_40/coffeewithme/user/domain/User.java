package seb39_40.coffeewithme.user.domain;

import lombok.*;
import seb39_40.coffeewithme.image.domain.Image;
import seb39_40.coffeewithme.review.domain.Review;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id @Column(name = "USER_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 20, name="user_nm")
    private String userName;
    @Column(nullable = false, name="user_pw")
    private String password;
    @Column(nullable = false, length = 50)
    private String email;
    @Column(length = 13)
    private String mobile;
    private String roles;
    @Enumerated(value=EnumType.STRING)
    private UserStatus status;
    @Column(nullable = false, length = 50, name="reg_dt")
    private LocalDate registerDate;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="prf_pt")
    private Image profilePhoto;

    @Transient
    private List<Wishlist> likes=new ArrayList<>();

    @Transient
    private List<Review> reviews=new ArrayList<>();

    public List<String> getRoleList(){
        if(this.roles.length() > 0){
            return Arrays.asList(this.roles.split(","));
        }
        return new ArrayList<>();
    }

    public enum UserStatus {
        USER_SIGNUP("signup"),
        USER_WITHDRAW("withdraw");

        @Getter
        private String status;

        UserStatus(String status) {
            this.status = status;
        }
    }


    public void addReview(Review review) {
        this.reviews.add(review);
        if (review.getUser() != this) {
            review.setUser(this);
        }
    }

    public void updateStatus(UserStatus status){
        this.status=status;
    }

    public void updateInformation(String userName, String mobile, Image profilePhoto){
        this.userName = userName;
        this.mobile=mobile;
        this.profilePhoto=profilePhoto;
    }
}
