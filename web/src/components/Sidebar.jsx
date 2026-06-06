import {
  LayoutDashboard,
  Users,
  Car,
  FileWarning,
  ClipboardList,
  Radio,
  Scale,
  Shield,
  LogOut,
} from 'lucide-react'
import { cn } from '../lib/cn'

const items = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'citizens', label: 'Citizens', icon: Users },
  { id: 'vehicles', label: 'Vehicles', icon: Car },
  { id: 'warrants', label: 'Warrants', icon: FileWarning },
  { id: 'reports', label: 'Reports', icon: ClipboardList },
  { id: 'dispatch', label: 'Dispatch', icon: Radio },
  { id: 'charges', label: 'Penal Code', icon: Scale },
]

export function Sidebar({ active, onChange }) {
  return (
    <aside className="flex w-60 flex-col border-r border-white/5 bg-[#0b1220]/80 backdrop-blur">
      <div className="flex items-center gap-3 px-5 py-5 border-b border-white/5">
        <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-sky-500 to-blue-700 shadow-lg shadow-blue-900/40">
          <Shield className="h-5 w-5 text-white" strokeWidth={2.4} />
        </div>
        <div>
          <div className="text-sm font-semibold tracking-wide text-white">
            LSPD MDT
          </div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-sky-400/70">
            Terminal v3.2
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = active === item.id
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className={cn(
                'group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all',
                isActive
                  ? 'bg-gradient-to-r from-sky-500/20 to-transparent text-white shadow-inner'
                  : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
              )}
            >
              <Icon
                className={cn(
                  'h-4 w-4 shrink-0 transition-colors',
                  isActive ? 'text-sky-400' : 'text-slate-500 group-hover:text-slate-300'
                )}
              />
              <span className="font-medium tracking-wide">{item.label}</span>
              {isActive && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
              )}
            </button>
          )
        })}
      </nav>

      <div className="border-t border-white/5 p-3">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-400 hover:bg-red-500/10 hover:text-red-300 transition-colors">
          <LogOut className="h-4 w-4" />
          <span>End shift</span>
        </button>
      </div>
    </aside>
  )
}
