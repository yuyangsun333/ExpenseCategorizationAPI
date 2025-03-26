package com.example.expensecategorizationapi.controller;

import com.example.expensecategorizationapi.model.User;
import com.example.expensecategorizationapi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public User register(@RequestBody Map<String, String> payload) {
        String username = payload.get("username");
        String email = payload.get("email");
        String password = payload.get("password");

        return userService.registerUser(username, email, password);
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        String password = payload.get("password");

        String token = userService.loginUser(email, password);
        return Map.of("token", token);
    }

    @GetMapping("/profile/{userId}")
    public User getProfile(@PathVariable String userId) {
        return userService.getUserProfile(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
