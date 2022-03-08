package com.su.timesheetmanager.repository;

import com.su.timesheetmanager.model.Employee;
import com.su.timesheetmanager.model.Timesheet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;

public interface TimesheetRepository extends JpaRepository<Timesheet, Integer> {
    Optional<Timesheet> findByEmployeeAndPeriod(Employee employee, LocalDate period);
}