import { useEffect, useRef, useState } from 'react'
import { Moon, Sun, Music2, VolumeX } from 'lucide-react'

// Dark theme helper
const applyTheme = (isDark) => {
  const root = window.document.documentElement
  if (isDark) root.classList.add('dark')
  else root.classList.remove('dark')
  localStorage.setItem('hk-theme', isDark ? 'dark' : 'light')
}

export default function Navbar({ onSearchFocus }) {
  const [darkMode, setDarkMode] = useState(() => {
    const pref = localStorage.getItem('hk-theme')
    if (pref) return pref === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  const [ambientOn, setAmbientOn] = useState(false)
  const audioCtxRef = useRef(null)
  const nodesRef = useRef([])

  useEffect(() => {
    applyTheme(darkMode)
  }, [darkMode])

  // Simple generative ambient via WebAudio (soft pads + noise)
  const startAmbient = async () => {
    if (audioCtxRef.current) return
    const ctx = new (window.AudioContext || window.webkitAudioContext)()

    const masterGain = ctx.createGain()
    masterGain.gain.value = 0.08
    masterGain.connect(ctx.destination)

    const createPad = (freq) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, ctx.currentTime)
      // slow detune drift
      const lfo = ctx.createOscillator()
      const lfoGain = ctx.createGain()
      lfo.frequency.value = 0.05
      lfoGain.gain.value = 8
      lfo.connect(lfoGain)
      lfoGain.connect(osc.detune)

      gain.gain.value = 0
      osc.connect(gain)
      gain.connect(masterGain)

      osc.start()
      lfo.start()

      // fade in
      gain.gain.linearRampToValueAtTime(1, ctx.currentTime + 6)
      return { osc, gain, lfo, lfoGain }
    }

    const pads = [createPad(196), createPad(261.63), createPad(329.63)] // G minor-ish mood

    // gentle noise for cave ambience
    const bufferSize = 2 * ctx.sampleRate
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = noiseBuffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.2
    }
    const noise = ctx.createBufferSource()
    noise.buffer = noiseBuffer
    const noiseFilter = ctx.createBiquadFilter()
    noiseFilter.type = 'lowpass'
    noiseFilter.frequency.value = 800
    const noiseGain = ctx.createGain()
    noiseGain.gain.value = 0.05
    noise.connect(noiseFilter)
    noiseFilter.connect(noiseGain)
    noiseGain.connect(masterGain)
    noise.loop = true
    noise.start()

    audioCtxRef.current = ctx
    nodesRef.current = [...pads, { noise, noiseGain, noiseFilter }, masterGain]
  }

  const stopAmbient = () => {
    const ctx = audioCtxRef.current
    if (!ctx) return
    nodesRef.current.forEach((n) => {
      if (n.gain && n.gain.gain) {
        try { n.gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 2) } catch {}
      }
      if (n.noiseGain && n.noiseGain.gain) {
        try { n.noiseGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 2) } catch {}
      }
      if (n.osc) {
        setTimeout(() => { try { n.osc.stop() } catch {} }, 2200)
      }
      if (n.noise) {
        setTimeout(() => { try { n.noise.stop() } catch {} }, 2200)
      }
    })
    setTimeout(() => {
      try { ctx.close() } catch {}
      audioCtxRef.current = null
      nodesRef.current = []
    }, 2300)
  }

  useEffect(() => {
    if (ambientOn) startAmbient()
    else stopAmbient()
    // cleanup when component unmounts
    return () => stopAmbient()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ambientOn])

  const NavLink = ({ href, children }) => (
    <a href={href} className="px-3 py-2 text-sm md:text-base text-cyan-200/90 hover:text-white transition-colors">
      {children}
    </a>
  )

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur bg-slate-900/60 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <span className="text-xl font-semibold tracking-wider text-cyan-200">Hollowpedia</span>
            <span className="hidden md:inline text-xs text-slate-300/70 italic">Hallownest & Pharloom Archive</span>
          </div>
          <nav className="hidden md:flex items-center">
            <NavLink href="#lore">Lore & Story</NavLink>
            <NavLink href="#characters">Characters</NavLink>
            <NavLink href="#areas">Areas & Maps</NavLink>
            <NavLink href="#enemies">Bosses & Enemies</NavLink>
            <NavLink href="#items">Items & Abilities</NavLink>
            <NavLink href="#silksong">Silksong Updates</NavLink>
          </nav>
          <div className="flex items-center gap-2">
            <button
              aria-label="Ambient music toggle"
              onClick={() => setAmbientOn((v) => !v)}
              className={`inline-flex items-center gap-1 px-2 py-1 rounded-md border border-white/10 text-cyan-200/90 hover:text-white hover:bg-white/5 transition ${ambientOn ? 'bg-white/10' : ''}`}
            >
              {ambientOn ? <Music2 size={18} /> : <VolumeX size={18} />}
              <span className="hidden md:inline text-sm">Ambient</span>
            </button>
            <button
              aria-label="Theme toggle"
              onClick={() => setDarkMode((d) => !d)}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-md border border-white/10 text-cyan-200/90 hover:text-white hover:bg-white/5 transition"
            >
              {darkMode ? <Moon size={18} /> : <Sun size={18} />}
              <span className="hidden md:inline text-sm">{darkMode ? 'Dark' : 'Light'}</span>
            </button>
            <button
              onClick={onSearchFocus}
              className="hidden sm:inline-flex ml-2 px-3 py-1.5 text-sm rounded-md bg-cyan-500/20 text-cyan-100 border border-cyan-400/30 hover:bg-cyan-400/30 transition"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
