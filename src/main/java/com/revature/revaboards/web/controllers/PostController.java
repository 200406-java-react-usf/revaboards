package com.revature.revaboards.web.controllers;

import com.revature.revaboards.entities.Post;
import com.revature.revaboards.exceptions.ResourceNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/posts")
public class PostController {

    @GetMapping
    public List<Post> getAllPosts() {
        throw new ResourceNotFoundException();
    }

}
