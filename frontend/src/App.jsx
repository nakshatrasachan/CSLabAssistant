import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Sorting from './pages/Sorting'
import Pathfinding from './pages/Pathfinding'
import GraphDistances from './pages/GraphDistances'
import CPUScheduling from './pages/CPUScheduling'
import MemoryPaging from './pages/MemoryPaging'
function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/visualize/sorting' element={<Sorting/>}/>
        <Route path='/visualize/pathfinding' element={<Pathfinding/>}/>
        <Route path='/visualize/graph' element={<GraphDistances/>}/>
        <Route path='/visualize/cpu-scheduling' element={<CPUScheduling/>}/>
        <Route path='/visualize/memory-paging' element={<MemoryPaging/>}/>
      </Routes>

    </Router>
      

  )
}

export default App
