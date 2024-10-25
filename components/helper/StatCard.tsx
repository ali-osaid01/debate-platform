import { FC } from "react"
import { Card, CardContent } from "../ui/card"

interface statCardProps {
  value:string,
  label:string
}

const StatCard:FC<statCardProps> = ({ value, label }) => (
    <Card className="border-none shadow-lg">
      <CardContent className="p-6">
        <p className="text-4xl font-bold mb-2">{value}</p>
        <p className="text-sm text-gray-600">{label}</p>
      </CardContent>
    </Card>
  )

  export default StatCard