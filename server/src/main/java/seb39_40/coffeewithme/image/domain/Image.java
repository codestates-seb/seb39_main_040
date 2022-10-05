package seb39_40.coffeewithme.image.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import seb39_40.coffeewithme.common.domain.BasicEntity;
import seb39_40.coffeewithme.common.domain.Status;

import javax.persistence.*;

@Entity
@Getter @Setter
@NoArgsConstructor
public class Image extends BasicEntity {
    @Id @Column(name = "IMAGE_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String path;

    @Column(nullable = false)
    @Enumerated(value = EnumType.STRING)
    private Status status;

    @Builder
    public Image(String path, Status status) {
        this.path = path;
        this.status = status;
    }

    public void deleteImg(){
        this.status = Status.TEMP;
    }

    public void saveImg(){
        this.status = Status.SAVED;
    }
}
