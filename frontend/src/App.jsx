import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer.jsx'
import Navbar from './components/Navbar.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import ComplaintForm from './pages/ComplaintForm.jsx'
import Home from './pages/Home.jsx'
import TrackComplaint from './pages/TrackComplaint.jsx'

export default function App() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark')

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Navbar darkMode={darkMode} onToggleDarkMode={() => setDarkMode((value) => !value)} />
      <div className="min-h-[calc(100vh-137px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/submit" element={<ComplaintForm />} />
          <Route path="/track" element={<TrackComplaint />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}
