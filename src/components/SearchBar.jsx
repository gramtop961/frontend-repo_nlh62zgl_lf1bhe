import { useEffect, useMemo, useRef, useState } from 'react'
import { Search } from 'lucide-react'

const DATA = [
  // Lore
  { type: 'Lore', title: 'Hollow Knight', anchor: '#lore' },
  { type: 'Lore', title: 'Silksong', anchor: '#lore' },
  // Characters
  { type: 'Character', title: 'The Knight', anchor: '#characters' },
  { type: 'Character', title: 'Hornet', anchor: '#characters' },
  { type: 'Character', title: 'Radiance', anchor: '#characters' },
  { type: 'Character', title: 'Grimm', anchor: '#characters' },
  // Areas
  { type: 'Area', title: 'Greenpath', anchor: '#areas' },
  { type: 'Area', title: 'City of Tears', anchor: '#areas' },
  { type: 'Area', title: 'Crystal Peak', anchor: '#areas' },
  // Bosses
  { type: 'Boss', title: 'Soul Master', anchor: '#enemies' },
  { type: 'Boss', title: 'Watcher Knights', anchor: '#enemies' },
  { type: 'Boss', title: 'Radiance', anchor: '#enemies' },
  // Items
  { type: 'Item', title: 'Mothwing Cloak', anchor: '#items' },
  { type: 'Item', title: 'Mantis Claw', anchor: '#items' },
  { type: 'Item', title: 'Monarch Wings', anchor: '#items' },
  { type: 'Spell', title: 'Vengeful Spirit', anchor: '#items' },
  // Updates
  { type: 'Update', title: 'Silksong Latest Info', anchor: '#silksong' },
]

export default function SearchBar({ open, onClose }) {
  const [q, setQ] = useState('')
  const ref = useRef(null)

  useEffect(() => {
    if (open && ref.current) ref.current.focus()
  }, [open])

  const results = useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return DATA.slice(0, 8)
    return DATA.filter((d) =>
      d.title.toLowerCase().includes(s) || d.type.toLowerCase().includes(s)
    ).slice(0, 10)
  }, [q])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center pt-24 bg-slate-950/70 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-xl border border-white/10 bg-slate-900/80 shadow-2xl">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
          <Search size={18} className="text-cyan-200" />
          <input
            ref={ref}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search lore, characters, areas, bosses, items..."
            className="flex-1 bg-transparent outline-none text-slate-100 placeholder:text-slate-400"
          />
          <button onClick={onClose} className="text-slate-400 hover:text-slate-100">Close</button>
        </div>
        <ul className="max-h-80 overflow-y-auto divide-y divide-white/5">
          {results.map((r, i) => (
            <li key={i}>
              <a
                href={r.anchor}
                onClick={onClose}
                className="flex items-center justify-between px-4 py-3 hover:bg-white/5 text-slate-200"
              >
                <span>{r.title}</span>
                <span className="text-xs text-slate-400">{r.type}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
