package seb39_40.coffeewithme.user.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import seb39_40.coffeewithme.cafe.domain.Cafe;

import javax.persistence.*;

//@Entity
@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Wishlist{
    @Id @Column(name = "like_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user; //외래

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cafe_id")
    private Cafe cafe; //외래

}
