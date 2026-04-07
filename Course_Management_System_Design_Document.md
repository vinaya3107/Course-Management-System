# Course Management System – Design Document

## 1. Introduction

### 1.1 Purpose
The purpose of the **Course Management System (EduLearn)** is to bridge the gap between instructors and students by providing a unified, modern platform for educational delivery. Unlike traditional fragmented systems, EduLearn centralizes course creation, student enrollment, and progress tracking into a single, intuitive interface. It aims to reduce administrative overhead for instructors while providing students with a clear, distraction-free path to mastering Computer Science, Maths, and English.

### 1.2 Scope
The system is a premium full-stack web application designed to:
- **Centralize Learning**: Host diverse courses with rich descriptions.
- **Dynamic Enrollment**: Allow students to join courses and instructors to "claim" unassigned courses.
- **Role-Based Access**: Enforce strict permissions for Students, Instructors, and Administrators.
- **Progress Monitoring**: Enable real-time tracking of student completion percentages.
- **Assignment Management**: Facilitate the creation of tasks and the collection of student submissions.
- **Secure Integration**: Provide robust JWT-authenticated REST APIs for the React frontend.

## 2. System Overview

### 2.1 System Type
- Web-based application
- Client-Server Architecture

### 2.2 Technology Stack
| Layer | Technology |
| :--- | :--- |
| **Backend** | Spring Boot 4.x / Java 25 |
| **Frontend** | React (Vite-based) |
| **Styling** | Vanilla CSS + Tailwind CSS Utilities |
| **Database** | PostgreSQL |
| **ORM** | Spring Data JPA (Hibernate) |
| **Security** | Spring Security (JWT-based) |
| **Build Tool** | Maven |

## 3. Architecture Design

### 3.1 High-Level Architecture
```
Frontend (React UI)
        ↓
REST API (Spring Boot Controllers)
        ↓
Service Layer (Business Logic)
        ↓
Repository Layer (JPA)
        ↓
Database (PostgreSQL)
```

### 3.2 Layers Description

1.  **Controller Layer**: 
    - Handles HTTP requests and maps them to specific endpoints (e.g., `/courses`, `/auth`).
    - Validates incoming DTOs and handles response serialization.
    - Manages CORS headers and preflight requests.

2.  **Service Layer**: 
    - Contains the core business logic.
    - Implements rules such as "Instructor-Course Claiming" and progress normalization.
    - Handles transaction management using `@Transactional`.

3.  **Repository Layer**: 
    - Interfaces extending `JpaRepository` to abstract database interactions.
    - Handles complex queries like finding enrollments by student email.

4.  **Entity Layer**: 
    - Represents the database schema via Java classes.
    - Uses `@Lob` and `@Column(columnDefinition = "TEXT")` for handling large course descriptions.

## 4. Functional Requirements

### 4.1 User Management
- **Registration**: Support for multiple roles during signup.
- **Login**: Token-based authentication with auto-refresh (if implemented).
- **Roles**:
    - **Admin**: Full control over all users and courses.
    - **Instructor**: Create courses, manage assignments, claim ownership, and **view student submissions**.
    - **Student**: Enroll in courses, view materials, track progress, and **manage submission history**.

### 4.2 Course Management
- Add/Update/Delete courses.
- Support for long-form educational content in descriptions.
- Instructor assignment/claiming logic.
- **Cascade Deletion**: Full cleanup of related Assignments, Enrollments, and Submissions upon Course deletion.

### 4.3 Enrollment System
- Students can enroll in available courses.
- Real-time progress updates (0-100% range).

### 4.4 Assignment & Submissions
- Instructors assign tasks with due dates.
- Students submit work via secure file URLs.
- **Submission History**: Students can view and update their previous submissions for any assignment.
- **Submission Persistence**: Records are saved in the database and persist after server restarts.

## 5. Non-Functional Requirements
- **Aesthetics**: High-end UI with glassmorphism and modern typography (Inter/Outfit).
- **Performance**: Sub-second API response times and efficient Postgres indexing.
- **Security**: JWT stateless sessions and role-based path authorization.
- **Responsive**: Fully functional on Mobile, Tablet, and Desktop.

## 6. Database Design

### 6.1 Key Entities
- **User**: `id`, `name`, `email`, `password`, `role`.
- **Course**: `id`, `title`, `description` (TEXT), `instructor_id` (FK).
- **Enrollment**: `id`, `student_id` (FK), `course_id` (FK), `progress` (int).
- **Assignment**: `id`, `title`, `due_date`, `course_id` (FK).
- **Submission**: `id`, `assignment_id` (FK), `student_id` (FK), `file_url`.

### 6.2 Relationships
- **One User → Many Enrollments** (Students can have many courses).
- **One Instructor → Many Courses** (Instructors own multiple courses).
- **One Course → Many Assignments**.

## 7. API Design

### 7.1 Authentication APIs
- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me`

### 7.2 Course APIs
- `GET /courses`
- `POST /courses` (Admin/Instructor only)
- `PUT /courses/{id}`
- `DELETE /courses/{id}`
- `GET /courses/instructor/stats` (Aggregated real-time metrics)

### 7.3 Enrollment APIs
- `POST /enroll/{courseId}` (Student enrollment / Instructor claiming)
- `PUT /enroll/progress/{courseId}` (Progress update)
- `GET /enroll/my` (Fetch user-specific courses)

### 7.4 Assignment & Submission APIs
- `POST /assignments` (Create assignment - Instructor only)
- `GET /assignments/{courseId}` (Fetch assignments for a course)
- `POST /submissions/{assignmentId}` (Submit or Update work - Student only)
- `GET /submissions/{assignmentId}` (View all submissions - Instructor only)
- `GET /submissions/my/{assignmentId}` (Retrieve personal submission - Student only)

## 8. Business Logic Design

### 8.1 Course Claiming Flow
- If an `INSTRUCTOR` role user "enrolls" via the `/enroll/{id}` endpoint:
    - The backend updates the `Course.instructor` field to the current user.
    - No `Enrollment` record is created for the instructor.

### 8.2 Student Progress Flow
- Students update their progress slider on the dashboard.
- Backend saves the state to the `Enrollment` table, allowing persistence across sessions.

### 8.3 Assignment Workflow
1. Instructor creates an `Assignment` linked to a `Course`.
2. Student views the `Assignment` via a modal in "My Courses".
3. **History Fetch**: System retrieves the student's previous submission (if any).
4. **Submit/Update**: Student submits a `Submission` record. If one already exists, the `fileUrl` is updated instead of creating a duplicate.
5. **Instructor Review**: Instructors view a reactive list of all student submissions for their course assignments.

## 9. Security Design
- **Authentication**: Stateless JWT token passed in the `Authorization` header.
- **Authorization**: Role-based path filtering in `SecurityConfig`.
- **CORS**: Dynamic CORS configuration allowing specific frontend origins.

## 10. UI Design (Frontend)

### 10.1 Layout & Aesthetics
- **Theme**: Dark/Light mode support via `ThemeContext`.
- **Styling**: Modern "Glassmorphism" using semi-transparent backgrounds (`bg-slate-800/50`) and backdrop blurs.
- **Typography**: Clean sans-serif fonts with clear hierarchy (H1-H4).

### 10.2 Pages & Components
- **Home**: Hero section with animated gradients and platform statistics.
- **Course Catalog**: A grid of `CourseCard` components featuring hover-lift effects and category tags.
- **Dashboard**: Role-specific views. 
    - **Instructor (Manage Courses)**: "Assignments" overlay to manage tasks.
    - **Student (My Courses)**: "View Assignments" button to see tasks and submit URLs.
- **AssignmentModal**: A shared, multi-purpose modal for viewing, creating, and submitting coursework.

## 11. Error Handling
- **GlobalExceptionHandler**: Centralized controller advice to catch and format all exceptions into a consistent JSON structure (`message`, `type`).
- **403 Forbidden**: Custom handling for unauthorized role access.
- **Database Errors**: Catching unique constraint violations (e.g., duplicate emails) during registration.

## 12. Deployment Design
- **Backend**: Runs as a JAR file on port 8080.
- **Frontend**: Vite-built static assets served via a CDN or internal server.
- **Database**: PostgreSQL instance with automatic schema initialization via Hibernate.

## 13. Future Enhancements
- **Video Integration**: Direct hosting and streaming of course videos.
- **Quiz Engine**: Interactive automated testing for students.
- **Certificates**: Automated PDF generation upon 100% course completion.
- **Email Notifications**: Real-time alerts for assignment deadlines.

## 14. Conclusion
The Course Management System (EduLearn) is a state-of-the-art solution for modern education. Its modular design and robust technology stack make it both highly performant today and easily extensible for future educational needs.
