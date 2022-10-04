package seb39_40.coffeewithme.tag.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import seb39_40.coffeewithme.cafe.domain.CafeTag;
import seb39_40.coffeewithme.cafe.domain.SortType;
import seb39_40.coffeewithme.exception.BusinessLogicException;
import seb39_40.coffeewithme.review.domain.ReviewTag;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

import static seb39_40.coffeewithme.exception.ExceptionCode.INVALID_INPUT_VALUE;

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

    @OneToMany(mappedBy = "tag")
    private List<CafeTag> cafeTags = new ArrayList<>();

    @OneToMany(mappedBy = "tag")
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
        MOOD("mood"),
        TASTY("tasty"),
        STUDY("study"),
        NONE("none"),
        ETC("etc");

        @Getter
        String text;

        Category(String text) {
            this.text = text;
        }
    }

    public static Category findCategory(String text) {
        for (Category category :Category.values())
            if (category.text.equals(text)) {
                return category;
            }
        throw new BusinessLogicException(INVALID_INPUT_VALUE);
    }
}
