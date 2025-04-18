package com.example.expensecategorizationapi.service;

import com.example.expensecategorizationapi.config.MongoConfig;
import com.example.expensecategorizationapi.model.Transaction;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.nio.charset.StandardCharsets;

@Service
public class TransactionService {

    public Transaction saveTransaction(String email, String merchant, String dateStr, double amount, String category, String description) {
        if (category == null || category.isEmpty()) {
            category = findCategoryFromCSV(merchant);
        }

        BigDecimal bdAmount = BigDecimal.valueOf(amount);
        LocalDateTime date = parseDate(dateStr);

        Transaction txn = new Transaction(null, email, merchant, bdAmount, date, description, category);

        MongoDatabase db = MongoConfig.connect();
        MongoCollection<Document> txns = db.getCollection("transactions");

        Document txnDoc = new Document("email", email)
                .append("merchantName", merchant)
                .append("amount", bdAmount)
                .append("date", date.toString())
                .append("description", description)
                .append("category", category);

        txns.insertOne(txnDoc);

        return txn;
    }

    public List<Transaction> getTransactionsByEmail(String email) {
        MongoDatabase db = MongoConfig.connect();
        MongoCollection<Document> txns = db.getCollection("transactions");

        List<Transaction> results = new ArrayList<>();
        for (Document doc : txns.find(new Document("email", email))) {
            Transaction txn = new Transaction(
                    null,
                    doc.getString("email"),
                    doc.getString("merchantName"),
                    new BigDecimal(doc.get("amount").toString()),
                    LocalDateTime.parse(doc.getString("date")),
                    doc.getString("description"),
                    doc.getString("category")
            );
            results.add(txn);
        }

        return results;
    }

    private String findCategoryFromCSV(String merchantName) {
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(
                getClass().getClassLoader().getResourceAsStream("final_cleaned_data.csv"), StandardCharsets.UTF_8))) {

            String line = reader.readLine(); // skip header
            while ((line = reader.readLine()) != null) {
                String[] parts = line.split(",", -1);  // -1 keeps trailing empty strings
                if (parts.length >= 3) {
                    String name = parts[0].trim().toLowerCase(Locale.ROOT);
                    if (!name.isEmpty() && merchantName.toLowerCase(Locale.ROOT).contains(name)) {
                        return parts[2].trim(); // return category
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "Uncategorized";
    }

    private LocalDateTime parseDate(String dateStr) {
        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm", Locale.ENGLISH);
            return LocalDateTime.parse(dateStr, formatter);
        } catch (Exception e) {
            e.printStackTrace();
            return LocalDateTime.now(); // fallback
        }
    }
}
