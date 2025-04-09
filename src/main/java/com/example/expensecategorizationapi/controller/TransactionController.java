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
//

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/transactions")
public class TransactionController {
///

    @Autowired
    private TransactionService transactionService;

    /**
     * Endpoint to create a new transaction.
     * The request JSON should contain:
     *  - userId (String)
     *  - merchantName (String) -> the company name the user enters
     *  - amount (numeric; parsed as BigDecimal)
     *  - date (ISO-8601 formatted string, e.g. "2025-03-26T14:00:00")
     *  - description (String)
     *
     * The category is NOT provided by the client. It is determined automatically
     * in the service based on the merchantName.
     */
    @PostMapping
    public ResponseEntity<Transaction> createTransaction(@RequestBody Map<String, Object> payload) {
        // Extract required fields from the JSON payload
        String userId = (String) payload.get("userId");
        String merchantName = (String) payload.get("merchantName");
        BigDecimal amount = new BigDecimal(payload.get("amount").toString());
        LocalDateTime date = LocalDateTime.parse((String) payload.get("date"));
        String description = (String) payload.get("description");

        // Build the Transaction object; note that category is not set by the client.
        Transaction transaction = new Transaction(userId, merchantName, amount, date, description);

        // The service layer will automatically set the category (via CategorizationService) before saving.
        Transaction savedTransaction = transactionService.addTransaction(transaction);

        return ResponseEntity.ok(savedTransaction);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Transaction>> getUserTransactions(@PathVariable String userId) {
        List<Transaction> transactions = transactionService.getTransactionsForUser(userId);
        return ResponseEntity.ok(transactions);
    }

    @GetMapping("/summary/{userId}")
    public ResponseEntity<Map<String, Object>> getSummary(@PathVariable String userId) {
        return ResponseEntity.ok(Map.of(
            "totalSpending", transactionService.calculateTotalSpending(userId),
            "totalsByCategory", transactionService.calculateTotalsByCategory(userId)
        ));
    }
}
