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

    @Autowired
    private CategorizationService categorizationService;

    public Transaction addTransaction(Transaction transaction) {
        // Automatically determine the category based on merchant name.
        String category = categorizationService.findCategory(transaction.getMerchantName());
        transaction.setCategory(category);
        return transactionRepository.save(transaction);
    }

    public List<Transaction> getTransactionsForUser(String userId) {
        return transactionRepository.findByUserId(userId);
    }

    public BigDecimal calculateTotalSpending(String userId) {
        List<Transaction> list = transactionRepository.findByUserId(userId);
        return list.stream()
                .map(Transaction::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    public Map<String, BigDecimal> calculateTotalsByCategory(String userId) {
        List<Transaction> list = transactionRepository.findByUserId(userId);
        Map<String, BigDecimal> totals = new HashMap<>();
        for (Transaction t : list) {
            String cat = t.getCategory();
            totals.put(cat, totals.getOrDefault(cat, BigDecimal.ZERO).add(t.getAmount()));
        }
        return totals;
    }
}
