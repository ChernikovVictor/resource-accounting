package com.su.timesheetmanager.dto.mapper;

import com.su.timesheetmanager.dto.EmployeeDTO;
import com.su.timesheetmanager.model.Employee;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class EmployeeMapper {

    public EmployeeDTO employeeToEmployeeDTO(Employee employee) {
        Employee linearManager = employee.getLinearManager();
        Integer linearManagerId = (linearManager == null) ? null : linearManager.getId();
        String linearManagerName = (linearManager == null) ? null : linearManager.getFullname();
        String linearManagerPosition = (linearManager == null) ? null : linearManager.getPosition();
        return EmployeeDTO.builder()
                .id(employee.getId())
                .fullname(employee.getFullname())
                .email(employee.getEmail())
                .salary(employee.getSalary())
                .position(employee.getPosition())
                .role(employee.getRole())
                .linearManagerId(linearManagerId)
                .linearManagerName(linearManagerName)
                .linearManagerPosition(linearManagerPosition)
                .build();
    }

    public Employee employeeDtoToEmployee(EmployeeDTO employeeDTO) {
        Employee employee = new Employee();
        employee.setId(employeeDTO.getId());
        employee.setFullname(employeeDTO.getFullname());
        employee.setEmail(employeeDTO.getEmail());
        employee.setSalary(employeeDTO.getSalary());
        employee.setPosition(employeeDTO.getPosition());
        employee.setRole(employeeDTO.getRole());
        if (employeeDTO.getLinearManagerId() != null) {
            Employee linearManager = new Employee();
            linearManager.setId(employeeDTO.getLinearManagerId());
            employee.setLinearManager(linearManager);
        }
        return employee;
    }

    public List<EmployeeDTO> employeeListToDTOs(List<Employee> employees) {
        return employees.stream().map(this::employeeToEmployeeDTO).collect(Collectors.toList());
    }
}