import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Sidebar } from './components/Sidebar'
import { TopBar } from './components/TopBar'
import { Dashboard } from './components/views/Dashboard'
import { Citizens } from './components/views/Citizens'
import { Vehicles } from './components/views/Vehicles'
import { Warrants } from './components/views/Warrants'
import { Reports } from './components/views/Reports'
import { Dispatch } from './components/views/Dispatch'
import { Charges } from './components/views/Charges'

const views = {
  dashboard: Dashboard,
  citizens: Citizens,
  vehicles: Vehicles,
  warrants: Warrants,
  reports: Reports,
  dispatch: Dispatch,
  charges: Charges,
}

export default function App() {
  const [active, setActive] = useState('dashboard')
  const View = views[active]

  return (
    <div className="relative flex h-screen w-screen overflow-hidden bg-[#070b15] text-slate-100 font-sans antialiased">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute top-1/3 -right-40 h-[500px] w-[500px] rounded-full bg-sky-500/10 blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-indigo-700/10 blur-[120px]" />
      </div>

      <Sidebar active={active} onChange={setActive} />

      <div className="relative flex flex-1 flex-col overflow-hidden">
        <TopBar />

        <main className="flex-1 overflow-y-auto px-8 py-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
            >
              <View />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
