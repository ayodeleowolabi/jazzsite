import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home    from './pages/Home'
import About   from './pages/About'
import Music   from './pages/Music'
import Live    from './pages/Live'
import Press   from './pages/Press'
import Contact from './pages/Contact'
import SwingSoulSamba from './pages/SwingSoulSamba'

function AppInner() {
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/album') return
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true })
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [location.pathname])

  const isAlbum = location.pathname === '/album'

  return (
    <>
      {!isAlbum && <Navbar />}
      <Routes>
        <Route path="/album"   element={<SwingSoulSamba />} />
        <Route path="/"        element={<Home />} />
        <Route path="/about"   element={<About />} />
        <Route path="/music"   element={<Music />} />
        <Route path="/live"    element={<Live />} />
        <Route path="/press"   element={<Press />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      {!isAlbum && <Footer />}
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  )
}