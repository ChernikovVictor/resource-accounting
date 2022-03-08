package com.su.timesheetmanager.service.impl;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.su.timesheetmanager.dto.TimesheetDTO;
import com.su.timesheetmanager.dto.mapper.TimesheetMapper;
import com.su.timesheetmanager.model.Employee;
import com.su.timesheetmanager.model.Timesheet;
import com.su.timesheetmanager.model.TimesheetStatus;
import com.su.timesheetmanager.repository.EmployeeRepository;
import com.su.timesheetmanager.repository.ProjectRepository;
import com.su.timesheetmanager.repository.TimesheetRepository;
import com.su.timesheetmanager.service.TimesheetService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Slf4j
@AllArgsConstructor
public class TimesheetServiceImpl implements TimesheetService {

    private final ObjectMapper objectMapper = new ObjectMapper();

    private TimesheetRepository timesheetRepository;
    private TimesheetMapper mapper;
    private ProjectRepository projectRepository;
    private EmployeeRepository employeeRepository;

    @Override
    public TimesheetDTO getById(Integer id) {
        Timesheet timesheet = timesheetRepository.findById(id).orElseThrow(RuntimeException::new);
        return mapper.timesheetToTimesheetDTO(timesheet);
    }

    @Override
    public TimesheetDTO getByEmployeeAndPeriod(Integer employeeId, LocalDate period) {
        Employee employee = employeeRepository.findById(employeeId).orElseThrow(RuntimeException::new);
        Optional<Timesheet> timesheet = timesheetRepository.findByEmployeeAndPeriod(employee, period);
        return timesheet.map(value -> mapper.timesheetToTimesheetDTO(value)).orElseThrow(RuntimeException::new);
    }

    @Override
    public Integer createTimesheet(TimesheetDTO timesheetDTO) {
        JsonNode data = createTimesheetTemplateByPeriod(timesheetDTO.getPeriod());
        timesheetDTO.setData(data);
        Timesheet timesheet = mapper.timesheetDtoToTimesheet(timesheetDTO);
        return timesheetRepository.save(timesheet).getId();
    }

    private JsonNode createTimesheetTemplateByPeriod(LocalDate period) {
        int lengthOfMonth = period.lengthOfMonth();
        ObjectNode days = objectMapper.createObjectNode();
        for (int day = 1; day <= lengthOfMonth; day++) {
            days.set(String.valueOf(day), objectMapper.createObjectNode());
        }
        ObjectNode result = objectMapper.createObjectNode();
        result.set("days", days);
        return result;
    }

    @Override
    public Integer updateTimesheet(TimesheetDTO timesheetDTO) {
        Integer timesheetId = timesheetDTO.getId();
        if (timesheetId == null) {
            throw new RuntimeException("id is Null!");
        }
        if (!timesheetRepository.existsById(timesheetId)) {
            throw new RuntimeException("timesheet с таким id не существует!");
        }
        Timesheet timesheet = mapper.timesheetDtoToTimesheet(timesheetDTO);
        return timesheetRepository.save(timesheet).getId();
    }

    @Override
    public void deleteTimesheet(Integer id) {
        if (id == null) {
            throw new RuntimeException("id is Null!");
        }
        if (!timesheetRepository.existsById(id)) {
            throw new RuntimeException("timesheet с таким id не существует!");
        }
        timesheetRepository.deleteById(id);
    }

    @Override
    public TimesheetDTO sendForApproval(TimesheetDTO timesheetDTO) {
        List<Integer> approverIds = extractApproverIds(timesheetDTO);
        setTimesheetStatus(timesheetDTO, TimesheetStatus.ON_APPROVAL, approverIds);
        updateTimesheet(timesheetDTO);
        // TODO: 16.01.2022 emailService.send(EMAIL_TYPE, approverIds) async ?
        return timesheetDTO;
    }

    @Override
    public void setTimesheetStatus(TimesheetDTO timesheetDTO, TimesheetStatus status, List<Integer> managerIds) {
        ObjectNode data = (ObjectNode) timesheetDTO.getData();
        data.putIfAbsent("status", objectMapper.createObjectNode());
        ObjectNode statusNode = (ObjectNode) data.get("status");
        managerIds.forEach(id -> statusNode.put(String.valueOf(id), status.name()));
    }

    private List<Integer> extractApproverIds(TimesheetDTO timesheetDTO) {
        List<Integer> projectIds = extractProjectIds(timesheetDTO);
        List<Integer> projectManagerIds = projectRepository.findByIdIn(projectIds)
                .stream().filter(project -> project.getProjectManager() != null)
                .map(project -> project.getProjectManager().getId())
                .collect(Collectors.toList());
        Integer linearManagerId = employeeRepository.findById(timesheetDTO.getEmployeeId())
                .filter(employee -> employee.getLinearManager() != null)
                .map(employee -> employee.getLinearManager().getId())
                .orElseThrow(RuntimeException::new);
        if (!projectManagerIds.contains(linearManagerId)) {
            projectManagerIds.add(linearManagerId);
        }
        return projectManagerIds;
    }

    private List<Integer> extractProjectIds(TimesheetDTO timesheetDTO) {
        ObjectNode days = (ObjectNode) timesheetDTO.getData().get("days");
        Set<String> projectIds = new HashSet<>();
        Iterator<JsonNode> daysIterator = days.elements();
        while (daysIterator.hasNext()) {
            JsonNode day = daysIterator.next();
            Iterator<String> dayIterator = day.fieldNames();
            while (dayIterator.hasNext()) {
                String projectId = dayIterator.next();
                projectIds.add(projectId);
            }
        }
        return projectIds.stream().map(Integer::valueOf).collect(Collectors.toList());
    }

}
