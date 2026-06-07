import { useMemo, useState } from 'react'
import { Search, Scale } from 'lucide-react'
import { Card, Badge } from '../ui/Card'
import { charges } from '../../data/mock'

const classTone = {
  Felony: 'danger',
  Misdemeanor: 'warn',
  Infraction: 'info',
}

export function Charges() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return charges
    return charges.filter((c) =>
      [c.code, c.name, c.class].some((v) => v.toLowerCase().includes(q))
    )
  }, [query])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-50">Penal code</h1>
        <p className="text-sm text-slate-500">
          {charges.length} statutes on file. Search by code or offense name.
        </p>
      </div>

      <Card className="overflow-hidden">
        <div className="border-b border-white/[0.06] p-4">
          <div className="relative max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="PC.211, robbery…"
              className="w-full rounded-md border border-white/[0.06] bg-white/[0.03] py-2 pl-10 pr-4 text-sm text-slate-200 placeholder:text-slate-500 outline-none focus:border-sky-500/50 transition-colors"
            />
          </div>
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.06] text-[10px] uppercase tracking-wider text-slate-500">
              <th className="px-5 py-3 text-left font-medium">Code</th>
              <th className="px-5 py-3 text-left font-medium">Offense</th>
              <th className="px-5 py-3 text-left font-medium">Class</th>
              <th className="px-5 py-3 text-right font-medium">Max months</th>
              <th className="px-5 py-3 text-right font-medium">Max fine</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr
                key={c.code}
                className="border-b border-white/[0.06] last:border-0 hover:bg-white/[0.02] transition-colors"
              >
                <td className="px-5 py-3">
                  <span className="font-mono text-xs font-semibold text-sky-300">
                    {c.code}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <Scale className="h-3.5 w-3.5 text-slate-500" />
                    <span className="text-slate-100">{c.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3">
                  <Badge tone={classTone[c.class]}>{c.class}</Badge>
                </td>
                <td className="px-5 py-3 text-right font-mono text-slate-300 tabular-nums">
                  {c.months || '—'}
                </td>
                <td className="px-5 py-3 text-right font-mono text-slate-300 tabular-nums">
                  ${c.fine.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
