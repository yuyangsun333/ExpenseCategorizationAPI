package com.example.expensecategorizationapi.controller;

import com.example.expensecategorizationapi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody UserRequest request) {
        boolean success = userService.registerUser(request.getEmail(), request.getPassword());
        if (success) {
            return ResponseEntity.ok(Map.of("message", "User registered successfully."));
        } else {
            return ResponseEntity.badRequest().body(Map.of("error", "User already exists."));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody UserRequest request) {
        boolean success = userService.loginUser(request.getEmail(), request.getPassword());
        if (success) {
            return ResponseEntity.ok(Map.of("message", "Login successful."));
        } else {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials."));
        }
    }

    // Helper class for user requests
    static class UserRequest {
        private String email;
        private String password;

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }
}
