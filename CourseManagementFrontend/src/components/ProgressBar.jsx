import { useTheme } from '../context/ThemeContext';

const ProgressBar = ({ progress, className = '' }) => {
  const { isDark } = useTheme();

  return (
    <div className={`w-full ${className}`}>
      <div className={`w-full h-3 rounded-full overflow-hidden ${
        isDark ? 'bg-slate-700' : 'bg-gray-200'
      }`}>
        <div
          className={`h-full transition-all duration-500 ease-out ${
            isDark
              ? 'bg-gradient-to-r from-cyan-500 to-cyan-400'
              : 'bg-gradient-to-r from-cyan-600 to-cyan-500'
          }`}
          style={{ width: `${Math.min(progress, 100)}%` }}
        ></div>
      </div>
      <div className="flex justify-between items-center mt-2">
        <span className={`text-sm font-medium ${
          isDark ? 'text-slate-300' : 'text-slate-700'
        }`}>
          {progress}% Complete
        </span>
        <span className={`text-xs ${
          isDark ? 'text-slate-500' : 'text-slate-500'
        }`}>
          {progress}/100
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;