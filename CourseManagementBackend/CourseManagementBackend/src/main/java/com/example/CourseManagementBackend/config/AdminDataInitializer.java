package com.example.CourseManagementBackend.config;

import com.example.CourseManagementBackend.model.User;
import com.example.CourseManagementBackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AdminDataInitializer implements ApplicationRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(ApplicationArguments args) {
        String adminEmail = System.getenv().getOrDefault("ADMIN_EMAIL", "admin@edulearn.com");
        String adminPassword = System.getenv().getOrDefault("ADMIN_PASSWORD", "Admin@123");

        if (userRepository.findByEmail(adminEmail) == null) {
            User admin = new User();
            admin.setName("Administrator");
            admin.setEmail(adminEmail);
            admin.setPassword(passwordEncoder.encode(adminPassword));
            admin.setRole("ADMIN");
            userRepository.save(admin);
            System.out.println("Created default admin user: " + adminEmail);
        }
    }
}
