import { cn } from '../../lib/cn'

export function Card({ className, children, ...props }) {
  return (
    <div
      className={cn(
        'rounded-xl border border-white/5 bg-[#0f1a2e]/60 backdrop-blur shadow-[0_8px_30px_rgba(0,0,0,0.25)]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ title, subtitle, action, className }) {
  return (
    <div
      className={cn(
        'flex items-start justify-between gap-4 border-b border-white/5 px-5 py-4',
        className
      )}
    >
      <div>
        <h3 className="text-sm font-semibold tracking-wide text-slate-100">
          {title}
        </h3>
        {subtitle && (
          <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>
        )}
      </div>
      {action}
    </div>
  )
}

export function Badge({ children, tone = 'default', className }) {
  const tones = {
    default: 'bg-slate-500/15 text-slate-300 border-slate-400/20',
    success: 'bg-emerald-500/15 text-emerald-300 border-emerald-400/20',
    warn: 'bg-amber-500/15 text-amber-300 border-amber-400/20',
    danger: 'bg-rose-500/15 text-rose-300 border-rose-400/20',
    info: 'bg-sky-500/15 text-sky-300 border-sky-400/20',
    violet: 'bg-violet-500/15 text-violet-300 border-violet-400/20',
  }
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider',
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  )
}
