package seb39_40.coffeewithme.tag.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import seb39_40.coffeewithme.cafe.domain.CafeTag;
import seb39_40.coffeewithme.review.domain.ReviewTag;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity @Getter @Setter
@NoArgsConstructor
public class Tag {
    @Id @Column(name = "TAG_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, name = "tag_nm")
    private String name;

    @Column(nullable = false, name = "tag_ctg")
    @Enumerated(value = EnumType.STRING)
    private Category category;

    @OneToMany(mappedBy = "tag", cascade = CascadeType.ALL)
    private List<CafeTag> cafeTags = new ArrayList<>();

    @OneToMany(mappedBy = "tag", cascade = CascadeType.ALL)
    private List<ReviewTag> reviewTags = new ArrayList<>();


    public void addCafeTag(CafeTag cafeTag){
        this.cafeTags.add(cafeTag);
        if (cafeTag.getTag() != this){
            cafeTag.setTag(this);
        }
    }

    public void addReviewTag(ReviewTag reviewTag){
        this.reviewTags.add(reviewTag);
        if (reviewTag.getTag() != this){
            reviewTag.setTag(this);
        }
    }

    public enum Category {
        MOOD("분위기"),
        TASTY("맛집"),
        STUDY("스터디"),
        NONE("없음"),
        ETC("기타");

        String category;

        Category(String category) {
            this.category = category;
        }
    }
}
