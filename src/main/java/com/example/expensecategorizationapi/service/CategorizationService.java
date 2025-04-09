package com.example.expensecategorizationapi.service;

import org.springframework.stereotype.Service;
//
import javax.annotation.PostConstruct;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

@Service
public class CategorizationService {

    // Map of company name (lowercase) to category
    private final Map<String, String> companyCategoryMap = new HashMap<>();

    @PostConstruct
    public void init() {
        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(
                        getClass().getResourceAsStream("/data_clean/company_list.csv"),
                        StandardCharsets.UTF_8)
        )) {
            String line;
            // If your CSV has a header line, uncomment the next line:
            // reader.readLine(); // Skip header

            while ((line = reader.readLine()) != null) {
                // Assuming CSV columns: name,industry,category
                String[] parts = line.split(",");
                if (parts.length >= 3) {
                    String companyName = parts[0].trim();
                    String category = parts[2].trim();
                    // Store mapping with the company name in lowercase.
                    companyCategoryMap.put(companyName.toLowerCase(), category);
                }
            }
            System.out.println("CategorizationService: Loaded " + companyCategoryMap.size() + " company mappings.");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Performs a partial match on the provided merchant name to determine the category.
     *
     * @param merchantName The company name provided by the user.
     * @return The corresponding category if a match is found; otherwise, "Misc".
     */
    public String findCategory(String merchantName) {
        if (merchantName == null || merchantName.isBlank()) {
            return "Misc";
        }
        String lowerCaseInput = merchantName.toLowerCase();

        // Iterate through the known companies; perform partial matching.
        // If the input contains the key (the CSV company name), return the associated category.
        for (Map.Entry<String, String> entry : companyCategoryMap.entrySet()) {
            if (lowerCaseInput.contains(entry.getKey())) {
                return entry.getValue();
            }
        }
        // If no match is found, return default category.
        return "Misc";
    }
}
