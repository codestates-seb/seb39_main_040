package seb39_40.coffeewithme.image.domain;

import javax.persistence.*;

@Entity
public class Image {
    @Id @Column(name = "IMAGE_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false,columnDefinition = "TEXT")
    private String path;
}
