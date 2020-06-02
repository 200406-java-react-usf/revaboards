package com.revature.revaboards.web.controllers;

import com.revature.revaboards.entities.AppUser;
import com.revature.revaboards.services.UserService;
import com.revature.revaboards.web.dtos.Credentials;
import com.revature.revaboards.web.dtos.Principal;
import com.revature.revaboards.web.security.JwtConfig;
import com.revature.revaboards.web.security.TokenGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private UserService userService;

    @Autowired
    public AuthController(UserService service) {
        this.userService = service;
    }

    @PostMapping(produces=MediaType.APPLICATION_JSON_VALUE, consumes="application/json")
    public Principal authenticate(@RequestBody Credentials creds, HttpServletResponse resp) {
        Principal payload = userService.authenticate(creds);
        resp.setHeader(JwtConfig.HEADER, TokenGenerator.createJwt(payload));
        return payload;
    }

}
