import { useMemo, useState } from 'react'
import { Search, AlertTriangle, Lock } from 'lucide-react'
import { Card, CardHeader, Badge } from '../ui/Card'
import { VehicleImage } from '../ui/VehicleImage'
import { vehicles } from '../../data/mock'

export function Vehicles() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return vehicles
    return vehicles.filter((v) =>
      [v.plate, v.model, v.owner, v.color].some((x) => x.toLowerCase().includes(q))
    )
  }, [query])

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-50">Vehicle registry</h1>
          <p className="text-sm text-slate-500">
            Search by plate, owner, or model. {vehicles.filter((v) => v.stolen).length} stolen
            vehicles on file.
          </p>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="border-b border-white/5 p-4">
          <div className="relative max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Plate, model, owner…"
              className="w-full rounded-md border border-white/5 bg-white/[0.03] py-2 pl-10 pr-4 text-sm text-slate-200 placeholder:text-slate-500 outline-none focus:border-sky-500/50 transition-colors"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5 text-[10px] uppercase tracking-wider text-slate-500">
                <th className="px-5 py-3 text-left font-medium">Plate</th>
                <th className="px-5 py-3 text-left font-medium">Vehicle</th>
                <th className="px-5 py-3 text-left font-medium">Owner</th>
                <th className="px-5 py-3 text-left font-medium">Registration</th>
                <th className="px-5 py-3 text-left font-medium">Insurance</th>
                <th className="px-5 py-3 text-left font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((v) => (
                <tr
                  key={v.id}
                  className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-5 py-3">
                    <div className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-slate-900/80 px-2.5 py-1 font-mono text-xs font-bold tracking-widest text-slate-100">
                      {v.plate}
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <VehicleImage
                        spawnName={v.spawnName}
                        alt={v.model}
                        className="h-12 w-20 shrink-0"
                      />
                      <div>
                        <div className="font-medium text-slate-100">{v.model}</div>
                        <div className="text-[10px] text-slate-500">
                          {v.year} · {v.color}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-slate-300">{v.owner}</td>
                  <td className="px-5 py-3">
                    <Badge tone={v.registration === 'Valid' ? 'success' : 'danger'}>
                      {v.registration}
                    </Badge>
                  </td>
                  <td className="px-5 py-3">
                    <Badge
                      tone={
                        v.insurance === 'Active'
                          ? 'success'
                          : v.insurance === 'Expired'
                          ? 'warn'
                          : 'danger'
                      }
                    >
                      {v.insurance}
                    </Badge>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex flex-wrap gap-1.5">
                      {v.stolen && (
                        <Badge tone="danger">
                          <AlertTriangle className="h-3 w-3" /> Stolen
                        </Badge>
                      )}
                      {v.impounded && (
                        <Badge tone="warn">
                          <Lock className="h-3 w-3" /> Impounded
                        </Badge>
                      )}
                      {!v.stolen && !v.impounded && (
                        <Badge tone="success">Clear</Badge>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
