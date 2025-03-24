package com.example.expensecategorizationapi.controller;

import com.example.expensecategorizationapi.model.User;
import com.example.expensecategorizationapi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        String email = request.get("email");
        String password = request.get("password");

        User user = userService.registerUser(username, email, password);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");

        User user = userService.findByEmail(email);
        if (user == null || !user.getPassword().equals(password)) {
            return ResponseEntity.badRequest().body("Invalid credentials");
        }

        // For real apps, you'd generate a JWT here. For now, just return user
        return ResponseEntity.ok("Login successful for user: " + user.getUsername());
    }
}
