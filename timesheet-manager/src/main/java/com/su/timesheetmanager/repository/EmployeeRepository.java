package com.su.timesheetmanager.repository;

import com.su.timesheetmanager.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
    List<Employee> findByIdIn(Collection<Integer> ids);

    @Query(value = "SELECT * FROM employees WHERE linear_manager_id = :id", nativeQuery = true)
    List<Employee> findSubordinatesByLinearManagerId(@Param(value = "id") Integer linearManagerId);

    @Query(value = "SELECT * FROM employees WHERE id IN (" +
            "SELECT employee_id FROM project_employee " +
            "WHERE project_id = (SELECT id FROM projects WHERE PM_id = :managerId)" +
            ");", nativeQuery = true)
    List<Employee> findSubordinatesByProjectManagerId(@Param("managerId") Integer managerId);
}