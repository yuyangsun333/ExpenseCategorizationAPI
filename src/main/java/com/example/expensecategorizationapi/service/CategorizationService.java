package com.example.expensecategorizationapi.service;

import org.springframework.stereotype.Service;
import jakarta.annotation.PostConstruct;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

@Service
public class CategorizationService {

    private final Map<String, String> companyCategoryMap = new HashMap<>();

    @PostConstruct
    public void init() {
        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(
                        getClass().getClassLoader().getResourceAsStream("final_cleaned_data.csv"),
                        StandardCharsets.UTF_8))) {

            String line;
            reader.readLine(); // Skip header

            while ((line = reader.readLine()) != null) {
                String[] parts = line.split(",");
                if (parts.length >= 3) {
                    String company = parts[0].trim().toLowerCase();
                    String category = parts[2].trim();
                    companyCategoryMap.put(company, category);
                }
            }
            System.out.println("Loaded " + companyCategoryMap.size() + " companies");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public String findCategory(String merchantName) {
        if (merchantName == null || merchantName.isBlank()) return "Uncategorized";
        String lower = merchantName.toLowerCase();
        for (Map.Entry<String, String> entry : companyCategoryMap.entrySet()) {
            if (lower.contains(entry.getKey())) return entry.getValue();
        }
        return "Uncategorized";
    }
}
