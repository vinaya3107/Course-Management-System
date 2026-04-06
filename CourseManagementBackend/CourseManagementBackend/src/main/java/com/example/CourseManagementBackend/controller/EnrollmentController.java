package com.example.CourseManagementBackend.controller;

import com.example.CourseManagementBackend.model.*;
import com.example.CourseManagementBackend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/enroll")
@Transactional
public class EnrollmentController {

    @Autowired
    private EnrollmentRepository enrollmentRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private CourseRepository courseRepo;

    @PostMapping("/{courseId}")
    public ResponseEntity<?> enroll(@PathVariable Long courseId) {
        User user = getCurrentUser();
        Course course = courseRepo.findById(courseId).orElseThrow(() -> new RuntimeException("Course not found"));

        if ("INSTRUCTOR".equals(user.getRole())) {
            course.setInstructor(user);
            return ResponseEntity.ok(courseRepo.save(course));
        }

        if (enrollmentRepo.existsByStudentAndCourse(user, course)) {
            throw new RuntimeException("Already enrolled");
        }

        Enrollment enrollment = new Enrollment();
        enrollment.setStudent(user);
        enrollment.setCourse(course);
        enrollment.setProgress(0);

        return ResponseEntity.ok(enrollmentRepo.save(enrollment));
    }

    @GetMapping("/my")
    public List<Enrollment> myCourses() {
        User student = getCurrentUser();
        return enrollmentRepo.findByStudent(student);
    }

    @PutMapping("/progress/{courseId}")
    public ResponseEntity<Enrollment> updateProgress(@PathVariable Long courseId, @RequestParam int progress) {
        User student = getCurrentUser();
        Course course = courseRepo.findById(courseId).orElseThrow();
        Enrollment enrollment = enrollmentRepo.findByStudent(student).stream()
                .filter(e -> e.getCourse().getId().equals(courseId))
                .findFirst().orElseThrow(() -> new RuntimeException("Not enrolled"));
        enrollment.setProgress(progress);
        return ResponseEntity.ok(enrollmentRepo.save(enrollment));
    }

    private User getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        return userRepo.findByEmail(email);
    }
}