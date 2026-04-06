import React, { useState, useEffect } from 'react';
import { courseService } from '../services/courseService';
import { useAuth } from '../context/AuthContextProvider';
import CourseCard from '../components/CourseCard';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const data = await courseService.getAllCourses();
      setCourses(data);
    } catch (err) {
      console.error('Failed to fetch courses', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async (courseId) => {
    try {
      await courseService.enrollInCourse(courseId);
      alert('Enrolled successfully!');
      // Optionally refresh courses or update state
    } catch (err) {
      alert('Enrollment failed: ' + err.response?.data?.message || 'Unknown error');
    }
  };

  if (loading) return (
    <div className="loading">
      <div>Loading courses...</div>
    </div>
  );

  return (
    <>
      <section className="hero-section">
        <h1>Welcome to EduLearn</h1>
        <p>Discover amazing courses and advance your learning journey with our expert instructors</p>
      </section>

      <div className="course-list">
        <div className="page-header">
          <h2>Explore Our Courses</h2>
          <p>Choose from our wide range of courses designed to help you succeed</p>
        </div>

        <div className="courses-grid">
          {courses.map(course => (
            <CourseCard
              key={course.id}
              course={course}
              onEnroll={handleEnroll}
              isInstructor={user?.role === 'INSTRUCTOR'}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default CourseList;