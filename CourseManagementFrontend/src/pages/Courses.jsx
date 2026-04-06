import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { coursesAPI, enrollmentAPI } from '../services/api';
import CourseCard from '../components/CourseCard';
import Sidebar from '../components/Sidebar';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const { isDark } = useTheme();

  useEffect(() => {
    fetchCourses();
    if (user?.role === 'STUDENT') {
      fetchEnrolledCourses();
    }
  }, [user]);

  const fetchCourses = async () => {
    try {
      const response = await coursesAPI.getAll();
      setCourses(response.data);
    } catch (err) {
      setError('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const fetchEnrolledCourses = async () => {
    try {
      const response = await enrollmentAPI.getMyEnrollments();
      setEnrolledCourses(response.data.map(e => e.courseId));
    } catch (err) {
      console.error('Failed to load enrolled courses:', err);
    }
  };

  const handleEnroll = (courseId) => {
    if (user?.role === 'INSTRUCTOR') {
      fetchCourses();
    } else {
      setEnrolledCourses([...enrolledCourses, courseId]);
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDark ? 'bg-slate-900' : 'bg-slate-50'
      }`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${
      isDark ? 'bg-slate-900' : 'bg-slate-50'
    }`}>
      <Sidebar />
      <div className="ml-64 p-8 pt-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className={`text-4xl font-bold mb-4 ${
              isDark ? 'text-slate-100' : 'text-slate-900'
            }`}>
              All Courses
            </h1>
            <p className={`text-lg ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Discover and enroll in courses to enhance your skills
            </p>
          </div>

          {error && (
            <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-red-400">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onEnroll={handleEnroll}
                isEnrolled={
                  user?.role === 'INSTRUCTOR' 
                    ? course.instructor?.id === user.id 
                    : enrolledCourses.includes(course.id)
                }
              />
            ))}
          </div>

          {courses.length === 0 && !loading && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📚</div>
              <h3 className={`text-2xl font-semibold mb-2 ${
                isDark ? 'text-slate-100' : 'text-slate-900'
              }`}>
                No courses available
              </h3>
              <p className={`${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}>
                Check back later for new courses
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;