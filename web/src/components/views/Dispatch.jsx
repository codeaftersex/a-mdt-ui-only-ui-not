import { motion } from 'framer-motion'
import { MapPin, Radio, Users, Clock } from 'lucide-react'
import { Card, CardHeader, Badge } from '../ui/Card'
import { dispatch } from '../../data/mock'

const priorityTone = { 1: 'danger', 2: 'warn', 3: 'info' }
const priorityBorder = {
  1: 'border-rose-500/30',
  2: 'border-amber-500/30',
  3: 'border-sky-500/20',
}

export function Dispatch() {
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-50">Active dispatch</h1>
          <p className="text-sm text-slate-500 flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-rose-400" />
            {dispatch.length} active calls for service
          </p>
        </div>
        <button className="rounded-md bg-rose-500/15 px-3 py-2 text-xs font-semibold text-rose-300 hover:bg-rose-500/25 transition-colors border border-rose-500/30">
          Panic button
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {dispatch.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className={`overflow-hidden ${priorityBorder[c.priority]}`}>
              <div className="flex items-stretch">
                <div
                  className={`flex w-20 flex-col items-center justify-center gap-0.5 border-r border-white/[0.06] ${
                    c.priority === 1
                      ? 'bg-rose-500/10'
                      : c.priority === 2
                      ? 'bg-amber-500/10'
                      : 'bg-sky-500/10'
                  }`}
                >
                  <div
                    className={`font-mono text-sm font-bold ${
                      c.priority === 1
                        ? 'text-rose-300'
                        : c.priority === 2
                        ? 'text-amber-300'
                        : 'text-sky-300'
                    }`}
                  >
                    {c.code}
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-400">
                    P{c.priority}
                  </div>
                </div>
                <div className="flex-1 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-semibold text-slate-50 leading-tight">
                      {c.title}
                    </h3>
                    <Badge tone={priorityTone[c.priority]}>P{c.priority}</Badge>
                  </div>
                  <div className="mt-1.5 flex items-center gap-1 text-xs text-slate-400">
                    <MapPin className="h-3 w-3" /> {c.location}
                  </div>
                  <p className="mt-3 text-xs text-slate-400 leading-relaxed line-clamp-2">
                    {c.notes}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-white/[0.06] bg-[#0f1015] px-4 py-2.5">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <Users className="h-3 w-3 text-emerald-400" />
                  <span className="font-mono">{c.units.join(' · ')}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                  <Clock className="h-3 w-3" /> {c.time}
                </div>
              </div>

              <div className="flex divide-x divide-white/[0.06] border-t border-white/[0.06]">
                <button className="flex-1 py-2.5 text-xs font-medium text-emerald-300 hover:bg-emerald-500/10 transition-colors">
                  <Radio className="mr-1 inline h-3 w-3" /> Attach
                </button>
                <button className="flex-1 py-2.5 text-xs font-medium text-slate-300 hover:bg-white/[0.04] transition-colors">
                  Details
                </button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
