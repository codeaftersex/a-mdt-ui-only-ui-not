import { useState } from 'react'
import { cn } from '../../lib/cn'

export function Avatar({ src, fallback, alt, className }) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return (
      <div
        className={cn(
          'grid place-items-center rounded-full bg-[#1c1e26] ring-1 ring-white/[0.06] font-semibold text-slate-300',
          className
        )}
      >
        {fallback}
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={cn('rounded-full object-cover bg-slate-800', className)}
    />
  )
}
