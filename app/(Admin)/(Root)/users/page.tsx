import DashboardSearch from '@/components/helper/admin-search'
import UserTable from '@/components/helper/user-table'
import React, { FC } from 'react'

interface UserProps {
    searchParams: Promise<{
        search?: string
    }>
}

const UserPage: FC<UserProps> = async ({ searchParams }) => {
    const { search = '', } = await searchParams
  return (
    <div>
        <DashboardSearch initialValue={search}  />
        <UserTable key='users-table' search={search}/>
    </div>
  )
}

export default UserPage