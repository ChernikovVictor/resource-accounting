package com.su.timesheetmanager.dto.mapper;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.su.timesheetmanager.dto.TimesheetDTO;
import com.su.timesheetmanager.model.Employee;
import com.su.timesheetmanager.model.Timesheet;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Component
public class TimesheetMapper {

    private final ObjectMapper objectMapper = new ObjectMapper();

    public TimesheetDTO timesheetToTimesheetDTO(Timesheet timesheet) {
        JsonNode data = objectMapper.createObjectNode();
        try {
            data = objectMapper.readTree(timesheet.getData());
        } catch (JsonProcessingException e) {
            log.error("error ", e);
            e.printStackTrace();
        }
        return TimesheetDTO.builder()
                .id(timesheet.getId())
                .employeeId(timesheet.getEmployee().getId())
                .period(timesheet.getPeriod())
                .data(data)
                .build();
    }

    public Timesheet timesheetDtoToTimesheet(TimesheetDTO timesheetDTO) {
        String data = "";
        try {
            data = objectMapper.writeValueAsString(timesheetDTO.getData());
        } catch (JsonProcessingException e) {
            log.error("error ", e);
            e.printStackTrace();
        }
        Timesheet timesheet = new Timesheet();
        timesheet.setId(timesheetDTO.getId());
        Employee employee = new Employee();
        employee.setId(timesheetDTO.getEmployeeId());
        timesheet.setEmployee(employee);
        timesheet.setPeriod(timesheetDTO.getPeriod());
        timesheet.setData(data);
        return timesheet;
    }

    public List<TimesheetDTO> timesheetListToDTOs(List<Timesheet> timesheets) {
        return timesheets.stream().map(this::timesheetToTimesheetDTO).collect(Collectors.toList());
    }
}
