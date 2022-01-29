package com.su.timesheetmanager.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.Table;

@Getter
@Setter
@Entity
@Table(name = "credentials", indexes = {
        @Index(name = "login_UNIQUE", columnList = "login", unique = true)
})
public class Credentials {

    @Id
    @Column(name = "employee_id", nullable = false)
    private Integer employeeId;

    @Column(name = "login", nullable = false, length = 45)
    private String login;

    @Column(name = "password", nullable = false, length = 45)
    private String password;

}