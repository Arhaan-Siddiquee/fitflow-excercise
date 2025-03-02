import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import ExerciseDropdown from './ExerciseDropdown';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/' },
    { name: 'Tutorials', path: '/tutorials' },
    { name: 'Diet Plan', path: '/diet-plan' }
  ];

  const isActive = (path) => location.pathname === path;

  const handleNavigation = (path) => {
    if (location.pathname !== path) {
      navigate(path);
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
            FitFlow
          </span>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.path)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.path) ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.name}
              </button>
            ))}

            {/* Exercise Dropdown */}
            <ExerciseDropdown />
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100"
          >
            {isMobileMenuOpen ? '✖' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md z-50 absolute w-full left-0 top-16">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleNavigation(item.path);
              }}
              className="block px-4 py-3 border-b text-gray-700 hover:bg-gray-100 w-full text-left"
            >
              {item.name}
            </button>
          ))}
          <ExerciseDropdown mobile />

        </div>
      )}
    </nav>
  );
};

export default Navbar;
