package com.example.CourseManagementBackend.repository;

import com.example.CourseManagementBackend.model.Assignment;
import com.example.CourseManagementBackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
    List<Assignment> findByCourseId(Long courseId);
    long countByCourse_Instructor(User instructor);
}