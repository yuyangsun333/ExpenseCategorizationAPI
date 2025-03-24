package com.example.expensecategorizationapi.repository;

import com.example.expensecategorizationapi.model.Transaction;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends MongoRepository<Transaction, String> {
    // Example custom method
    List<Transaction> findByUserId(String userId);
}
