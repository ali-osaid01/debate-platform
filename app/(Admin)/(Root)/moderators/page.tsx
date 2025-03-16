import Search from '@/components/helper/admin-search'
import { CreateAdminDialog } from '@/components/ui/add-admin-dialog'
import React, { FC } from 'react'

interface AdminPageProps {
    searchParams: Promise<{
      search?: string
    }>
  }

const AdminPage:FC<AdminPageProps> = async ({searchParams}) => {
    const { search = '', } = await searchParams

    return (
        <main>
            <section className='flex justify-between'>
                <Search initialValue={search} />
                <CreateAdminDialog />
            </section>
        </main>
    )
}

export default AdminPage