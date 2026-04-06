import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { coursesAPI } from '../services/api';
import CourseCard from '../components/CourseCard';
import Sidebar from '../components/Sidebar';
import AssignmentModal from '../components/AssignmentModal';

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { user } = useAuth();
  const { isDark } = useTheme();

  useEffect(() => {
    fetchCourses();
  }, [user]);

  const fetchCourses = async () => {
    try {
      const response = await coursesAPI.getAll();
      setCourses(response.data.filter(course => course.instructor?.id === user.id));
    } catch (err) {
      setError('Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await coursesAPI.create(formData);
      setSuccess('Course created successfully');
      setFormData({ title: '', description: '' });
      setShowCreateForm(false);
      fetchCourses();
    } catch (err) {
      setError('Failed to create course');
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      setError('');
      setSuccess('');
      try {
        await coursesAPI.delete(courseId);
        setSuccess('Course deleted successfully');
        fetchCourses();
      } catch (err) {
        setError('Failed to delete course');
      }
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <Sidebar />
      <div className="ml-64 p-8 pt-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className={`text-4xl font-bold mb-4 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
              Manage Courses
            </h1>
            <p className={`text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Create and manage your courses
            </p>
          </div>

          <button
            className="mb-8 px-6 py-3 rounded-full bg-cyan-500 text-white font-semibold hover:bg-cyan-400 transition"
            onClick={() => setShowCreateForm(!showCreateForm)}
          >
            {showCreateForm ? '❌ Cancel' : '➕ Create New Course'}
          </button>

          {success && (
            <div className="mb-6 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500 text-emerald-200">
              {success}
            </div>
          )}
          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500 text-red-200">
              {error}
            </div>
          )}

          {showCreateForm && (
            <div className={`mb-8 p-6 rounded-3xl border ${isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-white/90 border-gray-200'}`}>
              <form onSubmit={handleCreateCourse} className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Course Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'border-slate-700 bg-slate-900/70 text-slate-100' : 'border-gray-300 bg-gray-50 text-gray-900'}`}
                    placeholder="Enter course title"
                    required
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Course Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'border-slate-700 bg-slate-900/70 text-slate-100' : 'border-gray-300 bg-gray-50 text-gray-900'}`}
                    placeholder="Describe your course"
                    rows={4}
                    required
                  />
                </div>
                <button type="submit" className="px-6 py-3 rounded-full bg-cyan-500 text-white font-semibold hover:bg-cyan-400 transition">
                  🚀 Create Course
                </button>
              </form>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map(course => (
              <div key={course.id} className="relative group">
                <CourseCard course={course} />
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <button
                    onClick={() => {
                        setSelectedCourse(course);
                        setIsModalOpen(true);
                      }}
                    className="px-3 py-1 bg-cyan-600 text-white rounded hover:bg-cyan-700"
                  >
                    Assignments
                  </button>
                  <button
                    onClick={() => handleDeleteCourse(course.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <AssignmentModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            course={selectedCourse}
            user={user}
            isInstructor={user?.role === 'INSTRUCTOR'}
          />

          {courses.length === 0 && !showCreateForm && !loading && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📚</div>
              <h3 className={`text-2xl font-semibold mb-2 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                No courses created yet
              </h3>
              <p className={`${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Click "Create New Course" to get started
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageCourses;