import { Users } from 'lucide-react'

interface StatsBoxProps {
  icon?: React.ReactNode
  value: string | number
  label: string
}

export function StatsBox({ icon, value, label }: StatsBoxProps) {
  return (
    <div className="flex items-center gap-4 rounded-lg bg-[#FAFAFA] p-4 shadow-sm w-72 ">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e2e2e2]">
        {icon || <Users className="h-6 w-6 text-blue-500" />}
      </div>
      <div>
        <h4 className="text-2xl font-bold">{value}</h4>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </div>
  )
}