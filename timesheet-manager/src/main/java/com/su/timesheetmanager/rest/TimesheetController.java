package com.su.timesheetmanager.rest;

import com.fasterxml.jackson.databind.node.ArrayNode;
import com.su.timesheetmanager.dto.TimesheetDTO;
import com.su.timesheetmanager.model.TimesheetStatus;
import com.su.timesheetmanager.service.TimesheetService;
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

import java.time.LocalDate;
import java.util.Collections;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping(value = "/timesheets", produces = APPLICATION_JSON_VALUE)
@AllArgsConstructor
public class TimesheetController {
    
    private TimesheetService timesheetService;

    @GetMapping(value = "/timesheet")
    public TimesheetDTO getTimesheetById(@RequestParam Integer id) {
        return timesheetService.getById(id);
    }

    @PostMapping(value = "/timesheet")
    public ResponseEntity<Integer> createTimesheet(@RequestBody TimesheetDTO timesheetDTO) {
        return ResponseEntity.ok(timesheetService.createTimesheet(timesheetDTO));
    }

    @PutMapping(value = "/timesheet")
    public ResponseEntity<Integer> updateTimesheet(@RequestBody TimesheetDTO timesheetDTO) {
        return ResponseEntity.ok(timesheetService.updateTimesheet(timesheetDTO));
    }

    @DeleteMapping(value = "/timesheet")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void deleteTimesheet(@RequestParam Integer id) {
        timesheetService.deleteTimesheet(id);
    }

    @PostMapping(value = "/submit")
    public TimesheetDTO submitTimesheet(@RequestBody TimesheetDTO timesheetDTO) {
        return timesheetService.sendForApproval(timesheetDTO);
    }

    @PostMapping(value = "/approve")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void approveTimesheet(@RequestParam(value = "timesheet") Integer timesheetId,
                                 @RequestParam(value = "manager") Integer managerId) {
        TimesheetDTO timesheetDTO = timesheetService.getById(timesheetId);
        timesheetService.setTimesheetStatus(timesheetDTO, TimesheetStatus.APPROVED, Collections.singletonList(managerId));
        timesheetService.updateTimesheet(timesheetDTO);
    }

    @PostMapping(value = "/decline")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void declineTimesheet(@RequestParam(value = "timesheet") Integer timesheetId,
                                 @RequestParam(value = "manager") Integer managerId) {
        TimesheetDTO timesheetDTO = timesheetService.getById(timesheetId);
        timesheetService.setTimesheetStatus(timesheetDTO, TimesheetStatus.DECLINED, Collections.singletonList(managerId));
        timesheetService.updateTimesheet(timesheetDTO);
    }

    @GetMapping(value = "/timesheet-info")
    public ResponseEntity<TimesheetDTO> getTimesheetForEmployeeByPeriod(
            @RequestParam Integer employeeId,
            @RequestParam String period,
            @RequestParam(required = false, defaultValue = "false") boolean createIfMissing
    ) {
        TimesheetDTO timesheetDTO = timesheetService.getByEmployeeAndPeriod(employeeId, LocalDate.parse(period));
        if (timesheetDTO != null) {
            return ResponseEntity.ok(timesheetDTO);
        }
        if (createIfMissing) {
            timesheetDTO = TimesheetDTO.builder()
                    .employeeId(employeeId)
                    .period(LocalDate.parse(period))
                    .build();
            Integer id = timesheetService.createTimesheet(timesheetDTO);
            return ResponseEntity.ok(timesheetService.getById(id));
        } else {
            throw new RuntimeException("Timesheet not found!");
        }
    }

    @GetMapping(value = "/timesheet/status")
    public ArrayNode getTimesheetStatusById(@RequestParam Integer id) {
        return timesheetService.getTimesheetStatus(id);
    }
}
