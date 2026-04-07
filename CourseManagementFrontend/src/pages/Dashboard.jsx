import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { coursesAPI, assignmentsAPI } from '../services/api';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalAssignments: 0,
    totalEnrollments: 0
  });
  const [recentCourses, setRecentCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const { isDark } = useTheme();

  useEffect(() => {
    if (user?.role === 'INSTRUCTOR') {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      const [coursesResponse, statsResponse] = await Promise.all([
        coursesAPI.getAll(),
        coursesAPI.getInstructorStats()
      ]);

      const instructorCourses = coursesResponse.data.filter(course =>
        course.instructor?.id === user.id || course.instructorId === user.id
      );

      setStats(statsResponse.data);
      setRecentCourses(instructorCourses.slice(0, 5));
    } catch (err) {
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (user?.role !== 'INSTRUCTOR') {
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
            This page is only available for instructors
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
              Instructor Dashboard
            </h1>
            <p className={`text-lg ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Manage your courses and track student engagement
            </p>
          </div>

          {error && (
            <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-red-400">{error}</p>
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className={`p-6 rounded-xl backdrop-blur-sm border ${
              isDark
                ? 'bg-slate-800/50 border-slate-700 shadow-lg shadow-slate-900/50'
                : 'bg-white/50 border-gray-200 shadow-lg shadow-gray-200/50'
            }`}>
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${
                  isDark ? 'bg-violet-600/20' : 'bg-indigo-100'
                }`}>
                  <span className="text-2xl">📚</span>
                </div>
                <div className="ml-4">
                  <h3 className={`text-2xl font-bold ${
                    isDark ? 'text-slate-100' : 'text-slate-900'
                  }`}>
                    {stats.totalCourses}
                  </h3>
                  <p className={`text-sm ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    Total Courses
                  </p>
                </div>
              </div>
            </div>

            <div className={`p-6 rounded-xl backdrop-blur-sm border ${
              isDark
                ? 'bg-slate-800/50 border-slate-700 shadow-lg shadow-slate-900/50'
                : 'bg-white/50 border-gray-200 shadow-lg shadow-gray-200/50'
            }`}>
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${
                  isDark ? 'bg-cyan-600/20' : 'bg-cyan-100'
                }`}>
                  <span className="text-2xl">📝</span>
                </div>
                <div className="ml-4">
                  <h3 className={`text-2xl font-bold ${
                    isDark ? 'text-slate-100' : 'text-slate-900'
                  }`}>
                    {stats.totalAssignments}
                  </h3>
                  <p className={`text-sm ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    Assignments Created
                  </p>
                </div>
              </div>
            </div>

            <div className={`p-6 rounded-xl backdrop-blur-sm border ${
              isDark
                ? 'bg-slate-800/50 border-slate-700 shadow-lg shadow-slate-900/50'
                : 'bg-white/50 border-gray-200 shadow-lg shadow-gray-200/50'
            }`}>
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${
                  isDark ? 'bg-orange-600/20' : 'bg-orange-100'
                }`}>
                  <span className="text-2xl">👥</span>
                </div>
                <div className="ml-4">
                  <h3 className={`text-2xl font-bold ${
                    isDark ? 'text-slate-100' : 'text-slate-900'
                  }`}>
                    {stats.totalEnrollments}
                  </h3>
                  <p className={`text-sm ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    Student Enrollments
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Courses */}
          <div className={`p-6 rounded-xl backdrop-blur-sm border ${
            isDark
              ? 'bg-slate-800/50 border-slate-700 shadow-lg shadow-slate-900/50'
              : 'bg-white/50 border-gray-200 shadow-lg shadow-gray-200/50'
          }`}>
            <h2 className={`text-2xl font-bold mb-6 ${
              isDark ? 'text-slate-100' : 'text-slate-900'
            }`}>
              Recent Courses
            </h2>

            {recentCourses.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">📚</div>
                <p className={`${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  No courses created yet
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentCourses.map((course) => (
                  <div key={course.id} className={`p-4 rounded-lg border ${
                    isDark ? 'border-slate-700 bg-slate-700/50' : 'border-gray-200 bg-gray-50/50'
                  }`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className={`font-semibold ${
                          isDark ? 'text-slate-100' : 'text-slate-900'
                        }`}>
                          {course.title}
                        </h3>
                        <p className={`text-sm mt-1 ${
                          isDark ? 'text-slate-400' : 'text-slate-600'
                        }`}>
                          {course.description}
                        </p>
                      </div>
                      <div className={`text-sm px-2 py-1 rounded ${
                        isDark ? 'bg-cyan-600/20 text-cyan-400' : 'bg-cyan-100 text-cyan-700'
                      }`}>
                        {course.enrollmentCount || 0} enrolled
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;