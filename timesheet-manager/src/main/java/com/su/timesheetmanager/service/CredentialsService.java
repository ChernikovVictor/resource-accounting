package com.su.timesheetmanager.service;

import com.su.timesheetmanager.dto.CredentialsDTO;

public interface CredentialsService {

    Integer createCredentials(CredentialsDTO credentialsDTO);

    Integer authenticateUser(CredentialsDTO credentialsDTO);

    CredentialsDTO findById(Integer employeeId);
}
