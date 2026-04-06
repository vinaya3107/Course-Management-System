package com.example.CourseManagementBackend.controller;

import com.example.CourseManagementBackend.model.Assignment;
import com.example.CourseManagementBackend.model.Submission;
import com.example.CourseManagementBackend.model.User;
import com.example.CourseManagementBackend.repository.AssignmentRepository;
import com.example.CourseManagementBackend.repository.SubmissionRepository;
import com.example.CourseManagementBackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RestController
@RequestMapping("/submissions")
@Transactional
public class SubmissionController {

    @Autowired
    private SubmissionRepository submissionRepo;

    @Autowired
    private AssignmentRepository assignmentRepo;

    @Autowired
    private UserRepository userRepo;

    @PostMapping("/{assignmentId}")
    public ResponseEntity<Submission> submitAssignment(@PathVariable Long assignmentId, @RequestBody Submission submission) {
        User student = getCurrentUser();
        Assignment assignment = assignmentRepo.findById(assignmentId).orElseThrow();

        submission.setStudent(student);
        submission.setAssignment(assignment);

        return ResponseEntity.ok(submissionRepo.save(submission));
    }

    @GetMapping("/{assignmentId}")
    public List<Submission> getSubmissionsByAssignment(@PathVariable Long assignmentId) {
        return submissionRepo.findByAssignmentId(assignmentId);
    }

    private User getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        return userRepo.findByEmail(email);
    }
}