package seb39_40.coffeewithme.cafe.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity @Getter @Setter
@NoArgsConstructor
public class Tag {
    @Id @Column(name = "TAG_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    @Enumerated(value = EnumType.STRING)
    private TagCategory category;

    @OneToMany(mappedBy = "tag", cascade = CascadeType.ALL)
    private List<CafeTag> cafeTags = new ArrayList<>();


    private enum TagCategory {
        MOOD("분위기"),
        TASTY("맛집"),
        STUDY("스터디"),
        ETC("기타");

        String category;

        TagCategory(String category) {
            this.category = category;
        }
    }

    public void addCafeTag(CafeTag cafeTag){
        this.cafeTags.add(cafeTag);
        if (cafeTag.getTag() != this){
            cafeTag.setTag(this);
        }
    }
}
