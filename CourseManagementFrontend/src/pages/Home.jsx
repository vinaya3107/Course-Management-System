import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Home = () => {
  const { user } = useAuth();
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen ${
      isDark ? 'bg-slate-900' : 'bg-slate-50'
    }`}>
      {/* Hero Section */}
      <section className={`py-20 px-4 ${
        isDark ? 'bg-slate-900' : 'bg-slate-50'
      }`}>
        <div className="max-w-7xl mx-auto text-center">
          <h1 className={`text-5xl md:text-6xl font-bold mb-6 ${
            isDark ? 'text-slate-100' : 'text-slate-900'
          }`}>
            Welcome to <span className="text-violet-500">EduLearn</span>
          </h1>
          <p className={`text-xl mb-8 max-w-3xl mx-auto ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Your learning hub for Computer Science, English, and Maths courses and more in a clean, focused experience.
            Join students and educators in a platform built for real progress.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!user ? (
              <Link
                to="/register"
                className="px-8 py-4 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Get Started
              </Link>
            ) : (
              <Link
                to="/courses"
                className="px-8 py-4 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Go to Dashboard
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className={`py-20 px-4 ${
        isDark ? 'bg-slate-800/50' : 'bg-white/50'
      }`}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-4xl font-bold mb-6 ${
            isDark ? 'text-slate-100' : 'text-slate-900'
          }`}>
            What is EduLearn?
          </h2>
          <p className={`text-lg mb-6 ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            EduLearn is your all-in-one learning management portal that brings courses, instructors, and students together in a modern, easy to use experience.
            It's built for real learning progress track completion, submit assignments, and access curated classes anytime.
          </p>
          <p className={`text-lg mb-8 ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Whether you're new to online learning or managing classes as an educator, the platform delivers transparency, insights, and meaningful results.
          </p>
        </div>
      </section>

      {/* Featured Courses */}
      <section className={`py-20 px-4 ${
        isDark ? 'bg-slate-900' : 'bg-slate-50'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-4xl font-bold mb-4 ${
              isDark ? 'text-slate-100' : 'text-slate-900'
            }`}>
              Popular Courses
            </h2>
            <p className={`text-lg ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Computer Science, English, and Maths classes that lead to strong academic outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Computer Science Fundamentals', desc: 'Learn algorithms, data structures, and programming principles', category: 'Computer Science' },
              { title: 'Python Programming', desc: 'Build practical Python skills from beginner to intermediate', category: 'Computer Science' },
              { title: 'English Writing Mastery', desc: 'Improve writing structure, grammar, and communication', category: 'English' },
              { title: 'Maths for Data Science', desc: 'Strengthen algebra, calculus, and statistics', category: 'Maths' },
              { title: 'Advanced English Reading', desc: 'Develop critical reading and analysis skills', category: 'English' },
              { title: 'Calculus Essentials', desc: 'Understand calculus concepts and applications', category: 'Maths' }
            ].map((course, index) => (
              <div key={index} className={`p-6 rounded-xl backdrop-blur-sm border transition-all duration-300 hover:scale-105 ${
                isDark
                  ? 'bg-slate-800/50 border-slate-700 shadow-lg shadow-slate-900/50'
                  : 'bg-white/50 border-gray-200 shadow-lg shadow-gray-200/50'
              }`}>
                <h3 className={`text-xl font-semibold mb-3 ${
                  isDark ? 'text-slate-100' : 'text-slate-900'
                }`}>
                  {course.title}
                </h3>
                <p className={`text-sm mb-4 ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  {course.desc}
                </p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  isDark ? 'bg-cyan-600/20 text-cyan-400' : 'bg-cyan-100 text-cyan-700'
                }`}>
                  {course.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`py-20 px-4 ${
        isDark ? 'bg-slate-800/50' : 'bg-white/50'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '1000+', label: 'Students' },
              { number: '50+', label: 'Courses' },
              { number: '25+', label: 'Instructors' },
              { number: '95%', label: 'Success Rate' }
            ].map((stat, index) => (
              <div key={index}>
                <div className={`text-4xl font-bold mb-2 ${
                  isDark ? 'text-cyan-400' : 'text-cyan-600'
                }`}>
                  {stat.number}
                </div>
                <div className={`text-sm font-medium ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 px-4 ${
        isDark ? 'bg-slate-900' : 'bg-slate-50'
      }`}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-4xl font-bold mb-6 ${
            isDark ? 'text-slate-100' : 'text-slate-900'
          }`}>
            Ready to Start Your Learning Journey?
          </h2>
          <p className={`text-lg mb-8 ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Join thousands of students and instructors on EduLearn today
          </p>
          {!user ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="px-8 py-4 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Join as Student
              </Link>
              <Link
                to="/register"
                className="px-8 py-4 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Join as Instructor
              </Link>
            </div>
          ) : (
            <Link
              to="/courses"
              className="px-8 py-4 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Continue Learning
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 px-4 border-t ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className={`text-xl font-bold mb-2 ${
                isDark ? 'text-slate-100' : 'text-slate-900'
              }`}>
                EduLearn
              </h3>
              <p className={`${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}>
                Empowering education through technology
              </p>
            </div>
            <div>
              <h4 className={`font-semibold mb-4 ${
                isDark ? 'text-slate-100' : 'text-slate-900'
              }`}>
                Platform
              </h4>
              <ul className="space-y-2">
                <li><Link to="/" className={`hover:text-cyan-400 transition-colors ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}>Home</Link></li>
                <li><Link to="/courses" className={`hover:text-cyan-400 transition-colors ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}>Courses</Link></li>
                <li><Link to="/register" className={`hover:text-cyan-400 transition-colors ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}>Register</Link></li>
                <li><Link to="/login" className={`hover:text-cyan-400 transition-colors ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}>Sign In</Link></li>
              </ul>
            </div>
            <div>
              <h4 className={`font-semibold mb-4 ${
                isDark ? 'text-slate-100' : 'text-slate-900'
              }`}>
                Support
              </h4>
              <ul className="space-y-2">
                <li><a href="mailto:vinayasri.mandalapu@gmail.com" className={`hover:text-cyan-400 transition-colors ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}>Help Center</a></li>
                <li><a href="mailto:vinayasri.mandalapu@gmail.com" className={`hover:text-cyan-400 transition-colors ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}>Contact Us</a></li>
                <li><a href="#privacy" className={`hover:text-cyan-400 transition-colors ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}>Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className={`text-center pt-8 border-t ${
            isDark ? 'border-slate-800' : 'border-gray-200'
          }`}>
            <p className={`${
              isDark ? 'text-slate-500' : 'text-slate-500'
            }`}>
              © 2026 EduLearn. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;