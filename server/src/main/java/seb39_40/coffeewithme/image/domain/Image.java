package seb39_40.coffeewithme.image.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import seb39_40.coffeewithme.common.domain.BasicEntity;

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
    private ImgStatus status;

    @Builder
    public Image(String path, ImgStatus status) {
        this.path = path;
        this.status = status;
    }

    public enum ImgStatus {
        // 임시이미지는 저장한 기간이 일주일 지나면 삭제
        TEMP("임시이미지"),
        SAVED("저장이미지");

        @Getter
        private String status;

        ImgStatus(String status) {
            this.status = status;
        }
    }

    public void deleteImg(){
        this.status = ImgStatus.TEMP;
    }

    public void saveImg(){
        this.status = ImgStatus.SAVED;
    }
}
