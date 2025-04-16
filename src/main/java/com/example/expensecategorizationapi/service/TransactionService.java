package com.example.expensecategorizationapi.service;

import com.example.expensecategorizationapi.config.MongoConfig;
import com.example.expensecategorizationapi.model.Transaction;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class TransactionService {

    public Transaction saveTransaction(String email, String merchant, String date, double amount, String category, String description) {
        MongoDatabase db = MongoConfig.connect();
        MongoCollection<Document> txns = db.getCollection("transactions");

        Document txnDoc = new Document("email", email)
                .append("merchant", merchant)
                .append("amount", amount)
                .append("date", date)
                .append("category", category)
                .append("description", description);

        txns.insertOne(txnDoc);

        Transaction txn = new Transaction();
        txn.setEmail(email);
        txn.setMerchant(merchant);
        txn.setAmount(BigDecimal.valueOf(amount));
        txn.setDate(date);
        txn.setDescription(description);
        txn.setCategory(category);
        return txn;
    }

    public List<Transaction> getTransactionsByEmail(String email) {
        MongoDatabase db = MongoConfig.connect();
        MongoCollection<Document> txns = db.getCollection("transactions");

        List<Transaction> transactions = new ArrayList<>();
        for (Document doc : txns.find(new Document("email", email))) {
            Transaction txn = new Transaction();
            txn.setEmail(doc.getString("email"));
            txn.setMerchant(doc.getString("merchant"));
            txn.setAmount(BigDecimal.valueOf(doc.getDouble("amount")));
            txn.setDate(doc.getString("date"));
            txn.setDescription(doc.getString("description"));
            txn.setCategory(doc.getString("category"));
            transactions.add(txn);
        }
        return transactions;
    }
}
