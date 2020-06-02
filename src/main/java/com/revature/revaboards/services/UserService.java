package com.revature.revaboards.services;

import com.revature.revaboards.entities.AppUser;
import com.revature.revaboards.exceptions.BadRequestException;
import com.revature.revaboards.exceptions.ResourceNotFoundException;
import com.revature.revaboards.repositories.UserRepository;
import com.revature.revaboards.web.dtos.AppUserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

}
