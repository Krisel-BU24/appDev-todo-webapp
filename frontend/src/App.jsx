import { Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import ToDo from './pages/ToDo'

function App() {

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/to-do" element={<ToDo />} />
    </Routes>
  )
}

export default App
