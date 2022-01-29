package com.su.timesheetmanager.service.impl;

import com.su.timesheetmanager.dto.CredentialsDTO;
import com.su.timesheetmanager.dto.mapper.CredentialsMapper;
import com.su.timesheetmanager.model.Credentials;
import com.su.timesheetmanager.repository.CredentialsRepository;
import com.su.timesheetmanager.service.CredentialsService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class CredentialsServiceImpl implements CredentialsService {

    private CredentialsRepository credentialsRepository;
    private CredentialsMapper mapper;

    @Override
    public Integer createCredentials(CredentialsDTO credentialsDTO) {
        Credentials credentials = mapper.credentialsDtoToCredentials(credentialsDTO);
        return credentialsRepository.save(credentials).getEmployeeId();
    }

    @Override
    public Integer authenticateUser(CredentialsDTO credentialsDTO) {
        Credentials credentials = credentialsRepository.findByLoginIgnoreCase(credentialsDTO.getLogin())
                .orElseThrow(RuntimeException::new);
        if (credentialsDTO.getPassword().equalsIgnoreCase(credentials.getPassword())) {
            return credentials.getEmployeeId();
        } else {
            throw new RuntimeException("Wrong login or password");
        }
    }
}
