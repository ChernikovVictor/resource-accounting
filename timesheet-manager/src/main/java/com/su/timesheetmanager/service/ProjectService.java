package com.su.timesheetmanager.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.su.timesheetmanager.dto.ProjectDTO;

import java.util.List;

public interface ProjectService {

    List<ProjectDTO> getAllProjects();

    ProjectDTO getById(Integer id);

    Integer createProject(ProjectDTO projectDTO);

    Integer updateProject(ProjectDTO projectDTO);

    void deleteProject(Integer id);

    JsonNode getAssignedEmployees(Integer projectId);
    void assignEmployeesToProject(Integer projectId, List<Integer> employeeIds);
    void unassignEmployeesFromProject(Integer projectId, List<Integer> employeeIds);
}
