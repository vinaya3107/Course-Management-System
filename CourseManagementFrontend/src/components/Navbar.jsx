import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b ${
      isDark ? 'bg-slate-900/80 border-slate-700' : 'bg-white/80 border-gray-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className={`text-2xl font-bold ${
            isDark ? 'text-slate-100' : 'text-slate-900'
          }`}>
            EduLearn
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {user ? (
              <>
                <Link to="/courses" className={`hover:text-cyan-400 transition-colors ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  Courses
                </Link>
                <Link to="/my-courses" className={`hover:text-cyan-400 transition-colors ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  My Courses
                </Link>
                {user.role === 'INSTRUCTOR' && (
                  <Link to="/dashboard" className={`hover:text-cyan-400 transition-colors ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    Dashboard
                  </Link>
                )}
                {user.role === 'ADMIN' && (
                  <Link to="/admin-dashboard" className={`hover:text-cyan-400 transition-colors ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    Admin Dashboard
                  </Link>
                )}
                <span className={`text-sm ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  Welcome, {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className={`hover:text-cyan-400 transition-colors ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  Login
                </Link>
                <Link to="/register" className={`hover:text-cyan-400 transition-colors ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  Register
                </Link>
              </>
            )}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${
                isDark
                  ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {isDark ? '☀️' : '🌙'}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${
                isDark
                  ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {isDark ? '☀️' : '🌙'}
            </button>
            {/* Mobile menu would go here */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;