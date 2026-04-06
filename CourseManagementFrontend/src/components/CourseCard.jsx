import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { enrollmentAPI } from '../services/api';

const CourseCard = ({ course, onEnroll, isEnrolled = false, showProgress = false, onUpdateProgress, onViewAssignments }) => {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(course.progress || 0);

  const handleEnroll = async () => {
    if (!user) return;

    setLoading(true);
    setError('');
    try {
      await enrollmentAPI.enroll(course.id);
      onEnroll && onEnroll(course.id);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to enroll');
    } finally {
      setLoading(false);
    }
  };

  const handleProgressChange = async (e) => {
    const newProgress = parseInt(e.target.value);
    setProgress(newProgress);

    try {
      await enrollmentAPI.updateProgress(course.id, newProgress);
      onUpdateProgress && onUpdateProgress(course.id, newProgress);
    } catch (err) {
      console.error('Failed to update progress:', err);
    }
  };

  return (
    <div className={`rounded-xl overflow-hidden backdrop-blur-sm border transition-all duration-300 hover:scale-105 ${
      isDark
        ? 'bg-slate-800/50 border-slate-700 shadow-lg shadow-slate-900/50'
        : 'bg-white/50 border-gray-200 shadow-lg shadow-gray-200/50'
    }`}>
      {/* Course Image Placeholder */}
      <div className={`h-48 ${
        isDark ? 'bg-gradient-to-br from-violet-600 to-cyan-600' : 'bg-gradient-to-br from-indigo-500 to-cyan-500'
      } flex items-center justify-center`}>
        <span className="text-4xl">📚</span>
      </div>

      <div className="p-6">
        <h3 className={`text-xl font-semibold mb-2 ${
          isDark ? 'text-slate-100' : 'text-slate-900'
        }`}>
          {course.title}
        </h3>

        <p className={`text-sm mb-4 line-clamp-3 ${
          isDark ? 'text-slate-400' : 'text-slate-600'
        }`}>
          {course.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <span className={`text-sm font-medium ${
            isDark ? 'text-cyan-400' : 'text-cyan-600'
          }`}>
            {course.instructor?.name || course.instructorName || 'Unknown'}
          </span>
          <span className={`text-sm ${
            isDark ? 'text-slate-500' : 'text-slate-500'
          }`}>
            {course.duration || 'N/A'} hours
          </span>
        </div>

        {showProgress && (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className={`text-sm font-medium ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}>
                Progress: {progress}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleProgressChange}
              className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${
                isDark ? 'bg-slate-700' : 'bg-gray-200'
              }`}
            />
            <div className={`w-full h-2 rounded-lg mt-1 ${
              isDark ? 'bg-slate-700' : 'bg-gray-200'
            }`}>
              <div
                className={`h-2 rounded-lg transition-all duration-300 ${
                  isDark ? 'bg-gradient-to-r from-cyan-500 to-cyan-400' : 'bg-gradient-to-r from-cyan-600 to-cyan-500'
                }`}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {user?.role === 'STUDENT' && !isEnrolled && !showProgress && (
          <button
            onClick={handleEnroll}
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              loading
                ? 'bg-gray-500 cursor-not-allowed'
                : `bg-gradient-to-r ${
                    isDark ? 'from-violet-600 to-cyan-600' : 'from-indigo-500 to-cyan-500'
                  } hover:from-violet-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl`
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Enrolling...
              </div>
            ) : (
              'Enroll Now'
            )}
          </button>
        )}

        {user?.role === 'INSTRUCTOR' && !isEnrolled && (
          <button
            onClick={handleEnroll}
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              loading
                ? 'bg-gray-500 cursor-not-allowed'
                : `bg-gradient-to-r ${
                    isDark ? 'from-amber-600 to-orange-600' : 'from-amber-500 to-orange-500'
                  } hover:from-amber-700 hover:to-orange-700 text-white shadow-lg hover:shadow-xl`
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Claiming...
              </div>
            ) : (
              'Claim Course'
            )}
          </button>
        )}

        {isEnrolled && (
          <div className="flex flex-col gap-2">
            <div className={`w-full py-3 px-4 rounded-lg text-center font-medium ${
              isDark ? 'bg-green-600/20 text-green-400' : 'bg-green-100 text-green-700'
            }`}>
              {user?.role === 'INSTRUCTOR' ? '✓ Assigned Instructor' : '✓ Enrolled'}
            </div>
            
            <button
              onClick={() => onViewAssignments && onViewAssignments(course)}
              className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 border ${
                isDark 
                  ? 'border-slate-600 text-slate-300 hover:bg-slate-700 hover:border-slate-500' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400'
              }`}
            >
              📝 View Assignments
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCard;