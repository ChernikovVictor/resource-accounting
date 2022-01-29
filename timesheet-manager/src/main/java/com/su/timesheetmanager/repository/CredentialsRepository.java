package com.su.timesheetmanager.repository;

import com.su.timesheetmanager.model.Credentials;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;

import java.util.Optional;

public interface CredentialsRepository extends JpaRepository<Credentials, Integer> {

    Optional<Credentials> findByLoginIgnoreCase(@NonNull String login);

}