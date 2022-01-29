package com.su.timesheetmanager.service;

import com.su.timesheetmanager.dto.TimesheetDTO;
import com.su.timesheetmanager.model.TimesheetStatus;

import java.util.List;

public interface TimesheetService {

    TimesheetDTO getById(Integer id);

    Integer createTimesheet(TimesheetDTO timesheetDTO);

    Integer updateTimesheet(TimesheetDTO timesheetDTO);

    void deleteTimesheet(Integer id);

    TimesheetDTO sendForApproval(TimesheetDTO timesheetDTO);

    void setTimesheetStatus(TimesheetDTO timesheetDTO, TimesheetStatus status, List<Integer> managerIds);
}