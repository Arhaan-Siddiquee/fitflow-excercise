import React, { useState } from 'react';

const PersonalizedExercise = () => {
  // State for storing the selected body part and related exercises
  const [selectedBodyPart, setSelectedBodyPart] = useState(null);
  const [exercises, setExercises] = useState([]);

  // Mapping body parts to exercises and video URLs
  const exercisesMapping = {
    stomach: [
      { name: "Core Crunch", videoUrl: "https://www.youtube.com/embed/dkGwcfo9zto" },
      { name: "Plank", videoUrl: "https://www.youtube.com/embed/0G_OI6oVzLA" },
      { name: "Side Plank", videoUrl: "https://www.youtube.com/embed/fzLeV8X0Gb8" },
      { name: "Russian Twists", videoUrl: "https://www.youtube.com/embed/2KKNrUUwOw8" },
      { name: "Mountain Climbers", videoUrl: "https://www.youtube.com/embed/dqjZ6BGhY9s" },
    ],
    foot: [
      { name: "Calf Raises", videoUrl: "https://www.youtube.com/embed/JTzf4IPR7dw" },
      { name: "Foot Circles", videoUrl: "https://www.youtube.com/embed/Pby8XRtSjpk" },
      { name: "Toe Taps", videoUrl: "https://www.youtube.com/embed/v1Fx2t9gNUw" },
      { name: "Heel-to-Toe Walking", videoUrl: "https://www.youtube.com/embed/JZr7QFnFhlc" },
      { name: "Foot Stretches", videoUrl: "https://www.youtube.com/embed/jFOCIRYEeCo" },
    ],
    leg: [
      { name: "Leg Squats", videoUrl: "https://www.youtube.com/embed/IfqrxS_-8oU" },
      { name: "Lunges", videoUrl: "https://www.youtube.com/embed/BYe4uyGF-h4" },
      { name: "Hamstring Stretch", videoUrl: "https://www.youtube.com/embed/T_l0AyZywjU" },
      { name: "Leg Raises", videoUrl: "https://www.youtube.com/embed/U4L_6JEv9Jg" },
      { name: "Glute Bridges", videoUrl: "https://www.youtube.com/embed/WEvLyLsV0xs" },
    ],
    chest: [
      { name: "Push-ups", videoUrl: "https://www.youtube.com/embed/yQEx9OC2C3E" },
      { name: "Chest Press", videoUrl: "https://www.youtube.com/embed/o7TvO377OqA" },
      { name: "Chest Fly", videoUrl: "https://www.youtube.com/embed/rk8YayRoTRQ" },
      { name: "Incline Push-ups", videoUrl: "https://www.youtube.com/embed/DORUKQ3zLIo" },
      { name: "Dumbbell Pullover", videoUrl: "https://www.youtube.com/embed/raU5C9bWo9U" },
    ],
    head: [
      { name: "Neck Stretch", videoUrl: "https://www.youtube.com/embed/LFdwi0VyhdE" },
      { name: "Neck Strengthening", videoUrl: "https://www.youtube.com/embed/6Tr3GLfySYo" },
      { name: "Head Tilts", videoUrl: "https://www.youtube.com/embed/mCataY5uUo0" },
      { name: "Chin Tucks", videoUrl: "https://www.youtube.com/embed/Cd1iscdQ-R0" },
    ],
    shoulder: [
      { name: "Shoulder Press", videoUrl: "https://www.youtube.com/embed/k6tzKisR3NY" },
      { name: "Lateral Raises", videoUrl: "https://www.youtube.com/embed/yHx8wPv4RPo" },
      { name: "Front Raises", videoUrl: "https://www.youtube.com/embed/yHx8wPv4RPo" },
      { name: "Shoulder Circles", videoUrl: "https://www.youtube.com/embed/eZXRXIJ2-hc" },
      { name: "Arnold Press", videoUrl: "https://www.youtube.com/embed/69z2KymlEvQ" },
    ],
    arm: [
      { name: "Bicep Curls", videoUrl: "https://www.youtube.com/embed/ykJmrZ5v0Oo" },
      { name: "Tricep Dips", videoUrl: "https://www.youtube.com/embed/89_spgcdQlw" },
      { name: "Hammer Curls", videoUrl: "https://www.youtube.com/embed/TwD-YGVP4Bk" },
      { name: "Overhead Tricep Extension", videoUrl: "https://www.youtube.com/embed/BrVvtti-gkU" },
      { name: "Concentration Curls", videoUrl: "https://www.youtube.com/embed/I_bKCYL2nL8" },
    ],
  };

  // Handle the click on a body part and set the corresponding exercises
  const handleBodyPartClick = (bodyPart) => {
    setSelectedBodyPart(bodyPart);
    setExercises(exercisesMapping[bodyPart] || []); // Set exercises for selected body part
  };

  // Body Part Icons
  const bodyPartIcons = {
    stomach: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0z" />
      </svg>
    ),
    foot: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    ),
    leg: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    ),
    chest: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    head: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
    ),
    shoulder: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    arm: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
      </svg>
    ),
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
            FitPro <span className="text-indigo-200">Personalized</span>
          </h1>
          <p className="mt-2 text-indigo-100 max-w-3xl">
            Customize your fitness journey with exercises tailored to your body's needs.
          </p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 md:p-8 lg:p-10">
            <div className="flex flex-col md:flex-row md:space-x-8">
              {/* Left Section with 3D Model */}
              <div className="w-full md:w-2/5 lg:w-1/3 mb-8 md:mb-0">
                <div className="bg-gray-50 rounded-xl overflow-hidden shadow-inner h-96 md:h-full">
                  <iframe
                    title="Human Body App"
                    src="https://maya-gans.shinyapps.io/human_body_app/"
                    className="w-full h-full"
                    frameBorder="0"
                  />
                </div>
                
                {/* Instructions panel */}
                <div className="mt-6 bg-indigo-50 rounded-xl p-4">
                  <h3 className="font-medium text-indigo-800 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    How to Use
                  </h3>
                  <ul className="mt-2 text-sm text-indigo-700 space-y-1">
                    <li className="flex items-center">
                      <svg className="h-4 w-4 mr-1 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      Select a body part from the categories
                    </li>
                    <li className="flex items-center">
                      <svg className="h-4 w-4 mr-1 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      Browse recommended exercises
                    </li>
                    <li className="flex items-center">
                      <svg className="h-4 w-4 mr-1 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      Watch video tutorials for proper form
                    </li>
                  </ul>
                </div>
              </div>

              {/* Right Section with Exercise Content */}
              <div className="w-full md:w-3/5 lg:w-2/3">
                {/* Title */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Choose Your <span className="text-indigo-600">Target Area</span>
                  </h2>
                  <p className="mt-2 text-gray-600">Select a body part to view personalized exercises just for you.</p>
                </div>

                {/* Body Part Selection */}
                <div className="mb-8">
                  <div className="flex flex-wrap gap-3">
                    {Object.keys(exercisesMapping).map((bodyPart) => (
                      <button
                        key={bodyPart}
                        onClick={() => handleBodyPartClick(bodyPart)}
                        className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                          selectedBodyPart === bodyPart
                            ? 'bg-indigo-600 text-white shadow-md'
                            : 'bg-white text-gray-700 border border-gray-200 hover:bg-indigo-50 hover:border-indigo-300'
                        }`}
                      >
                        {bodyPartIcons[bodyPart]}
                        {bodyPart.charAt(0).toUpperCase() + bodyPart.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Exercises List for Selected Body Part */}
                {selectedBodyPart && exercises.length > 0 && (
                  <div className="animate-fadeIn">
                    <div className="flex items-center mb-6">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                        {bodyPartIcons[selectedBodyPart]}
                      </div>
                      <h2 className="text-xl font-semibold text-gray-900">{selectedBodyPart.charAt(0).toUpperCase() + selectedBodyPart.slice(1)} Exercises</h2>
                      <div className="ml-auto px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                        {exercises.length} exercises
                      </div>
                    </div>
                    
                    {/* Display Exercises as Cards */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {exercises.map((exercise, index) => (
                        <div
                          key={index}
                          className="bg-white overflow-hidden rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                        >
                          <div className="p-1 bg-gray-50">
                            <iframe
                              width="100%"
                              height="180"
                              src={exercise.videoUrl}
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="text-lg font-semibold text-gray-900">{exercise.name}</h3>
                            <div className="flex items-center mt-3 justify-between">
                              <span className="text-xs text-indigo-600 font-medium bg-indigo-50 px-2 py-1 rounded-full">
                                {selectedBodyPart.charAt(0).toUpperCase() + selectedBodyPart.slice(1)}
                              </span>
                              <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                Save
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* No Exercises Message */}
                {selectedBodyPart && exercises.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-16 px-4 bg-gray-50 rounded-xl">
                    <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-lg font-medium">No exercises available</p>
                    <p className="text-gray-500 mt-2 text-center">Please select a different body part or check back later.</p>
                    <button 
                      onClick={() => setSelectedBodyPart(null)}
                      className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                      </svg>
                      Go back
                    </button>
                  </div>
                )}
                
                {/* Initial State - No Selection Yet */}
                {!selectedBodyPart && (
                  <div className="bg-gray-50 rounded-xl p-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 mb-6">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">Ready to start your workout?</h3>
                    <p className="text-gray-600 mb-6">Select a body part from the options above to see customized exercises.</p>
                    <div className="flex flex-wrap justify-center gap-4">
                      {Object.keys(exercisesMapping).slice(0, 3).map((bodyPart) => (
                        <button
                          key={bodyPart}
                          onClick={() => handleBodyPartClick(bodyPart)}
                          className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-indigo-50 transition-colors duration-150"
                        >
                          {bodyPartIcons[bodyPart]}
                          <span>{bodyPart.charAt(0).toUpperCase() + bodyPart.slice(1)}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>© 2025 FitPro. All rights reserved. Your personalized fitness companion.</p>
        </div>
      </div>
    </div>
  );
};

export default PersonalizedExercise;