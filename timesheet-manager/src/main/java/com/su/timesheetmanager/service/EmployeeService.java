package com.su.timesheetmanager.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.su.timesheetmanager.dto.EmployeeDTO;

import java.util.List;

public interface EmployeeService {

    List<EmployeeDTO> getAllEmployees();

    EmployeeDTO getById(Integer id);

    Integer createEmployee(EmployeeDTO employeeDTO);

    Integer updateEmployee(EmployeeDTO employeeDTO);

    void deleteEmployee(Integer id);

    JsonNode getAssignedProjects(Integer employeeId, boolean withSocial);
    void assignEmployeeToProjects(Integer employeeId, List<Integer> projectIds, boolean isOverwrite);
    void unassignEmployeeFromProjects(Integer employeeId, List<Integer> projectIds);

    ArrayNode getSubordinates(Integer managerId);

    List<EmployeeDTO> getProjectManagers(boolean onlyFree);
    List<EmployeeDTO> getLinearManagers();

    List<String> getAllEmployeeRoles();

    ArrayNode getLinearSubordinates(Integer managerId, boolean withAssignedProjects);
}
