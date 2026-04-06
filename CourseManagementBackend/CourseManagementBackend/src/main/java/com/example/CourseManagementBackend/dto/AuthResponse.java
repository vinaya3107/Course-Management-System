package com.example.CourseManagementBackend.dto;

import lombok.Data;

@Data
public class AuthResponse {
    private String token;
    private Long id;
    private String name;
    private String email;
    private String role;
}