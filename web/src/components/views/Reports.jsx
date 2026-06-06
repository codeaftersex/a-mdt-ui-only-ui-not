import { motion } from 'framer-motion'
import { Plus, FileText, Filter } from 'lucide-react'
import { Card, CardHeader, Badge } from '../ui/Card'
import { reports } from '../../data/mock'

const statusTone = {
  Open: 'danger',
  'Under review': 'warn',
  Closed: 'success',
}

const typeTone = {
  Incident: 'danger',
  Citation: 'info',
  Service: 'default',
}

export function Reports() {
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-50">Reports</h1>
          <p className="text-sm text-slate-500">
            {reports.length} reports logged · {reports.filter((r) => r.status === 'Open').length} open
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 rounded-md border border-white/5 bg-white/[0.03] px-3 py-2 text-xs font-medium text-slate-300 hover:bg-white/[0.06] transition-colors">
            <Filter className="h-3.5 w-3.5" /> Filter
          </button>
          <button className="flex items-center gap-1.5 rounded-md bg-sky-500 px-3 py-2 text-xs font-semibold text-white hover:bg-sky-400 shadow-lg shadow-sky-900/30 transition-colors">
            <Plus className="h-3.5 w-3.5" /> New report
          </button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {reports.map((r, i) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
          >
            <Card className="h-full">
              <div className="p-5">
                <div className="flex items-start gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-sky-500/30 to-blue-700/30">
                    <FileText className="h-5 w-5 text-sky-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] text-slate-500">
                        {r.id}
                      </span>
                      <Badge tone={typeTone[r.type]}>{r.type}</Badge>
                      <Badge tone={statusTone[r.status]}>{r.status}</Badge>
                    </div>
                    <h3 className="mt-1 text-base font-semibold text-slate-50 truncate">
                      {r.title}
                    </h3>
                  </div>
                </div>

                <p className="mt-3 text-sm text-slate-400 leading-relaxed line-clamp-2">
                  {r.summary}
                </p>

                <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3 text-[11px] text-slate-500">
                  <span>
                    {r.author} · {r.date}
                  </span>
                  <span>{r.suspects} suspect{r.suspects === 1 ? '' : 's'}</span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
