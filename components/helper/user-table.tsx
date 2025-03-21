'use client';
import React, { FC } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from '../ui/badge';
import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '@/services/user.service';
import usePaginationStore from '@/store/pagination.store';
import UserProfileSheet from '../ui/user-profile-sheet';
import { IUser } from '@/types/interface/user.interface';
import { UserActionsDropdown } from '../ui/user-action-dropdown';

interface UserTableProps {
    key: string;
    search?: string
}

const UserTable: FC<UserTableProps> = ({ key,search }) => {
    const { pagination } = usePaginationStore();
    const { page = 1, limit = 10 } = pagination[key] || {};

    const { data } = useQuery({
        queryKey: ['users',page,limit,search],
        queryFn: () => fetchUsers(page, limit, search || ""),
    });
    const users = data?.response?.data?.data|| [];
    
    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow">
                <Table className="mt-3">
                    <TableHeader>
                        <TableRow className="bg-[#5EA9F7] hover:bg-[#5ea8f7da] w-full rounded-sm h-5">
                            <TableHead className="w-96">
                                <div className="flex items-center gap-6">
                                    <input
                                        type="checkbox"
                                        className="cursor-pointer h-4 w-4 shadow border-[#E8E8E8] checked:bg-[#439A86] focus:ring-0 checked:text-[#439A86]"
                                    />
                                    <label className="font-bold text-white">PROFILE</label>
                                </div>
                            </TableHead>
                            <TableHead className="font-semibold text-white text-center">NAME</TableHead>
                            <TableHead className="font-semibold text-white text-center">USERNAME</TableHead>
                            <TableHead className="font-semibold text-white text-center">SUBSCRIBER</TableHead>
                            <TableHead className="font-semibold text-white text-center">ACCOUNT STATUS</TableHead>
                            <TableHead className="font-semibold text-white text-center"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user: IUser) => (
                            <TableRow key={user.id} className="text-center relative">
                                <TableCell className="w-32">
                                    <div className="flex items-center gap-6">
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 border-[#E8E8E8] shadow checked:bg-[#439A86] focus:ring-0 checked:text-[#439A86]"
                                        />
                                        <UserProfileSheet user={user} />
                                    </div>
                                </TableCell>
                                <TableCell className="w-60 text-center">
                                    <Badge variant="outline" className='bg-[#E6E6F2] text-[#427D77] rounded-xl'>
                                    {user.name}
                                    </Badge>
                                </TableCell>
                                <TableCell className="w-60 text-center">{user.username}</TableCell>
                                <TableCell className={`text-center ${user.subscription.subscribe == true ? 'text-green-500' : 'text-red-500'}`}>{user.subscription.subscribe? 'Yes' : 'No'}</TableCell>
                                <TableCell>
                                    <p className={user.isActive === true ? "text-green-500 font-semibold" : "text-red-500 font-semibold"}>
                                    {user.isActive === true ? 'active' : 'disabled'}
                                    </p>
                                </TableCell>
                                <TableCell>
                                <UserActionsDropdown id={user.id} isUserStatusEnabled={user.isActive} invalidateKey='users'/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <footer className="bg-[#5EA9F7] text-white text-center py-4 w-full mt-auto">
                {/* {data?.data?.pagination && <DashboardPagination data={data.data.pagination} tableKey={key} />} */}
            </footer>
        </div>
    );
}

export default UserTable;
