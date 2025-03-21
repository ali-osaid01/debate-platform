"use client"
import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, Plus } from "lucide-react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { fetchAdmins, createAdmin } from "@/services/admin.service"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { IUser } from "@/types/interface/user.interface"

const SubAdminTable = () => {
  const queryClient = useQueryClient()
  const [page, setPage] = useState(1)
  const limit = 10
  const [showPasswordFor, setShowPasswordFor] = useState<string | null>(null)

  const { data, isLoading } = useQuery({
    queryKey: ["admins", page],
    queryFn: () => fetchAdmins(page, limit),
  })

  const createMutation = useMutation({
    mutationFn: createAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admins"] })
    },
  })

  const admins = data?.response?.data?.data || []

  const togglePasswordVisibility = (adminId: string) => {
    if (showPasswordFor === adminId) {
      setShowPasswordFor(null)
    } else {
      setShowPasswordFor(adminId)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <Table className="mt-3">
          <TableHeader>
            <TableRow className="bg-[#5EA9F7] hover:bg-[#5ea8f7da]">
              <TableHead className="w-96">
                <div className="flex items-center gap-6">
                  <input
                    type="checkbox"
                    className="cursor-pointer h-4 w-4 shadow border-[#E8E8E8] checked:bg-[#439A86]"
                  />
                  <label className="font-bold text-white">PROFILE</label>
                </div>
              </TableHead>
              <TableHead className="text-white text-center">FIRST NAME</TableHead>
              <TableHead className="text-white text-center">LAST NAME</TableHead>
              <TableHead className="text-white text-center">EMAIL</TableHead>
              <TableHead className="text-white text-center">PHONE</TableHead>
              <TableHead className="text-white text-center">PASSWORD</TableHead>
              <TableHead className="text-white text-center"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {admins.map((admin:IUser) => (
              <TableRow key={admin.id} className="text-center">
                <TableCell>
                  <div className="flex items-center gap-6">
                    <input type="checkbox" className="h-4 w-4 border-[#E8E8E8] shadow checked:bg-[#439A86]" />
                    <Avatar>
                      <AvatarImage src={admin.profilePicture || ""} alt={admin.name} />
                      <AvatarFallback>
                        {admin.firstname?.[0]}
                        {admin.lastname?.[0]}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </TableCell>

                <TableCell>
                  <Badge variant="outline" className="bg-[#E6E6F2] text-[#427D77]">
                    {admin.firstname || admin.name?.split(" ")[0] || ""}
                  </Badge>
                </TableCell>

                <TableCell>{admin.lastname || admin.name?.split(" ").slice(1).join(" ") || ""}</TableCell>

                <TableCell>{admin.email || ""}</TableCell>

                <TableCell>{admin.phone || ""}</TableCell>

                <TableCell>
                  <div className="flex items-center justify-center gap-2">
                    {showPasswordFor === admin.id ? (
                      <>
                        <span className="text-sm">{admin.password || "********"}</span>
                        <button
                          onClick={() => togglePasswordVisibility(admin.id)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <EyeOff className="h-4 w-4" />
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => togglePasswordVisibility(admin.id)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex justify-center">
                    <button className="text-gray-500 hover:text-gray-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default SubAdminTable

