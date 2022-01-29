package com.su.timesheetmanager.rest;

import com.fasterxml.jackson.databind.JsonNode;
import com.su.timesheetmanager.dto.ProjectDTO;
import com.su.timesheetmanager.service.ProjectService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping(value = "/projects", produces = APPLICATION_JSON_VALUE)
@AllArgsConstructor
public class ProjectController {

    private ProjectService projectService;

    @GetMapping(value = "/list")
    public List<ProjectDTO> getAllProjects() {
        return projectService.getAllProjects();
    }

    @GetMapping(value = "/project")
    public ProjectDTO getProjectById(@RequestParam Integer id) {
        return projectService.getById(id);
    }

    @PostMapping(value = "/project")
    public ResponseEntity<Integer> createProject(@RequestBody ProjectDTO projectDTO) {
        return ResponseEntity.ok(projectService.createProject(projectDTO));
    }

    @PutMapping(value = "/project")
    public ResponseEntity<Integer> updateProject(@RequestBody ProjectDTO projectDTO) {
        return ResponseEntity.ok(projectService.updateProject(projectDTO));
    }

    @DeleteMapping(value = "/project")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void deleteProject(@RequestParam Integer id) {
        projectService.deleteProject(id);
    }

    @GetMapping(value = "/employees")
    public JsonNode getAssignedEmployees(@RequestParam Integer projectId) {
        return projectService.getAssignedEmployees(projectId);
    }

    @PostMapping(value = "/employees")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void assignEmployeesToProject(@RequestParam Integer projectId, @RequestBody List<Integer> employeeIds) {
        projectService.assignEmployeesToProject(projectId, employeeIds);
    }

    @DeleteMapping(value = "/employees")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void unassignEmployeesFromProject(@RequestParam Integer projectId, @RequestBody List<Integer> employeeIds) {
        projectService.unassignEmployeesFromProject(projectId, employeeIds);
    }
}
