package com.revature.revaboards.web.controllers;

import com.revature.revaboards.services.UserService;
import com.revature.revaboards.web.dtos.AppUserDTO;
import com.revature.revaboards.web.security.Secured;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
