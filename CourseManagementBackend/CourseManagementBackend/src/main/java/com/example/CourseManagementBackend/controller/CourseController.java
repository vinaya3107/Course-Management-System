package com.example.CourseManagementBackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.example.CourseManagementBackend.repository.CourseRepository;
import com.example.CourseManagementBackend.repository.UserRepository;

import com.example.CourseManagementBackend.model.Course;
import com.example.CourseManagementBackend.model.User;

import java.util.List;

@RestController
@RequestMapping("/courses")
public class CourseController {

    @Autowired
    private CourseRepository courseRepo;

    @Autowired
    private UserRepository userRepo;

    @PostMapping
    @PreAuthorize("hasAnyRole('INSTRUCTOR','ADMIN')")
    public ResponseEntity<Course> createCourse(@RequestBody Course course) {
        try {
            User currentUser = getCurrentUser();
            if ("INSTRUCTOR".equals(currentUser.getRole())) {
                course.setInstructor(currentUser);
            }
            return ResponseEntity.ok(courseRepo.save(course));
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

    @GetMapping
    public List<Course> getAllCourses() {
        return courseRepo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable Long id) {
        Course course = courseRepo.findById(id).orElseThrow();
        return ResponseEntity.ok(course);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('INSTRUCTOR','ADMIN')")
    public ResponseEntity<Course> updateCourse(@PathVariable Long id, @RequestBody Course courseDetails) {
        Course course = courseRepo.findById(id).orElseThrow();
        User currentUser = getCurrentUser();
        if ("INSTRUCTOR".equals(currentUser.getRole()) &&
                (course.getInstructor() == null || !course.getInstructor().getId().equals(currentUser.getId()))) {
            return ResponseEntity.status(403).build();
        }
        course.setTitle(courseDetails.getTitle());
        course.setDescription(courseDetails.getDescription());
        return ResponseEntity.ok(courseRepo.save(course));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('INSTRUCTOR','ADMIN')")
    public ResponseEntity<Void> deleteCourse(@PathVariable Long id) {
        Course course = courseRepo.findById(id).orElseThrow();
        User currentUser = getCurrentUser();
        if ("INSTRUCTOR".equals(currentUser.getRole()) &&
                (course.getInstructor() == null || !course.getInstructor().getId().equals(currentUser.getId()))) {
            return ResponseEntity.status(403).build();
        }
        courseRepo.delete(course);
        return ResponseEntity.noContent().build();
    }

    private User getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        return userRepo.findByEmail(email);
    }
}
