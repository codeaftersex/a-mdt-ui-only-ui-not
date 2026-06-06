import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Phone,
  MapPin,
  Calendar,
  IdCard,
  ShieldAlert,
  FileText,
  Gavel,
  Cigarette,
} from 'lucide-react'
import { Card, CardHeader, Badge } from '../ui/Card'
import { Avatar } from '../ui/Avatar'
import { citizens } from '../../data/mock'

const flagTone = {
  violent: 'danger',
  gang: 'danger',
  warrant: 'danger',
  armed: 'danger',
  dui: 'warn',
  ccw: 'info',
}

export function Citizens() {
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState(citizens[0].id)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return citizens
    return citizens.filter((c) =>
      [c.firstName, c.lastName, c.address, c.phone].some((v) =>
        v.toLowerCase().includes(q)
      )
    )
  }, [query])

  const selected = citizens.find((c) => c.id === selectedId) ?? filtered[0]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-50">Citizen records</h1>
        <p className="text-sm text-slate-500">
          Search by name, address, license, or phone number.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
        <Card className="overflow-hidden">
          <div className="border-b border-white/5 p-4">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search records…"
                className="w-full rounded-md border border-white/5 bg-white/[0.03] py-2 pl-10 pr-4 text-sm text-slate-200 placeholder:text-slate-500 outline-none focus:border-sky-500/50 transition-colors"
              />
            </div>
            <div className="mt-3 flex items-center justify-between text-[10px] uppercase tracking-wider text-slate-500">
              <span>{filtered.length} results</span>
              <span>Sorted by relevance</span>
            </div>
          </div>

          <ul className="max-h-[640px] divide-y divide-white/5 overflow-y-auto">
            {filtered.map((c) => {
              const active = c.id === selectedId
              return (
                <li key={c.id}>
                  <button
                    onClick={() => setSelectedId(c.id)}
                    className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors ${
                      active
                        ? 'bg-sky-500/10'
                        : 'hover:bg-white/[0.03]'
                    }`}
                  >
                    <Avatar
                      src={c.photo}
                      fallback={c.avatar}
                      alt={`${c.firstName} ${c.lastName}`}
                      className="h-10 w-10 shrink-0 text-xs"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="truncate text-sm font-semibold text-slate-100">
                          {c.firstName} {c.lastName}
                        </span>
                        {c.flags.includes('warrant') && (
                          <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-rose-500/20">
                            <ShieldAlert className="h-2.5 w-2.5 text-rose-300" />
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate">
                        DOB {c.dob} · {c.address.split(',')[0]}
                      </div>
                    </div>
                    {c.charges > 0 && (
                      <Badge tone="danger">{c.charges}</Badge>
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        </Card>

        <AnimatePresence mode="wait">
          {selected && (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="space-y-6"
            >
              <Card>
                <div className="relative overflow-hidden p-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-transparent to-transparent" />
                  <div className="relative flex items-start gap-5">
                    <Avatar
                      src={selected.photo}
                      fallback={selected.avatar}
                      alt={`${selected.firstName} ${selected.lastName}`}
                      className="h-20 w-20 shrink-0 rounded-xl text-xl shadow-lg"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl font-semibold text-slate-50">
                          {selected.firstName} {selected.lastName}
                        </h2>
                        {selected.flags.map((f) => (
                          <Badge key={f} tone={flagTone[f] ?? 'default'}>
                            {f}
                          </Badge>
                        ))}
                      </div>
                      <div className="mt-2 grid grid-cols-2 gap-y-1.5 gap-x-6 text-xs text-slate-400">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3 w-3" /> DOB {selected.dob} ({selected.gender})
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Phone className="h-3 w-3" /> {selected.phone}
                        </div>
                        <div className="flex items-center gap-1.5 col-span-2">
                          <MapPin className="h-3 w-3" /> {selected.address}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="grid gap-6 md:grid-cols-3">
                <Card>
                  <CardHeader title="Driver's license" />
                  <div className="space-y-3 px-5 py-4 text-sm">
                    <Row icon={IdCard} label="Class" value={selected.licenseClass} />
                    <Row
                      label="Status"
                      value={
                        <Badge
                          tone={
                            selected.licenseStatus === 'Valid'
                              ? 'success'
                              : selected.licenseStatus === 'Suspended'
                              ? 'warn'
                              : 'danger'
                          }
                        >
                          {selected.licenseStatus}
                        </Badge>
                      }
                    />
                    <Row label="Insurance" value={selected.insurance} />
                  </div>
                </Card>

                <Card>
                  <CardHeader title="Criminal summary" />
                  <div className="space-y-3 px-5 py-4 text-sm">
                    <Row icon={Gavel} label="Convictions" value={selected.charges} />
                    <Row icon={FileText} label="Reports" value={selected.charges * 2} />
                    <Row icon={Cigarette} label="Last arrest" value="2026-03-14" />
                  </div>
                </Card>

                <Card>
                  <CardHeader title="Officer notes" />
                  <div className="px-5 py-4 text-sm text-slate-300 leading-relaxed">
                    {selected.notes}
                  </div>
                </Card>
              </div>

              <Card>
                <CardHeader
                  title="Recent activity"
                  action={
                    <button className="rounded-md bg-sky-500/15 px-3 py-1 text-xs font-medium text-sky-300 hover:bg-sky-500/25 transition-colors">
                      New report
                    </button>
                  }
                />
                <ul className="divide-y divide-white/5">
                  {[
                    { type: 'Traffic stop', date: '2026-05-29', officer: 'J. Reynolds', tone: 'info' },
                    { type: 'Field interview', date: '2026-04-12', officer: 'K. Tanaka', tone: 'default' },
                    { type: 'Arrest — possession', date: '2026-03-14', officer: 'M. Nguyen', tone: 'danger' },
                  ].map((a, i) => (
                    <li key={i} className="flex items-center gap-4 px-5 py-3">
                      <Badge tone={a.tone}>{a.type}</Badge>
                      <span className="text-xs text-slate-400">{a.date}</span>
                      <span className="ml-auto text-xs text-slate-500">
                        Reporting officer: {a.officer}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function Row({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between gap-3 text-xs">
      <div className="flex items-center gap-2 text-slate-500">
        {Icon && <Icon className="h-3.5 w-3.5" />}
        <span className="uppercase tracking-wider">{label}</span>
      </div>
      <div className="text-slate-200 font-medium">{value}</div>
    </div>
  )
}
