package com.example.CourseManagementBackend.controller;

import com.example.CourseManagementBackend.model.Assignment;
import com.example.CourseManagementBackend.model.Course;
import com.example.CourseManagementBackend.repository.AssignmentRepository;
import com.example.CourseManagementBackend.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/assignments")
@Transactional
public class AssignmentController {

    @Autowired
    private AssignmentRepository assignmentRepo;

    @Autowired
    private CourseRepository courseRepo;

    @PostMapping
    @PreAuthorize("hasRole('INSTRUCTOR')")
    public ResponseEntity<Assignment> createAssignment(@RequestBody Assignment assignment) {
        // Assume courseId is in assignment
        Course course = courseRepo.findById(assignment.getCourse().getId()).orElseThrow();
        assignment.setCourse(course);
        return ResponseEntity.ok(assignmentRepo.save(assignment));
    }

    @GetMapping("/{courseId}")
    public List<Assignment> getAssignmentsByCourse(@PathVariable Long courseId) {
        return assignmentRepo.findByCourseId(courseId);
    }
}