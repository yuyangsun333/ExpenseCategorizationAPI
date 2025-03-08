package com.example.expensecategorizationapi.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Document(collection = "transactions")
public class Transaction {

    @Id
    private String id;
    private String category;
    private BigDecimal amount;
    private LocalDateTime date;
    private String userId;

    // Constructors
    public Transaction() {}

    public Transaction(String category, BigDecimal amount, LocalDateTime date, String userId) {
        this.category = category;
        this.amount = amount;
        this.date = date;
        this.userId = userId;
    }

    // Getters & Setters
    public String getId() { return id; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }

    public LocalDateTime getDate() { return date; }
    public void setDate(LocalDateTime date) { this.date = date; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
}
