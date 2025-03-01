package com.example.expensecategorizationapi.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.example.expensecategorizationapi.model.Transaction;

//public class TransactionRepository {
//}

@Repository
public interface TransactionRepository extends MongoRepository<Transaction, String> {
    // You can add custom query methods here if needed, e.g.:
    // List<Transaction> findByCategory(String category);
}

