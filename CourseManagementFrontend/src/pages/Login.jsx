import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const loggedInUser = await login(formData.email, formData.password);
      if (loggedInUser.role === 'ADMIN') {
        navigate('/admin-dashboard');
      } else if (loggedInUser.role === 'INSTRUCTOR') {
        navigate('/dashboard');
      } else {
        navigate('/courses');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 ${
      isDark
        ? 'bg-slate-900'
        : 'bg-gradient-to-br from-slate-50 to-slate-100'
    }`}>
      <div className={`max-w-md w-full space-y-8 p-8 rounded-2xl backdrop-blur-sm border ${
        isDark
          ? 'bg-slate-800/50 border-slate-700 shadow-2xl shadow-slate-900/50'
          : 'bg-white/50 border-gray-200 shadow-2xl shadow-gray-200/50'
      }`}>
        <div className="text-center">
          <h2 className={`text-3xl font-bold ${
            isDark ? 'text-slate-100' : 'text-slate-900'
          }`}>
            Welcome Back
          </h2>
          <p className={`mt-2 ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Sign in to your EduLearn account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-red-400 text-sm text-center">{error}</p>
            </div>
          )}

          <div>
            <label htmlFor="email" className={`block text-sm font-medium mb-2 ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border transition-colors focus:ring-2 focus:ring-cyan-500 focus:border-transparent ${
                isDark
                  ? 'bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400'
                  : 'bg-white border-gray-300 text-slate-900 placeholder-gray-500'
              }`}
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className={`block text-sm font-medium mb-2 ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border transition-colors focus:ring-2 focus:ring-cyan-500 focus:border-transparent ${
                isDark
                  ? 'bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400'
                  : 'bg-white border-gray-300 text-slate-900 placeholder-gray-500'
              }`}
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
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
                Signing In...
              </div>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="text-center">
          <p className={`${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Don't have an account?{' '}
            <Link
              to="/register"
              className={`font-medium hover:underline ${
                isDark ? 'text-cyan-400' : 'text-cyan-600'
              }`}
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;