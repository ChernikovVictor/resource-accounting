package com.su.timesheetmanager.dto.mapper;

import com.su.timesheetmanager.dto.ProjectDTO;
import com.su.timesheetmanager.model.Employee;
import com.su.timesheetmanager.model.Project;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ProjectMapper {

    public ProjectDTO projectToProjectDTO(Project project) {
        Employee projectManager = project.getProjectManager();
        Integer projectManagerId = (projectManager == null) ? null : projectManager.getId();
        String projectManagerName = (projectManager == null) ? null : projectManager.getFullname();
        String projectManagerPosition = (projectManager == null) ? null : projectManager.getPosition();
        return ProjectDTO.builder()
                .id(project.getId())
                .name(project.getName())
                .budget(project.getBudget())
                .projectManagerId(projectManagerId)
                .projectManagerName(projectManagerName)
                .projectManagerPosition(projectManagerPosition)
                .build();
    }

    public Project projectDtoToProject(ProjectDTO projectDTO) {
        Project project = new Project();
        project.setId(projectDTO.getId());
        project.setName(projectDTO.getName());
        project.setBudget(projectDTO.getBudget());
        if (projectDTO.getProjectManagerId() != null) {
            Employee projectManager = new Employee();
            projectManager.setId(projectDTO.getProjectManagerId());
            project.setProjectManager(projectManager);
        }
        return project;
    }

    public List<ProjectDTO> projectListToDTOs(List<Project> projects) {
        return projects.stream().map(this::projectToProjectDTO).collect(Collectors.toList());
    }
}
