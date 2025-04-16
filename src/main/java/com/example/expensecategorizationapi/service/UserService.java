package com.example.expensecategorizationapi.service;

import com.example.expensecategorizationapi.config.MongoConfig;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;
import org.bson.Document;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    public boolean registerUser(String email, String password) {
        System.out.println("Registering user: " + email);

        MongoDatabase db = MongoConfig.connect();
        if (db == null) {
            System.out.println("DB connection failed.");
            return false;
        }

        MongoCollection<Document> users = db.getCollection("users");
        if (users == null) {
            System.out.println("Users collection not found.");
            return false;
        }

        Document existing = users.find(Filters.eq("email", email)).first();
        if (existing != null) {
            System.out.println("User already exists.");
            return false;
        }

        users.insertOne(new Document("email", email).append("password", password));
        System.out.println("User registered.");
        return true;
    }

    public boolean loginUser(String email, String password) {
        System.out.println("Logging in user: " + email);

        MongoDatabase db = MongoConfig.connect();
        if (db == null) {
            System.out.println("DB connection failed.");
            return false;
        }

        MongoCollection<Document> users = db.getCollection("users");
        if (users == null) {
            System.out.println("Users collection not found.");
            return false;
        }

        Document user = users.find(Filters.and(
                Filters.eq("email", email),
                Filters.eq("password", password)
        )).first();

        boolean found = user != null;
        System.out.println("Login " + (found ? "successful" : "failed"));
        return found;
    }
}
