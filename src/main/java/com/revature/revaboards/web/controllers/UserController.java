package com.revature.revaboards.web.controllers;

import com.revature.revaboards.exceptions.BadRequestException;
import com.revature.revaboards.exceptions.ResourceNotFoundException;
import com.revature.revaboards.exceptions.RevaboardsException;
import com.revature.revaboards.services.UserService;
import com.revature.revaboards.web.dtos.AppUserDTO;
import com.revature.revaboards.web.dtos.ErrorResponse;
import com.revature.revaboards.web.security.Secured;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private UserService userService;

    @Autowired
    public UserController(UserService service) {
        this.userService = service;
    }

    @GetMapping
    public List<AppUserDTO> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping(value="/id/{id}")
    public AppUserDTO getUserById(@PathVariable int id) {
        return userService.getUserById(id);
    }

}
