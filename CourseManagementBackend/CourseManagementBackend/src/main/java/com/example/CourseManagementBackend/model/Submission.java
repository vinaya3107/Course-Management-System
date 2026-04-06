package com.example.CourseManagementBackend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Submission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "assignment_id")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Assignment assignment;

    @ManyToOne
    @JoinColumn(name = "student_id")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private User student;

    private String fileUrl;
}