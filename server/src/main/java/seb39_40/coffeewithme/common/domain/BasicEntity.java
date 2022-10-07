package seb39_40.coffeewithme.common.domain;

import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.time.LocalDateTime;

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@Getter
public abstract class BasicEntity {
    @CreatedDate
    @Column(updatable = false, name = "reg_dt")
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(updatable = false, name = "mdf_dt")
    private LocalDateTime modifiedAt;
}
