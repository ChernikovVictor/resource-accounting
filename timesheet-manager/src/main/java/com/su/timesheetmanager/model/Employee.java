package com.su.timesheetmanager.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Getter
@Setter
@Entity
@Table(name = "employees")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "email", nullable = false, length = 45)
    private String email;

    @Column(name = "fullname", nullable = false, length = 45)
    private String fullname;

    @Column(name = "salary")
    private Integer salary;

    @Column(name = "position", length = 45)
    private String position;

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "role_id", nullable = false)
    private Role role;

    @ManyToOne
    @JoinColumn(name = "linear_manager_id")
    private Employee linearManager;

}