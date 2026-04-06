package com.example.CourseManagementBackend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "enrollments")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Enrollment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private User student;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    private int progress; // 0 to 100
}