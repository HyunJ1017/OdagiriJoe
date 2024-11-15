package edu.kh.plklj.common.config;

import java.io.IOException;
import java.io.InputStream;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.Bucket;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.cloud.StorageClient;

@Configuration
public class FireBaseConfig {

    @Bean
    public FirebaseApp firebaseApp() throws IOException {
    	 InputStream serviceAccount = new ClassPathResource("serviceAccountKey.json").getInputStream();

    	// Check if FirebaseApp is already initialized
         if (FirebaseApp.getApps().isEmpty()) {
        	 FirebaseOptions options = FirebaseOptions.builder()
        	            .setCredentials(GoogleCredentials.fromStream(serviceAccount))
        	            .setStorageBucket("odagirijoe-3e3a4.firebasestorage.app")
        	            .build();

        	        FirebaseApp app = FirebaseApp.initializeApp(options);
        	        return app;
         }
         return FirebaseApp.getInstance();
        
    }

    @Bean
    public FirebaseAuth firebaseAuth() throws IOException {
        return FirebaseAuth.getInstance(firebaseApp());
    }

    @Bean
    public Bucket bucket() throws IOException {
        return StorageClient.getInstance(firebaseApp()).bucket();
    }
    
}
