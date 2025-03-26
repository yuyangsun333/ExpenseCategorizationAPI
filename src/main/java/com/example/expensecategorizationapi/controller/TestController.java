package com.example.expensecategorizationapi.controller;

import com.example.expensecategorizationapi.model.LoginRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/test")
@CrossOrigin(origins = "*")
public class TestController {

    @PostMapping("/login")
    public ResponseEntity<?> testLogin(@RequestBody LoginRequest loginRequest) {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        System.out.println("Received Email: " + email);
        System.out.println("Received Password: " + password);

        return ResponseEntity.ok("Login data received successfully");
    }
}
