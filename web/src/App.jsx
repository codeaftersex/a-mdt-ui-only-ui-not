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
    <div className="relative flex h-screen w-screen overflow-hidden bg-[#0a0b0f] text-slate-100 font-sans antialiased">
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
