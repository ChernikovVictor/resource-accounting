package com.su.timesheetmanager.repository;

import com.su.timesheetmanager.model.ProjectEmployee;
import com.su.timesheetmanager.model.ProjectEmployeeId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;

public interface ProjectEmployeeRepository extends JpaRepository<ProjectEmployee, ProjectEmployeeId> {

    List<ProjectEmployee> findById_ProjectId(Integer projectId);
    List<ProjectEmployee> findById_EmployeeId(Integer employeeId);

    long deleteById_EmployeeIdAndId_ProjectIdIn(Integer employeeId, Collection<Integer> projectIds);
    long deleteById_ProjectIdAndId_EmployeeIdIn(Integer projectId, Collection<Integer> employeeIds);
}