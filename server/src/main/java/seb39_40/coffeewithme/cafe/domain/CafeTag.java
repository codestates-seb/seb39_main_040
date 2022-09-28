package seb39_40.coffeewithme.cafe.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import seb39_40.coffeewithme.tag.domain.Tag;

import javax.persistence.*;

@Entity @Getter
@NoArgsConstructor
public class CafeTag {
    @Id @Column(name = "CAFETAG_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "cafe_id")
    private Cafe cafe;

    @ManyToOne
    @JoinColumn(name = "tag_id")
    private Tag tag;

    public void setCafe(Cafe cafe){
        this.cafe = cafe;
        if (!cafe.getCafeTags().contains(this)){
            cafe.addCafeTags(this);
        }
    }

    public void setTag(Tag tag){
        this.tag = tag;
        if (!tag.getCafeTags().contains(this)){
            tag.addCafeTag(this);
        }
    }
}
