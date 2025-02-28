import { useState } from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [isChatbotOpen, setIsChatbotOpen] = useState(false) // State to control chatbot visibility
  
  const stats = [
    { name: 'Workouts Completed', value: '24', change: '+3 this week' },
    { name: 'Calories Burned', value: '9,280', change: '+520 this week' },
    { name: 'Workout Minutes', value: '386', change: '+42 this week' },
    { name: 'Achievements', value: '12', change: '+2 this week' },
  ]
  
  const activities = [
    { id: 1, name: 'Full Body Workout', type: 'Strength', duration: '45 min', completed: '2 days ago' },
    { id: 2, name: 'Morning Cardio', type: 'Cardio', duration: '30 min', completed: '3 days ago' },
    { id: 3, name: 'Core & Abs', type: 'Strength', duration: '25 min', completed: '4 days ago' },
    { id: 4, name: 'Upper Body Focus', type: 'Strength', duration: '40 min', completed: '1 week ago' }
  ]

  // Toggle chatbot window visibility
  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-gray-50 min-h-screen">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900">
          Welcome back, <span className="text-[#48c4a4]">Fitness Enthusiast!</span>
        </h1>
        <p className="mt-3 text-lg text-gray-600">Track your progress and stay motivated</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-10">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white border-black border overflow-hidden shadow-lg rounded-2xl transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px]">
            <div className="px-6 py-6">
              <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
              <dd className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</dd>
              <dd className="mt-2 text-sm text-[#48c4a4] font-medium">{stat.change}</dd>
            </div>
          </div>
        ))}
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {['overview', 'activities', 'goals'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`${
                activeTab === tab
                  ? 'border-[#48c4a4] text-[#48c4a4]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm uppercase tracking-wide transition-all duration-200`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>
      
      {/* Tab Content */}
      <div className="bg-white border-black border shadow-xl rounded-2xl overflow-hidden">
        {activeTab === 'overview' && (
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-5 flex items-center">
                  <span className="w-2 h-6 bg-[#48c4a4] rounded mr-3"></span>
                  Your Progress
                </h3>
                <div className="h-64 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center rounded-full bg-[#48c4a4]/10">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#48c4a4]" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 3a1 1 0 000 2h10a1 1 0 100-2H3zm0 4a1 1 0 000 2h6a1 1 0 100-2H3zm0 4a1 1 0 100 2h8a1 1 0 100-2H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-500">Progress chart will appear here</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-5 flex items-center">
                  <span className="w-2 h-6 bg-[#48c4a4] rounded mr-3"></span>
                  Upcoming Workouts
                </h3>
                <div className="space-y-4">
                  <div className="border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-base font-medium text-gray-900">HIIT Session</h4>
                        <p className="text-sm text-gray-500">Tomorrow, 7:00 AM</p>
                      </div>
                      <span className="px-3 py-1 text-xs font-medium bg-[#48c4a4]/10 text-[#48c4a4] rounded-full">
                        Ready
                      </span>
                    </div>
                    <div className="mt-4 flex">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        30 min
                      </span>
                      <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#48c4a4]/20 text-[#48c4a4]">
                        Cardio
                      </span>
                    </div>
                  </div>
                  <div className="border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-base font-medium text-gray-900">Yoga Flow</h4>
                        <p className="text-sm text-gray-500">Friday, 6:30 PM</p>
                      </div>
                      <span className="px-3 py-1 text-xs font-medium bg-[#48c4a4]/10 text-[#48c4a4] rounded-full">
                        Scheduled
                      </span>
                    </div>
                    <div className="mt-4 flex">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        45 min
                      </span>
                      <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        Flexibility
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-10 flex justify-center">
              <Link
                to="/workout"
                className="px-6 py-3 text-sm font-medium rounded-full shadow-lg text-white bg-[#48c4a4] hover:bg-[#3aaa8d] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#48c4a4]"
              >
                Start New Workout
              </Link>
            </div>
          </div>
        )}
        
        {/* Chatbot Iframe */}
        {isChatbotOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
    <div className="relative w-[400px] h-[500px] bg-white rounded-xl shadow-lg">
      {/* Chatbot iframe */}
      <iframe
        src="https://www.chatbase.co/chatbot-iframe/iodQ0y8agMsYm2oO6BbK6"
        width="100%"
        height="100%"
        frameBorder="0"
        title="Chatbot"
        className="rounded-xl"
      />
      
      {/* Close button */}
      <button
        onClick={toggleChatbot}
        className="absolute top-2 right-2 bg-black text-white rounded-full p-2"
      >
        X
      </button>
    </div>
  </div>
)}

{/* Side Chatbot Button (unchanged) */}
{!isChatbotOpen && (
  <button
    onClick={toggleChatbot}
    className="fixed bottom-10 right-10 bg-black text-white rounded-full p-4 shadow-lg hover:bg-[#3aaa8d] transition-all duration-300"
  >
    💬
  </button>
)}


      </div>
    </div>
  )
}

export default Dashboard