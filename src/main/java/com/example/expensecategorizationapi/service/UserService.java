package com.example.expensecategorizationapi.service;

import com.example.expensecategorizationapi.model.User;
import com.example.expensecategorizationapi.repository.UserRepository;
import com.example.expensecategorizationapi.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }


    public User registerUser(String username, String email, String rawPassword) {

        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("Email already exists!");
        }


        String hashedPassword = passwordEncoder.encode(rawPassword);


        User user = User.builder()
                .username(username)
                .email(email)
                .passwordHash(hashedPassword)
                .role("USER") // default role
                .build();


        return userRepository.save(user);
    }


    public String loginUser(String email, String rawPassword) {

        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        User user = optionalUser.get();

        if (!passwordEncoder.matches(rawPassword, user.getPasswordHash())) {
            throw new RuntimeException("Invalid password");
        }


        return JwtUtils.generateToken(user.getId());
    }


    public Optional<User> getUserProfile(String userId) {
        return userRepository.findById(userId);
    }
}
