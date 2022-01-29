package com.su.timesheetmanager.rest;

import com.fasterxml.jackson.databind.JsonNode;
import com.su.timesheetmanager.dto.EmployeeDTO;
import com.su.timesheetmanager.service.EmployeeService;
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
@RequestMapping(value = "/employees", produces = APPLICATION_JSON_VALUE)
@AllArgsConstructor
public class EmployeeController {
    
    private EmployeeService employeeService;

    @GetMapping(value = "/list")
    public List<EmployeeDTO> getAllEmployees() {
        return employeeService.getAllEmployees();
    }

    @GetMapping(value = "/employee")
    public EmployeeDTO getEmployeeById(@RequestParam Integer id) {
        return employeeService.getById(id);
    }

    @PostMapping(value = "/employee")
    public ResponseEntity<Integer> createEmployee(@RequestBody EmployeeDTO EmployeeDTO) {
        return ResponseEntity.ok(employeeService.createEmployee(EmployeeDTO));
    }

    @PutMapping(value = "/employee")
    public ResponseEntity<Integer> updateEmployee(@RequestBody EmployeeDTO EmployeeDTO) {
        return ResponseEntity.ok(employeeService.updateEmployee(EmployeeDTO));
    }

    @DeleteMapping(value = "/employee")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void deleteEmployee(@RequestParam Integer id) {
        employeeService.deleteEmployee(id);
    }

    @GetMapping(value = "/projects")
    public JsonNode getAssignedProjects(@RequestParam Integer employeeId) {
        return employeeService.getAssignedProjects(employeeId);
    }

    @PostMapping(value = "/projects")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void assignEmployeeToProjects(@RequestParam Integer employeeId, @RequestBody List<Integer> projectIds) {
        employeeService.assignEmployeeToProjects(employeeId, projectIds);
    }

    @DeleteMapping(value = "/projects")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void unassignEmployeeFromProjects(@RequestParam Integer employeeId, @RequestBody List<Integer> projectIds) {
        employeeService.unassignEmployeeFromProjects(employeeId, projectIds);
    }
}