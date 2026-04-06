package com.example.CourseManagementBackend.service;

import com.example.CourseManagementBackend.dto.AuthResponse;
import com.example.CourseManagementBackend.dto.LoginRequest;
import com.example.CourseManagementBackend.dto.RegisterRequest;
import com.example.CourseManagementBackend.model.User;
import com.example.CourseManagementBackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()) != null) {
            throw new RuntimeException("Email already exists");
        }

        String role = request.getRole();
        if (role == null || role.isBlank()) {
            role = "STUDENT";
        }
        if (!role.equals("STUDENT") && !role.equals("INSTRUCTOR")) {
            throw new RuntimeException("Invalid role");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(role);

        userRepository.save(user);

        String token = jwtService.generateToken(user);
        AuthResponse response = new AuthResponse();
        response.setToken(token);
        response.setId(user.getId());
        response.setEmail(user.getEmail());
        response.setRole(user.getRole());
        response.setName(user.getName());
        return response;
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail());
        if (user == null || !passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = jwtService.generateToken(user);
        AuthResponse response = new AuthResponse();
        response.setToken(token);
        response.setId(user.getId());
        response.setEmail(user.getEmail());
        response.setRole(user.getRole());
        response.setName(user.getName());
        return response;
    }
}