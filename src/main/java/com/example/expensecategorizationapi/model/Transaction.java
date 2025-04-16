package com.example.expensecategorizationapi.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class Transaction {
    private String email;
    private String merchant;
    private BigDecimal amount;
    private String date;
    private String description;
    private String category;

    // Getters and setters

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getMerchant() { return merchant; }
    public void setMerchant(String merchant) { this.merchant = merchant; }

    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
}
