package com.su.timesheetmanager.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProjectDTO {
    private Integer id;
    private String name;
    private Double budget;
    private Integer projectManagerId;
    private String projectManagerName;
    private String projectManagerPosition;
}
