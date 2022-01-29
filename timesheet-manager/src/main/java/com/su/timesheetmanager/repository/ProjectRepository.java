package com.su.timesheetmanager.repository;

import com.su.timesheetmanager.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Integer> {
    List<Project> findByIdIn(Collection<Integer> ids);
}