package com.su.timesheetmanager.service.impl;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.su.timesheetmanager.dto.ProjectDTO;
import com.su.timesheetmanager.dto.mapper.ProjectMapper;
import com.su.timesheetmanager.model.Employee;
import com.su.timesheetmanager.model.Project;
import com.su.timesheetmanager.model.ProjectEmployee;
import com.su.timesheetmanager.model.ProjectEmployeeId;
import com.su.timesheetmanager.repository.EmployeeRepository;
import com.su.timesheetmanager.repository.ProjectEmployeeRepository;
import com.su.timesheetmanager.repository.ProjectRepository;
import com.su.timesheetmanager.service.ProjectService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@AllArgsConstructor
public class ProjectServiceImpl implements ProjectService {

    private final ObjectMapper objectMapper = new ObjectMapper();

    private ProjectRepository projectRepository;
    private ProjectEmployeeRepository projectEmployeeRepository;
    private ProjectMapper mapper;
    private EmployeeRepository employeeRepository;

    @Override
    public List<ProjectDTO> getAllProjects() {
        List<Project> projects = projectRepository.findAll();
        return mapper.projectListToDTOs(projects);
    }

    @Override
    public ProjectDTO getById(Integer id) {
        Project project = projectRepository.findById(id).orElseThrow(RuntimeException::new);
        return mapper.projectToProjectDTO(project);
    }

    @Override
    public Integer createProject(ProjectDTO projectDTO) {
        Project project = mapper.projectDtoToProject(projectDTO);
        return projectRepository.save(project).getId();
    }

    @Override
    public Integer updateProject(ProjectDTO projectDTO) {
        Integer projectID = projectDTO.getId();
        if (projectID == null) {
            throw new RuntimeException("id is Null!");
        }
        if (!projectRepository.existsById(projectID)) {
            throw new RuntimeException("Проекта с таким id не существует!");
        }
        Project project = mapper.projectDtoToProject(projectDTO);
        return projectRepository.save(project).getId();
    }

    @Override
    public void deleteProject(Integer id) {
        if (id == null) {
            throw new RuntimeException("id is Null!");
        }
        if (!projectRepository.existsById(id)) {
            throw new RuntimeException("Проекта с таким id не существует!");
        }
        projectRepository.deleteById(id);
    }

    @Override
    public JsonNode getAssignedEmployees(Integer projectId) {
        List<Integer> employeeIds = projectEmployeeRepository.findById_ProjectId(projectId)
                .stream().map(entity -> entity.getId().getEmployeeId())
                .collect(Collectors.toList());
        List<Employee> employees = employeeRepository.findByIdIn(employeeIds);
        ArrayNode result = objectMapper.createArrayNode();
        for (Employee employee : employees) {
            ObjectNode node = objectMapper.createObjectNode();
            node.put("id", employee.getId());
            node.put("fullname", employee.getFullname());
            node.put("position", employee.getPosition());
            result.add(node);
        }
        return result;
    }

    @Override
    public void assignEmployeesToProject(Integer projectId, List<Integer> employeeIds) {
        List<ProjectEmployee> entities = new LinkedList<>();
        for (Integer employeeId : employeeIds) {
            ProjectEmployeeId projectEmployeeId = new ProjectEmployeeId(projectId, employeeId);
            entities.add(new ProjectEmployee(projectEmployeeId));
        }
        int saved = projectEmployeeRepository.saveAll(entities).size();
        log.info("were saved: {}", saved);
    }

    @Override
    @Transactional
    public void unassignEmployeesFromProject(Integer projectId, List<Integer> employeeIds) {
        long deleted = projectEmployeeRepository.deleteById_ProjectIdAndId_EmployeeIdIn(projectId, employeeIds);
        log.info("were deleted: {}", deleted);
    }
}
