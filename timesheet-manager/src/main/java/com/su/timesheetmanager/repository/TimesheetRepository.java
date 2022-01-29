package com.su.timesheetmanager.repository;

import com.su.timesheetmanager.model.Timesheet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TimesheetRepository extends JpaRepository<Timesheet, Integer> {
}