package com.su.timesheetmanager.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CredentialsDTO {
    private Integer employeeId;
    private String login;
    private String password;
}
