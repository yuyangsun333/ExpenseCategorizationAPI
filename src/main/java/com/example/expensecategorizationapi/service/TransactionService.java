package com.example.expensecategorizationapi.service;

import com.example.expensecategorizationapi.model.Transaction;
import com.example.expensecategorizationapi.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    // Save a transaction
    public Transaction addTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    // Get all transactions for a particular user
    public List<Transaction> getTransactionsForUser(String userId) {
        return transactionRepository.findByUserId(userId);
    }

    // Compute total spending for the user
    public BigDecimal calculateTotalSpending(String userId) {
        List<Transaction> transactions = transactionRepository.findByUserId(userId);
        BigDecimal total = BigDecimal.ZERO;
        for (Transaction tx : transactions) {
            total = total.add(tx.getAmount());
        }
        return total;
    }

    // Compute spending totals for each category for the user
    public Map<String, BigDecimal> calculateTotalsByCategory(String userId) {
        List<Transaction> transactions = transactionRepository.findByUserId(userId);
        Map<String, BigDecimal> totalsByCategory = new HashMap<>();
        for (Transaction tx : transactions) {
            String category = tx.getCategory();
            BigDecimal currentTotal = totalsByCategory.getOrDefault(category, BigDecimal.ZERO);
            totalsByCategory.put(category, currentTotal.add(tx.getAmount()));
        }
        return totalsByCategory;
    }
}
