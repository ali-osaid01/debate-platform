"use client"
import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useQuery } from "@tanstack/react-query"
import { fetchAdmins } from "@/services/admin.service"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { IUser } from "@/types/interface/user.interface"
import { UserActionsDropdown } from "../ui/user-action-dropdown"

const SubAdminTable = () => {
  const [page, setPage] = useState(1)

  const limit = 10

  const { data, isLoading } = useQuery({
    queryKey: ["admins", page],
    queryFn: () => fetchAdmins(page, limit),
  })

  const admins = data?.response?.data?.data || []

  console.log("admins", admins)
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <Table className="mt-3">
          <TableHeader>
            <TableRow className="bg-[#5EA9F7] hover:bg-[#5ea8f7da]">
              <TableHead className="w-96">
                <div className="flex items-center gap-6">
                  <label className="font-bold text-white">PROFILE</label>
                </div>
              </TableHead>
              <TableHead className="text-white text-center">NAME</TableHead>
              <TableHead className="text-white text-center">EMAIL</TableHead>
              <TableHead className="text-white text-center">PHONE</TableHead>
              <TableHead className="text-white text-center">STATUS</TableHead>
              <TableHead className="text-white text-center"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {admins.map((admin: IUser) => (
              <TableRow key={admin.id} className="text-center">
                <TableCell>
                  <div className="flex items-center gap-6">
                    <Avatar>
                      <AvatarImage src={admin.profilePicture || ""} alt={admin.name} />
                      <AvatarFallback>
                        AD
                      </AvatarFallback>
                    </Avatar>
                    <p>{admin.username}</p>
                  </div>
                </TableCell>

                <TableCell>{admin.name}</TableCell>

                <TableCell>{admin.email || ""}</TableCell>

                <TableCell>{admin.phone || ""}</TableCell>
                <TableCell>
                  <p className={admin.isActive === true ? "text-green-500 font-semibold" : "text-red-500 font-semibold"}>
                    {admin.isActive === true ? 'active' : 'disabled'}
                  </p>
                </TableCell>

                <TableCell>
                  <UserActionsDropdown id={admin._id} invalidateKey="admins" isUserStatusEnabled={admin.isActive} />
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

