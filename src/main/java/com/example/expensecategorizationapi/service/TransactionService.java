package com.example.expensecategorizationapi.service;

import com.example.expensecategorizationapi.model.Transaction;
import com.example.expensecategorizationapi.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    public Transaction addTransaction(Transaction transaction) {
        // You could add validations here (e.g., check userId is valid, etc.)
        return transactionRepository.save(transaction);
    }

    public List<Transaction> getTransactionsForUser(String userId) {
        return transactionRepository.findByUserId(userId);
    }
}
