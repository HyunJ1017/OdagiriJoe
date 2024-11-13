package edu.kh.plklj.common.config;

import java.io.FileInputStream;
import java.io.IOException;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.Bucket;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.cloud.StorageClient;

@Configuration
public class FireBaseConfig {

//    @Bean
//    public FirebaseApp firebaseApp() throws IOException {
//        FileInputStream serviceAccount = 
//            new FileInputStream("비공개 키 파일 경로");
//
//        FirebaseOptions options = FirebaseOptions.builder()
//            .setCredentials(GoogleCredentials.fromStream(serviceAccount))
//            .setStorageBucket("storage 주소")
//            .build();
//
//        FirebaseApp app = FirebaseApp.initializeApp(options);
//        return app;
//    }
//
//    @Bean
//    public FirebaseAuth firebaseAuth() throws IOException {
//        return FirebaseAuth.getInstance(firebaseApp());
//    }
//
//    @Bean
//    public Bucket bucket() throws IOException {
//        return StorageClient.getInstance(firebaseApp()).bucket();
//    }
}
