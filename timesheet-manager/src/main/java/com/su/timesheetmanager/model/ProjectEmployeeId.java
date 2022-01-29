package com.su.timesheetmanager.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.Hibernate;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class ProjectEmployeeId implements Serializable {
    private static final long serialVersionUID = -1192160509683732742L;
    @Column(name = "project_id", nullable = false)
    private Integer projectId;
    @Column(name = "employee_id", nullable = false)
    private Integer employeeId;

    @Override
    public int hashCode() {
        return Objects.hash(employeeId, projectId);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        ProjectEmployeeId entity = (ProjectEmployeeId) o;
        return Objects.equals(this.employeeId, entity.employeeId) &&
                Objects.equals(this.projectId, entity.projectId);
    }
}