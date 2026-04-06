import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useTheme } from './context/ThemeContext';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Courses from './pages/Courses';
import MyCourses from './pages/MyCourses';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import ManageCourses from './pages/ManageCourses';

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/courses" />;
  return children;
};

function App() {
  const { isDark } = useTheme();

  return (
    <AuthProvider>
      <Router>
        <div className={`min-h-screen ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/courses"
              element={
                <PrivateRoute>
                  <Courses />
                </PrivateRoute>
              }
            />
            <Route
              path="/my-courses"
              element={
                <PrivateRoute allowedRoles={['STUDENT']}>
                  <MyCourses />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute allowedRoles={['INSTRUCTOR']}>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/manage-courses"
              element={
                <PrivateRoute allowedRoles={['INSTRUCTOR']}>
                  <ManageCourses />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin-dashboard"
              element={
                <PrivateRoute allowedRoles={['ADMIN']}>
                  <AdminDashboard />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
