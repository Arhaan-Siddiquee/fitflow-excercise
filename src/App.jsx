import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Dashboard from './pages/Dashboard'
import Workout from './pages/Workout'
import Tutorials from './pages/PersonalizedExcercise'
import DietPlan from './pages/DietPlan'
import Squart from './pages/Excercise/Squart'
import Pushup from './pages/Excercise/Pushup'
import PullUp from './pages/Excercise/Pullup'
import Shoulderpress from './pages/Excercise/Shoulderpress'
import BicepCurl from './pages/Excercise/Bicepcurl'
import Frontraises from './pages/Excercise/Frontraises'
import Lunges from './pages/Excercise/Lunges'
import Morning from './pages/Excercise/Morning'
import HighKnees from './pages/Excercise/HighKnees'
import Knee from './pages/Excercise/DeskExcercise/Knee'
import DeskCurls from './pages/Excercise/DeskExcercise/DeskCurls'
import Hand from './pages/Excercise/DeskExcercise/Hand'

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/workout" element={<Workout />} />
          <Route path="/tutorials" element={<Tutorials />} />
          <Route path="/diet-plan" element={<DietPlan />} />
          <Route path="/lower-body/squats" element={<Squart />} />
          <Route path="/upper-body/pushup" element={<Pushup />} />
          <Route path="/upper-body/pullup" element={<PullUp />} />
          <Route path="/upper-body/shoulder-press" element={<Shoulderpress />} />
          <Route path="/upper-body/bicep-curls" element={<BicepCurl />} />
          <Route path="/upper-body/front-raises" element={<Frontraises />} />
          <Route path="/lower-body/lunges" element={<Lunges />} />\
          <Route path="/lower-body/morning" element={<Morning />} />
          <Route path="/lower-body/highknees" element={<HighKnees />} />

          <Route path="/desk/knee" element={<Knee />} />\
          <Route path="/desk/curls" element={<DeskCurls />} />
          <Route path="/desk/hand" element={<Hand />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App