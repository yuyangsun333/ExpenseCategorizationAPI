package com.example.expensecategorizationapi.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Document(collection = "transactions")
public class Transaction {

    @Id
    private String id;
    private String userId;
    private String email; // Added for Option 2
    private String merchantName;
    private BigDecimal amount;
    private LocalDateTime date;
    private String description;
    private String category;

    public Transaction() {}

    public Transaction(String userId, String email, String merchantName, BigDecimal amount, LocalDateTime date,
                       String description, String category) {
        this.userId = userId;
        this.email = email;
        this.merchantName = merchantName;
        this.amount = amount;
        this.date = date;
        this.description = description;
        this.category = category;
    }

    // Getters and setters
    public String getId() {
        return id;
    }

    public String getUserId() {
        return userId;
    }

    public String getEmail() {
        return email;
    }

    public String getMerchantName() {
        return merchantName;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public String getDescription() {
        return description;
    }

    public String getCategory() {
        return category;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setMerchantName(String merchantName) {
        this.merchantName = merchantName;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}
