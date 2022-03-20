package com.su.timesheetmanager.service.impl;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.su.timesheetmanager.dto.EmployeeDTO;
import com.su.timesheetmanager.dto.mapper.EmployeeMapper;
import com.su.timesheetmanager.model.Employee;
import com.su.timesheetmanager.model.Project;
import com.su.timesheetmanager.model.ProjectEmployee;
import com.su.timesheetmanager.model.ProjectEmployeeId;
import com.su.timesheetmanager.model.Role;
import com.su.timesheetmanager.repository.EmployeeRepository;
import com.su.timesheetmanager.repository.ProjectEmployeeRepository;
import com.su.timesheetmanager.repository.ProjectRepository;
import com.su.timesheetmanager.service.EmployeeService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Slf4j
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private final ObjectMapper objectMapper = new ObjectMapper();

    private EmployeeRepository employeeRepository;
    private ProjectEmployeeRepository projectEmployeeRepository;
    private EmployeeMapper mapper;
    private ProjectRepository projectRepository;

    @Override
    public List<EmployeeDTO> getAllEmployees() {
        List<Employee> employees = employeeRepository.findAll();
        return mapper.employeeListToDTOs(employees);
    }

    @Override
    public EmployeeDTO getById(Integer id) {
        Employee employee = employeeRepository.findById(id).orElseThrow(RuntimeException::new);
        return mapper.employeeToEmployeeDTO(employee);
    }

    @Override
    public Integer createEmployee(EmployeeDTO employeeDTO) {
        Employee employee = mapper.employeeDtoToEmployee(employeeDTO);
        return employeeRepository.save(employee).getId();
    }

    @Override
    public Integer updateEmployee(EmployeeDTO employeeDTO) {
        Integer employeeId = employeeDTO.getId();
        if (employeeId == null) {
            throw new RuntimeException("id is Null!");
        }
        if (!employeeRepository.existsById(employeeId)) {
            throw new RuntimeException("Employee с таким id не существует!");
        }
        Employee employee = mapper.employeeDtoToEmployee(employeeDTO);
        return employeeRepository.save(employee).getId();
    }

    @Override
    public void deleteEmployee(Integer id) {
        if (id == null) {
            throw new RuntimeException("id is Null!");
        }
        if (!employeeRepository.existsById(id)) {
            throw new RuntimeException("Employee с таким id не существует!");
        }
        employeeRepository.deleteById(id);
    }

    @Override
    public JsonNode getAssignedProjects(Integer employeeId) {
        List<Integer> projectIds = projectEmployeeRepository.findById_EmployeeId(employeeId)
                .stream().map(entity -> entity.getId().getProjectId())
                .collect(Collectors.toList());
        List<Project> projects = projectRepository.findByIdIn(projectIds);
        ArrayNode result = objectMapper.createArrayNode();
        for (Project project : projects) {
            ObjectNode node = objectMapper.createObjectNode();
            node.put("id", project.getId());
            node.put("name", project.getName());
            result.add(node);
        }
        return result;
    }

    @Override
    public void assignEmployeeToProjects(Integer employeeId, List<Integer> projectIds) {
        List<ProjectEmployee> entities = new LinkedList<>();
        for (Integer projectId : projectIds) {
            ProjectEmployeeId projectEmployeeId = new ProjectEmployeeId(projectId, employeeId);
            entities.add(new ProjectEmployee(projectEmployeeId));
        }
        int saved = projectEmployeeRepository.saveAll(entities).size();
        log.info("were saved: {}", saved);
    }

    @Override
    @Transactional
    public void unassignEmployeeFromProjects(Integer employeeId, List<Integer> projectIds) {
        long deleted = projectEmployeeRepository.deleteById_EmployeeIdAndId_ProjectIdIn(employeeId, projectIds);
        log.info("were deleted: {}", deleted);
    }

    @Override
    public ArrayNode getSubordinates(Integer managerId) {
        EmployeeDTO manager = getById(managerId);
        switch (manager.getRole()) {
            case LINEAR_MANAGER:
                return findSubordinatesForLM(managerId);
            case PROJECT_MANAGER:
                return findSubordinatesForPM(managerId);
            case LM_PM:
                return findSubordinatesForLM_PM(managerId);
            default:
                throw new RuntimeException(String.format("Employee role is not manager, id = %d", managerId));
        }
    }

    private ArrayNode findSubordinatesForLM(Integer managerId) {
        List<Employee> subordinates = employeeRepository.findSubordinatesByLinearManagerId(managerId);
        return mapper.employeesToSubordinatesArrayNode(subordinates, "LINEAR");
    }

    private ArrayNode findSubordinatesForPM(Integer managerId) {
        List<Employee> subordinates = employeeRepository.findSubordinatesByProjectManagerId(managerId);
        return mapper.employeesToSubordinatesArrayNode(subordinates, "PROJECT");
    }

    private ArrayNode findSubordinatesForLM_PM(Integer managerId) {
        List<Employee> linearSubordinates = employeeRepository.findSubordinatesByLinearManagerId(managerId);
        List<Employee> projectSubordinates = employeeRepository.findSubordinatesByProjectManagerId(managerId);
        List<Employee> bothSubordinates = linearSubordinates.stream().filter(projectSubordinates::contains)
                .collect(Collectors.toList());
        linearSubordinates.removeIf(bothSubordinates::contains);
        projectSubordinates.removeIf(bothSubordinates::contains);
        ArrayNode result = mapper.employeesToSubordinatesArrayNode(bothSubordinates, "BOTH");
        result.addAll(mapper.employeesToSubordinatesArrayNode(linearSubordinates, "LINEAR"));
        result.addAll(mapper.employeesToSubordinatesArrayNode(projectSubordinates, "PROJECT"));
        return result;
    }

    @Override
    public List<EmployeeDTO> getProjectManagers(boolean onlyFree) {
        List<Role> roles = Arrays.asList(Role.PROJECT_MANAGER, Role.LM_PM);
        List<Employee> projectManagers = employeeRepository.findByRoleIn(roles);
        if (onlyFree) {
            Set<Employee> notFreeProjectManagers = projectRepository.findAll().stream()
                    .map(Project::getProjectManager)
                    .filter(Objects::nonNull)
                    .collect(Collectors.toSet());
            projectManagers.removeIf(notFreeProjectManagers::contains);
        }
        return mapper.employeeListToDTOs(projectManagers);
    }

    @Override
    public List<EmployeeDTO> getLinearManagers() {
        List<Role> roles = Arrays.asList(Role.LINEAR_MANAGER, Role.LM_PM);
        List<Employee> linearManagers = employeeRepository.findByRoleIn(roles);
        return mapper.employeeListToDTOs(linearManagers);
    }

    @Override
    public List<String> getAllEmployeeRoles() {
        return Arrays.stream(Role.values()).map(Objects::toString)
                .collect(Collectors.toList());
    }
}
