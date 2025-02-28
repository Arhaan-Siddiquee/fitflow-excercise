import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ExerciseDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownType, setDropdownType] = useState('');
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const upperBodyExercises = [
    { name: "Push-ups", path: "/upper-body/push-ups" },
    { name: "--", path: "/upper-body/--" },
    { name: "Pull-ups", path: "/upper-body/Pullup" },
    { name: "Shoulder Press", path: "/upper-body/shoulder-press" },
    { name: "Bicep Curls", path: "/upper-body/bicep-curls" },
    { name: "Front Raises", path: "/upper-body/front-raises" }
  ];

  const lowerBodyExercises = [
    { name: "Squats", path: "/lower-body/squats" },
    { name: "~Deadlifts", path: "/lower-body/deadlifts" },
    { name: "Lunges", path: "/lower-body/lunges" },
    { name: "March", path: "/lower-body/morning" },
    { name: "High Knees", path: "/lower-body/highknees" }
  ];

  const deskExercises = [
    { name: "Knee Raises", path: "/desk/knee" },
    { name: "Curls", path: "/desk/curls" },
    { name: "Hand Raises", path: "/desk/hand" }
  ];

  const handleToggleDropdown = (type) => {
    if (isOpen && dropdownType === type) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
      setDropdownType(type);
    }
  };

  return (
    <div className="relative z-50" ref={dropdownRef}>
      <div className="flex space-x-4">
        {/* Exercises Toggle Button */}
        <button
          onClick={() => handleToggleDropdown('regular')}
          className="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out text-gray-600 hover:bg-gray-50 hover:text-gray-900 flex items-center space-x-2"
          aria-expanded={isOpen && dropdownType === 'regular'}
          aria-haspopup="true"
        >
          <span>Exercises</span>
          <svg
            className={`h-4 w-4 transition-transform duration-200 ${isOpen && dropdownType === 'regular' ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Desk Exercises Toggle Button */}
        <button
          onClick={() => handleToggleDropdown('desk')}
          className="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out text-gray-600 hover:bg-gray-50 hover:text-gray-900 flex items-center space-x-2"
          aria-expanded={isOpen && dropdownType === 'desk'}
          aria-haspopup="true"
        >
          <span>Desk Exercises</span>
          <svg
            className={`h-4 w-4 transition-transform duration-200 ${isOpen && dropdownType === 'desk' ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-hidden z-50">
          {dropdownType === 'regular' && (
            <div className="py-1">
              {/* Upper Body Exercises */}
              <div className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-50">Upper Body</div>
              {upperBodyExercises.map((exercise, index) => (
                <Link
                  key={`upper-${index}`}
                  to={exercise.path}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  {exercise.name}
                </Link>
              ))}
              
              {/* Lower Body Exercises */}
              <div className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-50">Lower Body</div>
              {lowerBodyExercises.map((exercise, index) => (
                <Link
                  key={`lower-${index}`}
                  to={exercise.path}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  {exercise.name}
                </Link>
              ))}
            </div>
          )}

          {dropdownType === 'desk' && (
            <div className="py-1">
              {/* Desk Exercises */}
              <div className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-50">Desk Exercises</div>
              {deskExercises.map((exercise, index) => (
                <Link
                  key={`desk-${index}`}
                  to={exercise.path}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  {exercise.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ExerciseDropdown;