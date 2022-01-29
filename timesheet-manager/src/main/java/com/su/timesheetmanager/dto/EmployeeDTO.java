package com.su.timesheetmanager.dto;

import com.su.timesheetmanager.model.Role;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EmployeeDTO {
    private Integer id;
    private String email;
    private String fullname;
    private Integer salary;
    private String position;
    private Role role;
    private Integer linearManagerId;
    private String linearManagerName;
    private String linearManagerPosition;
}
