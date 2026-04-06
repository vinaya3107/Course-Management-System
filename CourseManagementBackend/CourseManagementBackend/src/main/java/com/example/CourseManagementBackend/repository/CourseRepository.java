package com.example.CourseManagementBackend.repository;

import com.example.CourseManagementBackend.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Long> {
}