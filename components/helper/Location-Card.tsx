import { FC } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

interface UserOriginCardProps {
    countries: {
        name:string
        users:number
        color:string
    }[]
}

const UserOriginCard:FC<UserOriginCardProps> = ({ countries }) => (
    <Card className="border-none shadow-lg col-span-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Discover Where Our Users Are Joining From</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {countries.map((country, index) => (
            <div key={index.toString()+country} className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: country.color }}></div>
              <p className="text-sm text-gray-600">{country.name}: <span className="font-semibold">{country.users.toLocaleString()}</span></p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )

export default UserOriginCard