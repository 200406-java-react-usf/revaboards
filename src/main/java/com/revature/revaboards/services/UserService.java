package com.revature.revaboards.services;

import com.revature.revaboards.entities.AppUser;
import com.revature.revaboards.entities.UserRole;
import com.revature.revaboards.exceptions.AuthenticationException;
import com.revature.revaboards.exceptions.BadRequestException;
import com.revature.revaboards.exceptions.ResourceNotFoundException;
import com.revature.revaboards.repositories.UserRepository;
import com.revature.revaboards.web.dtos.AppUserDTO;
import com.revature.revaboards.web.dtos.Credentials;
import com.revature.revaboards.web.dtos.Principal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.NoResultException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    private UserRepository userRepo;

    @Autowired
    public UserService(UserRepository repo) {
        this.userRepo = repo;
    }

    @Transactional(readOnly=true)
    public List<AppUserDTO> getAllUsers() {
        return userRepo.getAll()
                       .stream()
                       .map(AppUserDTO::new)
                       .collect(Collectors.toList());
    }

    @Transactional(readOnly=true)
    public AppUserDTO getUserById(int id) {

        if (id <= 0) {
            throw new BadRequestException();
        }

        AppUser retrievedUser = userRepo.findById(id);

        if (retrievedUser == null) {
            throw new ResourceNotFoundException();
        }

        return new AppUserDTO(retrievedUser);

    }

    @Transactional(readOnly=true)
    public Principal authenticate(Credentials creds) {

        if (creds == null || creds.getUsername() == null || creds.getPassword() == null
            || creds.getUsername().trim().equals("") || creds.getPassword().trim().equals(""))
        {
            throw new BadRequestException();
        }

        AppUser retrievedUser;

        try {
            retrievedUser = userRepo.findUserByUsernameAndPassword(creds.getUsername(), creds.getPassword());
        } catch (NoResultException e) {
            throw new AuthenticationException("Authentication failed!", e);
        }

        return new Principal(retrievedUser);

    }

    @Transactional
    public AppUserDTO register(AppUser newUser) {

        // validation for unique fields would go here...
        newUser.setActive(true);
        newUser.setRegisterDatetime(LocalDateTime.now());
        newUser.setRole(UserRole.USER);
        return new AppUserDTO(userRepo.save(newUser));
    }

}
