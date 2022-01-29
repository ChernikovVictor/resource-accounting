package com.su.timesheetmanager.rest;

import com.su.timesheetmanager.dto.CredentialsDTO;
import com.su.timesheetmanager.service.CredentialsService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping(value = "/credentials", produces = APPLICATION_JSON_VALUE)
@AllArgsConstructor
public class CredentialsController {

    private CredentialsService credentialsService;

    @PostMapping(value = "/credentials")
    public Integer createCredentials(@RequestBody CredentialsDTO credentialsDTO) {
        return credentialsService.createCredentials(credentialsDTO);
    }

    @PostMapping(value = "/authentication")
    public Integer authenticateUser(@RequestBody CredentialsDTO credentialsDTO) {
        return credentialsService.authenticateUser(credentialsDTO);
    }
}
