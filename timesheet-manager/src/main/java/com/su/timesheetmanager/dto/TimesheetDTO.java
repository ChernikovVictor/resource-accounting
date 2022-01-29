package com.su.timesheetmanager.dto;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class TimesheetDTO {
    private Integer id;
    private Integer employeeId;
    private LocalDate period;
    private JsonNode data;
}
