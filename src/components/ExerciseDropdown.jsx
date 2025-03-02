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
    { name: "Pushup", path: "/upper-body/pushup" },
    { name: "Pullup", path: "/upper-body/pullup" },
    { name: "Shoulder Press", path: "/upper-body/shoulder-press" },
    { name: "Bicep Curls", path: "/upper-body/bicep-curls" },
    { name: "Front Raises", path: "/upper-body/front-raises" }
  ];

  const lowerBodyExercises = [
    { name: "Squats", path: "/lower-body/squats" },
    { name: "Lunges", path: "/lower-body/lunges" },
    { name: "HighKnees", path: "/lower-body/highknees" }
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
          className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
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
          className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
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
            <div className="grid grid-cols-2 gap-4 p-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Upper Body</h3>
                {upperBodyExercises.map((exercise) => (
                  <Link
                    key={exercise.name}
                    to={exercise.path}
                    className="block text-sm text-gray-700 hover:bg-gray-100 py-1 px-2 rounded"
                    onClick={() => setIsOpen(false)}
                  >
                    {exercise.name}
                  </Link>
                ))}
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Lower Body</h3>
                {lowerBodyExercises.map((exercise) => (
                  <Link
                    key={exercise.name}
                    to={exercise.path}
                    className="block text-sm text-gray-700 hover:bg-gray-100 py-1 px-2 rounded"
                    onClick={() => setIsOpen(false)}
                  >
                    {exercise.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {dropdownType === 'desk' && (
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Desk Exercises</h3>
              {deskExercises.map((exercise) => (
                <Link
                  key={exercise.name}
                  to={exercise.path}
                  className="block text-sm text-gray-700 hover:bg-gray-100 py-1 px-2 rounded"
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
