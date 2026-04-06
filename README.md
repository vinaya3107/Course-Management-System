# EduLearn - Course Management System

EduLearn is a modern, full-stack learning management platform designed for seamless interaction between students and instructors. Built with a focus on visual excellence and robust functionality, it provides a premium experience for online education.

## 🚀 Key Features

- **Role-Based Dashboards**: Tailored experiences for Students, Instructors, and Administrators.
- **Course Management**: Instructors can create original courses or "claim" unassigned ones to begin teaching.
- **Assignment System**: 
    - Instructors create tasks with detailed instructions and due dates.
    - Students submit their work via cloud links (GitHub, Drive, etc.).
- **Progress Tracking**: Students can update and monitor their learning progress through an intuitive slider interface.
- **Modern UI/UX**: Includes a dark/light mode toggle, glassmorphism aesthetics, and smooth animations powered by Tailwind CSS.
- **Secure Authentication**: Stateless JWT-based security with normalized role-based access control.

## 🛠️ Technology Stack

### Backend
- **Framework**: Spring Boot 3
- **Security**: Spring Security (JWT)
- **Database**: PostgreSQL / H2
- **ORM**: Spring Data JPA
- **Language**: Java 17+

### Frontend
- **Framework**: React 18 (Vite)
- **Styling**: Tailwind CSS (Vanilla CSS Customizations)
- **State Management**: React Context API
- **Networking**: Axios

## ⚙️ Setup & Installation

### Backend
1. Navigate to `CourseManagementBackend/CourseManagementBackend`.
2. Ensure your PostgreSQL database is running (or use the default H2 configuration).
3. Run the application:
   ```bash
   mvn clean spring-boot:run
   ```
4. Access the API at `http://localhost:8080`.

### Frontend
1. Navigate to `CourseManagementFrontend`.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Access the portal at `http://localhost:5173`.

---

## 👥 Default Credentials (Demo)

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@edulearn.com` | `Admin@123` |
| **Instructor** | `instructor@edulearn.com` | `Instructor@123` |
| **Student** | `student@edulearn.com` | `Student@123` |

---

Developed with ❤️ as a comprehensive Course Management Solution.
