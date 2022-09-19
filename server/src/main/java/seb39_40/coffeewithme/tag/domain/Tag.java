package seb39_40.coffeewithme.tag.domain;

import javax.persistence.*;

@Entity
public class Tag {
    @Id @Column(name = "TAG_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private TagType type;

    @Column(nullable = false)
    private TagCategory category;

    private enum TagType {
        CAFE("cafeTag"),
        REVIEW("reviewTag");

        String type;

        TagType(String type) {
            this.type = type;
        }
    }

    private enum TagCategory {
        MOOD("분위기"),
        TASTE("맛"),
        ETC("기타");

        String category;

        TagCategory(String category) {
            this.category = category;
        }
    }
}
