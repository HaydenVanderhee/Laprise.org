import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LandingPage } from './components/LandingPage'
import { BookPage } from './components/BookPage'
import { ContactPage } from './components/ContactPage'

function NewHomePage() {
  return (
    <div
      className="bg-deep-space"
      style={{ minHeight: '100vh', position: 'relative' }}
    >
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.0, ease: 'easeOut', delay: 0.1 }}
        style={{ position: 'fixed', inset: 0, zIndex: 200, background: '#F7FAFB', pointerEvents: 'none' }}
      />
      <LandingPage />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NewHomePage />} />
        <Route path="/book" element={<BookPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
