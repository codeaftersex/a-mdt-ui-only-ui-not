import { motion } from 'framer-motion'
import { Gavel, AlertTriangle, Calendar, DollarSign } from 'lucide-react'
import { Card, CardHeader, Badge } from '../ui/Card'
import { warrants } from '../../data/mock'

export function Warrants() {
  const high = warrants.filter((w) => w.priority === 'high')
  const medium = warrants.filter((w) => w.priority === 'medium')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-50">Active warrants</h1>
        <p className="text-sm text-slate-500">
          {warrants.length} active warrants · {high.length} high priority
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-2">
        {warrants.map((w, i) => (
          <motion.div
            key={w.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
          >
            <Card className="overflow-hidden">
              <div
                className={`h-0.5 w-full ${
                  w.priority === 'high' ? 'bg-rose-500' : 'bg-amber-500'
                }`}
              />
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] text-slate-500">{w.id}</span>
                      <Badge tone={w.priority === 'high' ? 'danger' : 'warn'}>
                        {w.priority === 'high' && (
                          <AlertTriangle className="h-3 w-3" />
                        )}
                        {w.priority} priority
                      </Badge>
                    </div>
                    <h3 className="mt-1.5 text-lg font-semibold text-slate-50">
                      {w.citizen}
                    </h3>
                  </div>
                  <button className="rounded-md bg-sky-500/15 px-3 py-1.5 text-xs font-medium text-sky-300 hover:bg-sky-500/25 transition-colors">
                    Execute
                  </button>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {w.charges.map((c) => (
                    <span
                      key={c}
                      className="rounded-md bg-white/[0.04] px-2 py-1 text-[11px] text-slate-300 border border-white/[0.06]"
                    >
                      <Gavel className="mr-1 inline h-2.5 w-2.5 text-slate-500" />
                      {c}
                    </span>
                  ))}
                </div>

                <div className="mt-5 grid grid-cols-3 gap-3 border-t border-white/[0.06] pt-4 text-xs">
                  <div>
                    <div className="flex items-center gap-1 text-slate-500">
                      <Calendar className="h-3 w-3" /> Issued
                    </div>
                    <div className="mt-0.5 font-mono text-slate-200">{w.issued}</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-slate-500">
                      <Calendar className="h-3 w-3" /> Expires
                    </div>
                    <div className="mt-0.5 font-mono text-slate-200">{w.expires}</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-slate-500">
                      <DollarSign className="h-3 w-3" /> Bond
                    </div>
                    <div className="mt-0.5 font-mono text-slate-200">
                      {w.bond ? `$${w.bond.toLocaleString()}` : 'No bond'}
                    </div>
                  </div>
                </div>

                <div className="mt-3 text-[11px] text-slate-500">
                  Issued by {w.judge}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
