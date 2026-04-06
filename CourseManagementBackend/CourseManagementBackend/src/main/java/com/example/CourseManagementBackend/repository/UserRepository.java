package com.example.CourseManagementBackend.repository;

import com.example.CourseManagementBackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}