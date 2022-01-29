package com.su.timesheetmanager.dto.mapper;

import com.su.timesheetmanager.dto.CredentialsDTO;
import com.su.timesheetmanager.model.Credentials;
import org.springframework.stereotype.Component;

@Component
public class CredentialsMapper {

    public CredentialsDTO credentialsToCredentialsDTO(Credentials credentials) {
        return CredentialsDTO.builder()
                .employeeId(credentials.getEmployeeId())
                .login(credentials.getLogin())
                .password(credentials.getPassword())
                .build();
    }

    public Credentials credentialsDtoToCredentials(CredentialsDTO credentialsDTO) {
        Credentials credentials = new Credentials();
        credentials.setEmployeeId(credentialsDTO.getEmployeeId());
        credentials.setLogin(credentialsDTO.getLogin());
        credentials.setPassword(credentialsDTO.getPassword());
        return credentials;
    }
}
