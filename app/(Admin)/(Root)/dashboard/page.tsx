import { StatsBox } from '@/components/helper/state-box'
import UserTable from '@/components/helper/user-table'
import { Users,MehIcon } from 'lucide-react'
import React from 'react'

export default function page() {
  return (
    <div>
      <div className='flex gap-10'>
      <StatsBox label='Total Users' value={10} icon={<Users/>} />
      <StatsBox label='Total Moderators' value={5} icon={<MehIcon/>}/>
      <StatsBox label='Total Events' value={5} icon={<MehIcon/>}/>

      </div>
      <UserTable key='users-table'/>
    </div>
  )
}


