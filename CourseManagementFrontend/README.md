# EduLearn - Course Management System

A modern, production-ready frontend for a Course Management System built with React, Vite, and Tailwind CSS.

## 🚀 Features

### Authentication System
- User registration and login
- JWT token management
- Role-based access (Student/Instructor)
- Protected routes

### Student Features
- Browse available courses
- Enroll in courses
- Track learning progress
- View enrolled courses

### Instructor Features
- Create and manage courses
- Dashboard with statistics
- Course management interface

### UI/UX
- Dark/Light theme toggle
- Modern glassmorphism design
- Responsive layout
- Smooth animations and transitions
- Loading states and error handling

## 🛠️ Tech Stack

- **React 19** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Router DOM** - Routing
- **Context API** - State management

## 🎨 Design System

### Dark Theme (Default)
- Background: `#020617`
- Surface: `#0F172A`
- Primary: `#7C3AED`
- Secondary: `#22D3EE`
- Accent: `#F97316`
- Highlight: `#EC4899`
- Text: `#E2E8F0`

### Light Theme
- Background: `#F8FAFC`
- Surface: `#FFFFFF`
- Primary: `#4F46E5`
- Secondary: `#06B6D4`
- Accent: `#F59E0B`
- Highlight: `#EC4899`
- Text: `#0F172A`

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── Sidebar.jsx
│   ├── CourseCard.jsx
│   ├── ProgressBar.jsx
│   └── ThemeToggle.jsx
├── pages/
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Courses.jsx
│   ├── MyCourses.jsx
│   └── Dashboard.jsx
├── services/
│   └── api.js
├── context/
│   ├── AuthContext.jsx
│   ├── AuthContextProvider.jsx
│   └── ThemeContext.jsx
├── App.jsx
├── main.jsx
└── index.css
```

## 🔧 Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## 🌐 API Integration

The application expects a backend API running on `http://localhost:8082` with the following endpoints:

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /auth/me` - Get current user info

### Courses
- `GET /courses` - Get all courses
- `GET /courses/{id}` - Get course by ID
- `POST /courses` - Create course (Instructor only)
- `PUT /courses/{id}` - Update course
- `DELETE /courses/{id}` - Delete course

### Enrollment
- `POST /enroll/{courseId}` - Enroll in course
- `GET /enroll/my` - Get user's enrollments
- `PUT /enroll/progress/{courseId}?progress={number}` - Update progress

### Assignments
- `POST /assignments` - Create assignment
- `GET /assignments/{courseId}` - Get assignments by course

### Submissions
- `POST /submissions/{assignmentId}` - Submit assignment
- `GET /submissions/{assignmentId}` - Get submissions

## 🎯 Routes

- `/` - Home page
- `/login` - Login page
- `/register` - Registration page
- `/courses` - All courses (protected)
- `/my-courses` - My enrolled courses (students only)
- `/dashboard` - Instructor dashboard (instructors only)

## 🔐 Authentication

The app uses JWT tokens stored in localStorage. Axios interceptors automatically attach the token to requests and handle token expiration by redirecting to login.

## 🎨 Theming

Theme preference is stored in localStorage and persists across sessions. The app starts with dark theme by default.

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile devices

## 🚀 Production Ready

- Optimized build with Vite
- Code splitting
- Asset optimization
- Error boundaries
- Loading states
- Clean, maintainable code

## 📄 License

This project is for educational purposes.
