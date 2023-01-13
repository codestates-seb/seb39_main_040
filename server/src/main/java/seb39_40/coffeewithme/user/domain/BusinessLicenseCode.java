package seb39_40.coffeewithme.user.domain;

import lombok.Getter;

import javax.persistence.*;

@Getter
@Entity
public class BusinessLicenseCode {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="blc_id")
    private Long id;
    private String code;
    private Boolean registration;

    public void setRegistration(Boolean status){
        this.registration = status;
    };
}
