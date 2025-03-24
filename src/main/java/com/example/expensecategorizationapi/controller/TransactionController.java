package com.example.expensecategorizationapi.controller;

import com.example.expensecategorizationapi.model.Transaction;
import com.example.expensecategorizationapi.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @PostMapping
    public ResponseEntity<Transaction> createTransaction(@RequestBody Map<String, Object> request) {
        // Extract fields from the JSON payload
        String userId = (String) request.get("userId");
        String category = (String) request.get("category");
        BigDecimal amount = new BigDecimal(request.get("amount").toString());
        LocalDateTime date = LocalDateTime.parse((String) request.get("date"));
        String description = (String) request.get("description");

        // Create a Transaction object yess
        Transaction transaction = new Transaction(userId, category, amount, date, description);
        Transaction saved = transactionService.addTransaction(transaction);

        return ResponseEntity.ok(saved);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Transaction>> getUserTransactions(@PathVariable String userId) {
        List<Transaction> transactions = transactionService.getTransactionsForUser(userId);
        return ResponseEntity.ok(transactions);
    }
}
