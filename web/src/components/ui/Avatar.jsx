import { useState } from 'react'
import { cn } from '../../lib/cn'

export function Avatar({ src, fallback, alt, className }) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return (
      <div
        className={cn(
          'grid place-items-center rounded-full bg-gradient-to-br from-slate-600 to-slate-900 font-bold text-slate-100',
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
