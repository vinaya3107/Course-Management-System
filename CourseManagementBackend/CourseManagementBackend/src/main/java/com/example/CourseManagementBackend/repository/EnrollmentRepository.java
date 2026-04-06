package com.example.CourseManagementBackend.repository;

import com.example.CourseManagementBackend.model.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    List<Enrollment> findByStudent(User student);
    boolean existsByStudentAndCourse(User student, Course course);
}