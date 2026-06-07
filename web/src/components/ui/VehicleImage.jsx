import { useState } from 'react'
import { Car } from 'lucide-react'
import { cn } from '../../lib/cn'

const primary = (m) =>
  `https://raw.githubusercontent.com/matthias18771/v-vehicle-images/main/${m}.png`
const fallback = (m) =>
  `https://raw.githubusercontent.com/MericcaN41/gta5carimages/main/images/${m}.png`

export function VehicleImage({ spawnName, alt, className }) {
  const [stage, setStage] = useState(0)
  const src = stage === 0 ? primary(spawnName) : fallback(spawnName)

  if (stage > 1) {
    return (
      <div
        className={cn(
          'grid place-items-center rounded-md bg-[#0f1015] border border-white/[0.06]',
          className
        )}
      >
        <Car className="h-6 w-6 text-slate-600" />
      </div>
    )
  }

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-md bg-[#0f1015] border border-white/[0.06]',
        className
      )}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={() => setStage((s) => s + 1)}
        className="h-full w-full object-contain object-center transition-opacity"
      />
    </div>
  )
}
