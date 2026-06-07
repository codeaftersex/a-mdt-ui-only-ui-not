import { useEffect, useState } from 'react'
import { Bell, Search, Wifi, Battery, CloudSun } from 'lucide-react'
import { Avatar } from './ui/Avatar'
import { officer } from '../data/mock'

function useClock() {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return now
}

export function TopBar() {
  const now = useClock()
  const time = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })
  const date = now.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })

  return (
    <header className="flex h-14 items-center gap-4 border-b border-white/[0.06] bg-[#0d0e13] px-6">
      <div className="relative flex-1 max-w-xl">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
        <input
          placeholder="Search name, license, plate, report #…"
          className="w-full rounded-md border border-white/[0.06] bg-white/[0.03] py-2 pl-10 pr-4 text-sm text-slate-200 placeholder:text-slate-500 outline-none focus:border-sky-500/50 focus:bg-white/[0.05] transition-colors"
        />
      </div>

      <div className="hidden md:flex items-center gap-5 text-xs text-slate-400">
        <div className="flex items-center gap-1.5">
          <CloudSun className="h-3.5 w-3.5 text-amber-400" />
          <span>72°F</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Wifi className="h-3.5 w-3.5 text-emerald-400" />
          <span>LSPD-Net</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Battery className="h-3.5 w-3.5 text-emerald-400" />
          <span>87%</span>
        </div>
      </div>

      <div className="flex items-center gap-3 border-l border-white/[0.06] pl-4">
        <button className="relative grid h-9 w-9 place-items-center rounded-md border border-white/[0.06] bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
          <Bell className="h-4 w-4 text-slate-300" />
          <span className="absolute -top-0.5 -right-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-rose-500 px-1 text-[9px] font-bold text-white">
            3
          </span>
        </button>

        <div className="text-right">
          <div className="font-mono text-sm font-semibold text-slate-100 tabular-nums">
            {time}
          </div>
          <div className="text-[10px] uppercase tracking-wider text-slate-500">
            {date}
          </div>
        </div>

        <div className="flex items-center gap-2.5 rounded-md border border-white/[0.06] bg-white/[0.03] px-3 py-1.5">
          <Avatar
            src={officer.photo}
            fallback="JR"
            alt={officer.name}
            className="h-7 w-7 text-[10px]"
          />
          <div className="leading-tight">
            <div className="text-[12px] font-semibold text-slate-100">
              {officer.callsign}
            </div>
            <div className="text-[10px] text-emerald-400">
              {officer.status} · {officer.rank}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
