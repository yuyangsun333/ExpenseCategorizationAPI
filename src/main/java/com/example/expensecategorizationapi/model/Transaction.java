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
    public String getId() {
        return id;
    }

    public String getUserId() {
        return userId;
    }

    public String getMerchantName() {
        return merchantName;
    }

    public String getCategory() {
        return category;
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

    // Setters
    public void setId(String id) {
        this.id = id;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public void setMerchantName(String merchantName) {
        this.merchantName = merchantName;
    }

    public void setCategory(String category) {
        this.category = category;
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
}
