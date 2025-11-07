import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SearchBar from './components/SearchBar'
import { LoreSection, CharactersSection, AreasSection, EnemiesSection, ItemsSection, SilksongSection } from './components/Sections'

function App() {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar onSearchFocus={() => setSearchOpen(true)} />
      <main className="pt-16">
        <Hero />
        <LoreSection />
        <CharactersSection />
        <AreasSection />
        <EnemiesSection />
        <ItemsSection />
        <SilksongSection />
      </main>
      <SearchBar open={searchOpen} onClose={() => setSearchOpen(false)} />
      <footer className="border-t border-white/10 bg-slate-950/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-slate-400 text-sm">
          Fan-made wiki inspired by the worlds of Team Cherry. This site is not affiliated with or endorsed by the developer.
        </div>
      </footer>
    </div>
  )
}

export default App
