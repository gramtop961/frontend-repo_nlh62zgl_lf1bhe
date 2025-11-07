import { ChevronRight } from 'lucide-react'

const Section = ({ id, title, children, description }) => (
  <section id={id} className="relative py-20 bg-slate-950">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-cyan-100">{title}</h2>
        {description && (
          <p className="mt-2 text-slate-300 max-w-3xl">{description}</p>
        )}
      </div>
      <div className="grid gap-6">
        {children}
      </div>
    </div>
    <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
  </section>
)

export function LoreSection() {
  return (
    <Section
      id="lore"
      title="Lore & Story"
      description="Themes of sacrifice, imperfection, cycles, redemption, hierarchy, self‑discovery, and the tension between duty and freedom weave through Hallownest and Pharloom."
    >
      <div className="grid md:grid-cols-2 gap-6">
        <article className="rounded-xl border border-white/10 bg-gradient-to-b from-slate-900/60 to-slate-950 p-6 text-slate-200">
          <h3 className="text-xl font-semibold text-cyan-200">Hollow Knight</h3>
          <p className="mt-3 leading-7">
            In the fallen kingdom of Hallownest, a Pale King's experiment sought a vessel without will to contain the Infection—born of Radiance. The Knight wanders ruins of chitin and stone, descending through cities and gardens where duty often means sacrifice. Imperfection and memory echo in the hushed bells of Dirtmouth and the cathedral tunnels of the Abyss.
          </p>
        </article>
        <article className="rounded-xl border border-white/10 bg-gradient-to-b from-slate-900/60 to-slate-950 p-6 text-slate-200">
          <h3 className="text-xl font-semibold text-cyan-200">Silksong</h3>
          <p className="mt-3 leading-7">
            Drawn to Pharloom, Hornet is captured and climbs a kingdom strung with silk and ritual. Where Hallownest speaks of stasis, Pharloom hums with ascension and craft. The path is one of self‑discovery: a princess of thorns confronting lineage, skill, and the cost of freedom.
          </p>
        </article>
      </div>
    </Section>
  )
}

export function CharactersSection() {
  const rows = [
    { name: 'The Knight', origin: 'Hallownest (Abyss)', connections: 'Pale King, Hornet, Vessels', desc: 'A silent vessel born to contain the Radiance.' },
    { name: 'Hornet', origin: 'Hallownest / Pharloom', connections: 'Herrah, Pale King', desc: 'Protector of Hallownest; agile and sharp as silk.' },
    { name: 'Radiance', origin: 'Moth Tribe', connections: 'Moths, Infection', desc: 'Ancient light; source of the Infection.' },
    { name: 'Grimm', origin: 'Nightmare Realm', connections: 'Grimmchild, Troupe', desc: 'Master of a wandering troupe feeding on flame.' },
  ]
  return (
    <Section id="characters" title="Main Characters" description="Key figures, their origins, and their ties to the web of kingdoms.">
      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="min-w-full divide-y divide-white/10">
          <thead className="bg-slate-900/60">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-cyan-200">Character</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-cyan-200">Origin</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-cyan-200">Connections</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-cyan-200">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 bg-slate-950/60">
            {rows.map((r) => (
              <tr key={r.name} className="hover:bg-white/5">
                <td className="px-4 py-3 whitespace-nowrap text-slate-100">{r.name}</td>
                <td className="px-4 py-3 text-slate-300">{r.origin}</td>
                <td className="px-4 py-3 text-slate-300">{r.connections}</td>
                <td className="px-4 py-3 text-slate-300">{r.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  )
}

export function AreasSection() {
  const areas = [
    { name: 'Forgotten Crossroads', style: 'Dusty caverns, subdued blues', enemies: 'Crawlers, Husks' },
    { name: 'Greenpath', style: 'Lush moss, teal mists', enemies: 'Mosskin, Durandas' },
    { name: 'City of Tears', style: 'Endless rain, cobalt glow', enemies: 'Winged sentries, Lance guards' },
    { name: 'Crystal Peak', style: 'Luminous crystals, sharp magenta', enemies: 'Crystal crawlers, Chargers' },
  ]
  return (
    <Section id="areas" title="Areas & Maps" description="Visual styles and the creatures that haunt them.">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {areas.map((a) => (
          <div key={a.name} className="group relative rounded-xl border border-white/10 bg-gradient-to-b from-slate-900/60 to-slate-950 p-5 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.15),transparent_60%)] opacity-0 group-hover:opacity-100 transition pointer-events-none" />
            <h3 className="text-lg font-semibold text-cyan-200">{a.name}</h3>
            <p className="mt-2 text-slate-300 text-sm">Style: {a.style}</p>
            <p className="mt-1 text-slate-400 text-sm">Common Enemies: {a.enemies}</p>
            <a href="#enemies" className="mt-3 inline-flex items-center text-cyan-300 hover:text-white transition">
              View related <ChevronRight size={16} className="ml-1" />
            </a>
          </div>
        ))}
      </div>
    </Section>
  )
}

export function EnemiesSection() {
  const bosses = [
    { name: 'Hornet (Protector)', location: 'Greenpath', note: 'Teaches timing and spacing.' },
    { name: 'Soul Master', location: 'City of Tears', note: 'Phase tricks; soul usage.' },
    { name: 'Watcher Knights', location: 'City of Tears', note: 'Momentum and crowd control.' },
    { name: 'Radiance', location: 'Temple of the Black Egg', note: 'Endurance and platforming.' },
  ]
  return (
    <Section id="enemies" title="Bosses & Enemies" description="Foes, their lairs, and notes for the wary traveler.">
      <ul className="grid md:grid-cols-2 gap-4">
        {bosses.map((b) => (
          <li key={b.name} className="rounded-xl border border-white/10 bg-gradient-to-b from-slate-900/60 to-slate-950 p-5">
            <h4 className="text-cyan-100 font-semibold">{b.name}</h4>
            <p className="text-slate-300 text-sm mt-1">Location: {b.location}</p>
            <p className="text-slate-400 text-sm mt-1">Notes: {b.note}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}

export function ItemsSection() {
  const items = [
    { name: 'Mothwing Cloak', effect: 'Dash across gaps and attacks' },
    { name: 'Mantis Claw', effect: 'Cling and leap from walls' },
    { name: 'Monarch Wings', effect: 'Double jump with pale grace' },
    { name: 'Vengeful Spirit', effect: 'Spell that burns with soul' },
  ]
  return (
    <Section id="items" title="Items & Abilities" description="Relics and skills that shape the journey.">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((i) => (
          <div key={i.name} className="rounded-xl border border-white/10 bg-gradient-to-b from-slate-900/60 to-slate-950 p-5">
            <h4 className="text-cyan-100 font-semibold">{i.name}</h4>
            <p className="text-slate-300 text-sm mt-2">Effect: {i.effect}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}

export function SilksongSection() {
  const items = [
    { label: 'Developer', value: 'Team Cherry' },
    { label: 'Status', value: 'In development; no release date announced' },
    { label: 'Platforms', value: 'PC, Nintendo Switch, Xbox, PlayStation (planned)' },
    { label: 'Composer', value: 'Christopher Larkin' },
    { label: 'Focus', value: 'Agile traversal, crafting with silk, quest‑driven structure' },
    { label: 'Themes', value: 'Ascent, ritual, lineage, and the burden of purpose' },
  ]
  return (
    <Section id="silksong" title="Silksong Updates" description="Collected notes and official tidbits on Hornet’s ascent in Pharloom.">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-white/10 bg-gradient-to-b from-slate-900/60 to-slate-950 p-6">
          <h3 className="text-cyan-100 font-semibold">Latest Info</h3>
          <ul className="mt-3 space-y-2 text-slate-300">
            {items.map((i) => (
              <li key={i.label} className="flex items-center justify-between gap-4">
                <span>{i.label}</span>
                <span className="text-slate-200">{i.value}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-white/10 bg-gradient-to-b from-slate-900/60 to-slate-950 p-6">
          <h3 className="text-cyan-100 font-semibold">Community & News</h3>
          <p className="mt-2 text-slate-300 text-sm leading-7">
            Stay tuned for official blog posts, developer comments, and curated theories. The world of Pharloom continues to take shape—new tools, silk arts, and a focus on quests suggest a more guided but still mysterious journey.
          </p>
        </div>
      </div>
    </Section>
  )
}
