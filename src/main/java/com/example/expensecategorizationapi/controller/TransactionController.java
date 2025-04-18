package com.example.expensecategorizationapi.controller;

import com.example.expensecategorizationapi.model.Transaction;
import com.example.expensecategorizationapi.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @PostMapping
    public ResponseEntity<Transaction> saveTransaction(@RequestBody Map<String, Object> request) {
        String email = (String) request.get("email");
        String merchant = (String) request.get("merchantName");
        double amount = Double.parseDouble(request.get("amount").toString());
        String date = (String) request.get("date");
        String description = (String) request.get("description");
        String category = (String) request.getOrDefault("category", "");

        Transaction txn = transactionService.saveTransaction(email, merchant, date, amount, category, description);
        return ResponseEntity.ok(txn);
    }

    @GetMapping("/{email}")
    public ResponseEntity<Object> getUserTransactions(@PathVariable String email) {
        return ResponseEntity.ok(transactionService.getTransactionsByEmail(email));
    }
}
