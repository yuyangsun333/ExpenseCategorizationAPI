package com.example.expensecategorizationapi.config;

import com.mongodb.MongoClient;
import com.mongodb.MongoCredential;
import com.mongodb.client.MongoDatabase;

public class MongoConfig {
   public static MongoDatabase connect() {
      MongoClient mongoClient = new MongoClient("localhost", 27017);

      MongoCredential credential = MongoCredential.createCredential(
              "sampleUser", "expenseDb", "password".toCharArray()
      );

      System.out.println("Connected to MongoDB successfully");
      return mongoClient.getDatabase("expenseDb");
   }
}



//package com.example.expensecategorizationapi.config;
//
//import com.mongodb.MongoClient;
//import com.mongodb.MongoCredential;
//import com.mongodb.ServerAddress;
//import com.mongodb.client.MongoDatabase;
//
//import java.util.Collections;
//
//public class MongoConfig {
//
//   public static MongoDatabase connect() {
//      String user = "sampleUser";               // <- your MongoDB username
//      String database = "myDb";                 // <- your database name
//      char[] password = "password".toCharArray();  // <- your password
//
//      MongoCredential credential = MongoCredential.createCredential(user, database, password);
//      MongoClient mongoClient = new MongoClient(new ServerAddress("localhost", 27017), Collections.singletonList(credential));
//
//      return mongoClient.getDatabase(database);
//   }
//}


//package com.example.expensecategorizationapi.config;
//
//import com.mongodb.client.MongoDatabase;
//import com.mongodb.MongoClient;
//import com.mongodb.MongoCredential;
//public class MongoConfig {
//
//   public static void main( String args[] ) {
//
//      // Creating a Mongo client
//      MongoClient mongo = new MongoClient( "localhost" , 27017 );
//
//      // Creating Credentials
//      MongoCredential credential;
//      credential = MongoCredential.createCredential("sampleUser", "myDb",
//         "password".toCharArray());
//      System.out.println("Connected to the database successfully");
//
//      // Accessing the database
//      MongoDatabase database = mongo.getDatabase("myDb");
//      System.out.println("Credentials ::"+ credential);
//   }
//}