package com.example.expensecategorizationapi.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users") // Maps to "users" collection in MongoDB
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    private String id;

    private String username;
    private String email;
    private String passwordHash;
    private String role;
}
