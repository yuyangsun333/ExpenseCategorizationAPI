package com.example.expensecategorizationapi.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Document(collection = "transactions")
public class Transaction {

    @Id
    private String id;

    // This will store the user ID (the same as in the "User" entity)
    private String userId;

    private String merchantName;
    private String category;    // auto-determined
    private BigDecimal amount;
    private LocalDateTime date;
    private String description;

    public Transaction() {}

    public Transaction(String userId, String merchantName, BigDecimal amount,
                       LocalDateTime date, String description) {
        this.userId = userId;
        this.merchantName = merchantName;
        this.amount = amount;
        this.date = date;
        this.description = description;
    }

    // getters / setters ...
}
