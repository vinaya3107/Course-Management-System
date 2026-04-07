package com.example.CourseManagementBackend.repository;

import com.example.CourseManagementBackend.model.Submission;
import com.example.CourseManagementBackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface SubmissionRepository extends JpaRepository<Submission, Long> {
    List<Submission> findByAssignmentId(Long assignmentId);
    List<Submission> findByStudentId(Long studentId);
    Optional<Submission> findByAssignmentIdAndStudent(Long assignmentId, User student);
}