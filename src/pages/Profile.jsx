import React, { useState } from 'react';
import { Activity, Award, Calendar, Heart, Medal, Phone, Shield, Star, User, Users } from 'lucide-react';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Sample user data
  const userData = {
    name: "Alex Johnson",
    role: "Marketing Manager",
    department: "Marketing",
    company: "TechCorp Inc.",
    joinedDate: "May 2023",
    points: 1250,
    rank: 5,
    streakDays: 15,
    badges: [
      { id: 1, name: "Early Bird", description: "Completed 10 workouts before 8 AM", icon: <Star className="text-yellow-500" /> },
      { id: 2, name: "Team Player", description: "Participated in 5 group challenges", icon: <Users className="text-blue-500" /> },
      { id: 3, name: "Consistency King", description: "30-day workout streak", icon: <Award className="text-purple-500" /> },
    ],
    insurance: {
      provider: "HealthPlus",
      policyNumber: "HP-12345678",
      expiryDate: "December 31, 2025",
      type: "Comprehensive",
      coverageType: "Inpatient & Outpatient",
      premium: "Premium Gold"
    },
    upcomingConsultations: [
      { id: 1, doctor: "Dr. Sarah Miller", specialty: "Nutrition", date: "March 5, 2025", time: "10:00 AM" },
      { id: 2, doctor: "Dr. James Wilson", specialty: "Physical Therapy", date: "March 12, 2025", time: "2:30 PM" },
    ]
  };

  // Sample leaderboard data
  const leaderboardData = [
    { id: 1, name: "Mark Williams", department: "Engineering", points: 1850, rank: 1 },
    { id: 2, name: "Sarah Chen", department: "Product", points: 1720, rank: 2 },
    { id: 3, name: "Raj Patel", department: "Sales", points: 1540, rank: 3 },
    { id: 4, name: "Emma Thompson", department: "HR", points: 1380, rank: 4 },
    { id: 5, name: "Alex Johnson", department: "Marketing", points: 1250, rank: 5, isCurrentUser: true },
    { id: 6, name: "David Kim", department: "Finance", points: 1120, rank: 6 },
    { id: 7, name: "Olivia Martinez", department: "Customer Support", points: 980, rank: 7 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with profile summary */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="relative">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                  <User size={40} className="text-indigo-600" />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                  <Activity size={14} />
                </div>
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-bold">{userData.name}</h1>
                <p className="text-blue-100">{userData.role} • {userData.department}</p>
                <div className="flex items-center mt-1">
                  <div className="flex items-center mr-4">
                    <Award size={16} className="mr-1" />
                    <span>{userData.points} pts</span>
                  </div>
                  <div className="flex items-center">
                    <Medal size={16} className="mr-1" />
                    <span>Rank #{userData.rank}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-3 backdrop-blur-sm">
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center">
                  <Calendar size={24} />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-100">Current Streak</p>
                  <p className="text-2xl font-bold">{userData.streakDays} days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white shadow">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto">
            <button 
              className={`px-4 py-3 font-medium whitespace-nowrap border-b-2 ${activeTab === 'overview' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`px-4 py-3 font-medium whitespace-nowrap border-b-2 ${activeTab === 'badges' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'}`}
              onClick={() => setActiveTab('badges')}
            >
              Badges
            </button>
            <button 
              className={`px-4 py-3 font-medium whitespace-nowrap border-b-2 ${activeTab === 'consult' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'}`}
              onClick={() => setActiveTab('consult')}
            >
              Consult a Doctor
            </button>
            <button 
              className={`px-4 py-3 font-medium whitespace-nowrap border-b-2 ${activeTab === 'insurance' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'}`}
              onClick={() => setActiveTab('insurance')}
            >
              Insurance
            </button>
            <button 
              className={`px-4 py-3 font-medium whitespace-nowrap border-b-2 ${activeTab === 'leaderboard' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'}`}
              onClick={() => setActiveTab('leaderboard')}
            >
              Leaderboard
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-6">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Profile Summary */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Profile Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">Company:</span>
                  <span className="font-medium">{userData.company}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Member Since:</span>
                  <span className="font-medium">{userData.joinedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Current Points:</span>
                  <span className="font-medium">{userData.points}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Fitness Rank:</span>
                  <span className="font-medium">#{userData.rank}</span>
                </div>
              </div>
            </div>

            {/* Recent Badges */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Recent Badges</h2>
                <button 
                  className="text-sm text-blue-600 hover:text-blue-800"
                  onClick={() => setActiveTab('badges')}
                >
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {userData.badges.slice(0, 3).map(badge => (
                  <div key={badge.id} className="flex items-center">
                    <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                      {badge.icon}
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">{badge.name}</p>
                      <p className="text-sm text-gray-500">{badge.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Consultations */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Upcoming Consultations</h2>
                <button 
                  className="text-sm text-blue-600 hover:text-blue-800"
                  onClick={() => setActiveTab('consult')}
                >
                  Schedule New
                </button>
              </div>
              {userData.upcomingConsultations.length > 0 ? (
                <div className="space-y-4">
                  {userData.upcomingConsultations.map(consultation => (
                    <div key={consultation.id} className="border border-gray-100 rounded-lg p-3">
                      <div className="flex justify-between">
                        <span className="font-medium">{consultation.doctor}</span>
                        <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {consultation.specialty}
                        </span>
                      </div>
                      <div className="flex items-center mt-2 text-gray-500 text-sm">
                        <Calendar size={14} className="mr-1" />
                        <span>{consultation.date}, {consultation.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Phone size={32} className="mx-auto mb-2 text-gray-400" />
                  <p>No upcoming consultations</p>
                  <button className="mt-2 text-blue-600">Schedule one now</button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Badges Tab */}
        {activeTab === 'badges' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Your Earned Badges</h2>
              <p className="text-gray-500">Collect badges by completing fitness challenges and activities</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userData.badges.map(badge => (
                  <div key={badge.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex flex-col items-center">
                      <div className="h-16 w-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                        {React.cloneElement(badge.icon, { size: 32 })}
                      </div>
                      <h3 className="font-bold text-lg mb-1">{badge.name}</h3>
                      <p className="text-gray-500 text-center">{badge.description}</p>
                    </div>
                  </div>
                ))}
                {/* Placeholder for locked badges */}
                <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                  <div className="flex flex-col items-center">
                    <div className="h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center mb-4 opacity-50">
                      <Medal size={32} className="text-gray-400" />
                    </div>
                    <h3 className="font-bold text-lg mb-1 text-gray-400">Marathon Master</h3>
                    <p className="text-gray-400 text-center">Complete your first company marathon event</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Consult a Doctor Tab */}
        {activeTab === 'consult' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Consult a Healthcare Professional</h2>
              <p className="text-gray-500">Schedule consultations with our network of healthcare experts</p>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <h3 className="font-medium mb-3">Upcoming Consultations</h3>
                {userData.upcomingConsultations.length > 0 ? (
                  <div className="space-y-4">
                    {userData.upcomingConsultations.map(consultation => (
                      <div key={consultation.id} className="flex items-center justify-between bg-blue-50 p-4 rounded-lg">
                        <div>
                          <h4 className="font-medium">{consultation.doctor}</h4>
                          <p className="text-sm text-gray-600">{consultation.specialty}</p>
                          <div className="flex items-center mt-1 text-sm text-gray-500">
                            <Calendar size={14} className="mr-1" />
                            <span>{consultation.date}, {consultation.time}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="px-3 py-1 bg-white text-blue-600 border border-blue-200 rounded hover:bg-blue-50">
                            Reschedule
                          </button>
                          <button className="px-3 py-1 bg-white text-red-600 border border-red-200 rounded hover:bg-red-50">
                            Cancel
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500 border border-dashed border-gray-300 rounded-lg">
                    <Calendar size={32} className="mx-auto mb-2 text-gray-400" />
                    <p>No upcoming consultations scheduled</p>
                  </div>
                )}
              </div>

              <div>
                <h3 className="font-medium mb-3">Available Specialists</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { specialty: "Nutritionist", icon: <Heart size={20} className="text-green-500" /> },
                    { specialty: "Physical Therapist", icon: <Activity size={20} className="text-blue-500" /> },
                    { specialty: "Mental Health Coach", icon: <Star size={20} className="text-purple-500" /> },
                    { specialty: "Fitness Trainer", icon: <Users size={20} className="text-orange-500" /> },
                    { specialty: "Sleep Specialist", icon: <Moon size={20} className="text-indigo-500" /> },
                    { specialty: "General Physician", icon: <User size={20} className="text-red-500" /> },
                  ].map((specialist, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-3">
                        <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                          {specialist.icon}
                        </div>
                        <h4 className="font-medium">{specialist.specialty}</h4>
                      </div>
                      <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Book Consultation
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Insurance Tab */}
        {activeTab === 'insurance' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Your Health Insurance</h2>
              <p className="text-gray-500">View and manage your health insurance details</p>
            </div>
            <div className="p-6">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl p-6 mb-6 shadow-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-blue-100 mb-1">Health Insurance</div>
                    <div className="text-2xl font-bold mb-4">{userData.insurance.provider}</div>
                    <div className="bg-white bg-opacity-20 px-3 py-1 rounded text-sm inline-block mb-2">
                      {userData.insurance.premium}
                    </div>
                  </div>
                  <Shield size={48} className="text-white opacity-80" />
                </div>
                <div className="mt-4 pt-4 border-t border-white border-opacity-20">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-blue-100 text-xs">Policy Number</div>
                      <div className="font-medium">{userData.insurance.policyNumber}</div>
                    </div>
                    <div>
                      <div className="text-blue-100 text-xs">Expiry Date</div>
                      <div className="font-medium">{userData.insurance.expiryDate}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-4">Coverage Details</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between p-3 bg-gray-50 rounded">
                      <span className="text-gray-600">Type</span>
                      <span className="font-medium">{userData.insurance.type}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-gray-50 rounded">
                      <span className="text-gray-600">Coverage</span>
                      <span className="font-medium">{userData.insurance.coverageType}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-gray-50 rounded">
                      <span className="text-gray-600">Premium Level</span>
                      <span className="font-medium">{userData.insurance.premium}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded hover:bg-gray-50">
                      <span>Download Insurance Card</span>
                      <Download size={16} />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded hover:bg-gray-50">
                      <span>View Coverage Details</span>
                      <ExternalLink size={16} />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded hover:bg-gray-50">
                      <span>Submit a Claim</span>
                      <FileText size={16} />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded hover:bg-gray-50">
                      <span>Contact Insurance Support</span>
                      <Phone size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Leaderboard Tab */}
        {activeTab === 'leaderboard' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Fitness Challenge Leaderboard</h2>
              <p className="text-gray-500">See how you rank against colleagues in the fitness competition</p>
            </div>
            <div className="p-6">
              {/* Top 3 podium */}
              <div className="flex justify-center items-end mb-10 mt-4">
                {leaderboardData.slice(0, 3).map((user, index) => {
                  const positions = [
                    { height: 'h-32', place: '2nd', color: 'bg-gray-200' },
                    { height: 'h-40', place: '1st', color: 'bg-yellow-100' },
                    { height: 'h-24', place: '3rd', color: 'bg-amber-100' }
                  ];
                  return (
                    <div key={user.id} className={`flex flex-col items-center mx-4 ${index === 1 ? 'order-first' : ''}`}>
                      <div className="relative mb-2">
                        <div className="w-16 h-16 rounded-full bg-white border-4 border-indigo-100 flex items-center justify-center overflow-hidden">
                          <User size={32} className="text-indigo-600" />
                        </div>
                        <div className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                          {user.rank}
                        </div>
                      </div>
                      <p className="font-medium text-center">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.department}</p>
                      <div className="mt-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        {user.points} pts
                      </div>
                      <div className={`${positions[index].color} ${positions[index].height} w-20 rounded-t-lg mt-3 flex items-end justify-center pb-2`}>
                        <span className="font-bold text-gray-700">{positions[index].place}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Full Leaderboard */}
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {leaderboardData.map(user => (
                      <tr key={user.id} className={user.isCurrentUser ? 'bg-blue-50' : ''}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className={`flex items-center justify-center w-8 h-8 rounded-full mr-2 ${
                              user.rank === 1 ? 'bg-yellow-100 text-yellow-800' :
                              user.rank === 2 ? 'bg-gray-100 text-gray-800' :
                              user.rank === 3 ? 'bg-amber-100 text-amber-800' :
                              'bg-blue-50 text-blue-600'
                            }`}>
                              {user.rank}
                            </div>
                            {user.isCurrentUser && (
                              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded ml-2">
                                You
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{user.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                          {user.department}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right font-medium">
                          {user.points} pts
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Added missing component declarations
const Moon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke={props.color || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
};

const Download = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke={props.color || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
};

const ExternalLink = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke={props.color || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
};

const FileText = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke={props.color || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
};

export default ProfilePage;