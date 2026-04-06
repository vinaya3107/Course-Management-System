import { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { coursesAPI } from '../services/api';

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [newCourse, setNewCourse] = useState({ title: '', description: '' });
  const [editingCourse, setEditingCourse] = useState(null);
  const [editCourseData, setEditCourseData] = useState({ title: '', description: '' });
  const { isDark } = useTheme();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await coursesAPI.getAll();
      setCourses(response.data);
    } catch (err) {
      setError('Unable to load courses.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await coursesAPI.create(newCourse);
      setSuccess('Course created successfully.');
      setNewCourse({ title: '', description: '' });
      fetchCourses();
    } catch (err) {
      setError('Failed to create course.');
    }
  };

  const handleEditClick = (course) => {
    setEditingCourse(course);
    setEditCourseData({ title: course.title, description: course.description });
    setSuccess('');
    setError('');
  };

  const handleUpdateCourse = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await coursesAPI.update(editingCourse.id, editCourseData);
      setSuccess('Course updated successfully.');
      setEditingCourse(null);
      setEditCourseData({ title: '', description: '' });
      fetchCourses();
    } catch (err) {
      setError('Failed to update course.');
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (!window.confirm('Delete this course?')) return;
    setError('');
    setSuccess('');

    try {
      await coursesAPI.delete(courseId);
      setSuccess('Course deleted successfully.');
      fetchCourses();
    } catch (err) {
      setError('Failed to delete course.');
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
    <div className={`min-h-screen py-24 ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className={`text-4xl font-bold mb-2 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
            Admin Dashboard
          </h1>
          <p className={`text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Manage all courses across the platform.
          </p>
        </div>

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

        <div className={`mb-8 p-6 rounded-3xl border ${isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-white/90 border-gray-200'}`}>
          <h2 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
            Create a New Course
          </h2>
          <form onSubmit={handleCreateCourse} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-300">Title</label>
              <input
                type="text"
                value={newCourse.title}
                onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-900/70 text-slate-100"
                placeholder="Course title"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-300">Description</label>
              <textarea
                value={newCourse.description}
                onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-900/70 text-slate-100"
                placeholder="Course description"
                rows={4}
                required
              />
            </div>
            <button type="submit" className="px-6 py-3 rounded-full bg-cyan-500 text-white font-semibold hover:bg-cyan-400 transition">
              Create Course
            </button>
          </form>
        </div>

        <div className="grid gap-6">
          {editingCourse && (
            <div className={`p-6 rounded-3xl border ${isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-white/90 border-gray-200'}`}>
              <h2 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                Edit Course
              </h2>
              <form onSubmit={handleUpdateCourse} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-300">Title</label>
                  <input
                    type="text"
                    value={editCourseData.title}
                    onChange={(e) => setEditCourseData({ ...editCourseData, title: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-900/70 text-slate-100"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-300">Description</label>
                  <textarea
                    value={editCourseData.description}
                    onChange={(e) => setEditCourseData({ ...editCourseData, description: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-900/70 text-slate-100"
                    rows={4}
                    required
                  />
                </div>
                <div className="flex gap-3">
                  <button type="submit" className="px-6 py-3 rounded-full bg-emerald-500 text-white hover:bg-emerald-400 transition">
                    Save Changes
                  </button>
                  <button type="button" className="px-6 py-3 rounded-full bg-slate-600 text-white hover:bg-slate-500 transition" onClick={() => setEditingCourse(null)}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className={`p-6 rounded-3xl border ${isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-white/90 border-gray-200'}`}>
            <h2 className={`text-2xl font-semibold mb-6 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
              All Courses
            </h2>
            <div className="space-y-4">
              {courses.map((course) => (
                <div key={course.id} className={`p-5 rounded-3xl border ${isDark ? 'border-slate-700 bg-slate-900/70' : 'border-gray-200 bg-gray-50'}`}>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                      <h3 className={`text-xl font-semibold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                        {course.title}
                      </h3>
                      <p className={`mt-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        {course.description}
                      </p>
                      <p className={`mt-3 text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        Instructor: {course.instructor?.name || 'Unassigned'}
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEditClick(course)}
                        className="px-4 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-400 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCourse(course.id)}
                        className="px-4 py-2 rounded-full bg-red-600 text-white hover:bg-red-500 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
