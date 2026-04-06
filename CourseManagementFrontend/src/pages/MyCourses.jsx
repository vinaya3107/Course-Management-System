import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { enrollmentAPI } from '../services/api';
import CourseCard from '../components/CourseCard';
import Sidebar from '../components/Sidebar';
import AssignmentModal from '../components/AssignmentModal';

const MyCourses = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user } = useAuth();
  const { isDark } = useTheme();

  useEffect(() => {
    if (user?.role === 'STUDENT') {
      fetchMyCourses();
    }
  }, [user]);

  const fetchMyCourses = async () => {
    try {
      const response = await enrollmentAPI.getMyEnrollments();
      setEnrollments(response.data);
    } catch (err) {
      setError('Failed to load your courses');
    } finally {
      setLoading(false);
    }
  };

  const handleProgressUpdate = (courseId, progress) => {
    setEnrollments(enrollments.map(enrollment =>
      enrollment.courseId === courseId
        ? { ...enrollment, progress }
        : enrollment
    ));
  };

  if (user?.role !== 'STUDENT') {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDark ? 'bg-slate-900' : 'bg-slate-50'
      }`}>
        <div className="text-center">
          <h2 className={`text-2xl font-bold mb-4 ${
            isDark ? 'text-slate-100' : 'text-slate-900'
          }`}>
            Access Denied
          </h2>
          <p className={`${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            This page is only available for students
          </p>
        </div>
      </div>
    );
  }

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
              My Courses
            </h1>
            <p className={`text-lg ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Track your learning progress and continue your courses
            </p>
          </div>

          {error && (
            <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-red-400">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {enrollments.map((enrollment) => (
              <CourseCard
                key={enrollment.courseId}
                course={{
                  ...enrollment.course,
                  progress: enrollment.progress
                }}
                showProgress={true}
                onUpdateProgress={handleProgressUpdate}
                onViewAssignments={(c) => {
                  setSelectedCourse(c);
                  setIsModalOpen(true);
                }}
                isEnrolled={true}
              />
            ))}
          </div>

          <AssignmentModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            course={selectedCourse}
            user={user}
            isInstructor={false}
          />

          {enrollments.length === 0 && !loading && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎓</div>
              <h3 className={`text-2xl font-semibold mb-2 ${
                isDark ? 'text-slate-100' : 'text-slate-900'
              }`}>
                No enrolled courses yet
              </h3>
              <p className={`mb-6 ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}>
                Browse available courses and start your learning journey
              </p>
              <a
                href="/courses"
                className={`inline-flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200 bg-gradient-to-r ${
                  isDark ? 'from-violet-600 to-cyan-600' : 'from-indigo-500 to-cyan-500'
                } hover:from-violet-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl`}
              >
                Browse Courses
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyCourses;