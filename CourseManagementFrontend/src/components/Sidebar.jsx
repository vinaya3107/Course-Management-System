import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Sidebar = () => {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const location = useLocation();

  const menuItems = [
    { path: '/courses', label: 'All Courses', icon: '📚' },
    { path: '/my-courses', label: 'My Courses', icon: '🎓' },
  ];

  if (user?.role === 'INSTRUCTOR') {
    menuItems.push(
      { path: '/dashboard', label: 'Dashboard', icon: '📊' },
      { path: '/manage-courses', label: 'Manage Courses', icon: '⚙️' }
    );
  }

  return (
    <div className={`fixed left-0 top-16 h-full w-64 backdrop-blur-md border-r ${
      isDark ? 'bg-slate-900/80 border-slate-700' : 'bg-white/80 border-gray-200'
    }`}>
      <div className="p-4">
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                location.pathname === item.path
                  ? isDark
                    ? 'bg-violet-600 text-white'
                    : 'bg-indigo-600 text-white'
                  : `hover:${
                      isDark ? 'bg-slate-800' : 'bg-gray-100'
                    } ${isDark ? 'text-slate-300' : 'text-gray-700'}`
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;