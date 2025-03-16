'use client';
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import { AdminCreateForm } from '../sub-admin/admin-create-form';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchAdmins, createAdmin } from '@/services/admin.service';

const SubAdminTable = () => {
  const queryClient = useQueryClient();
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading } = useQuery({
    queryKey: ['admins', page],
    queryFn: () => fetchAdmins(page, limit),
  });

  const createMutation = useMutation({
    mutationFn: createAdmin,
    onSuccess: () => {
        // @ts-ignore
      queryClient.invalidateQueries(['admins']);
      setIsCreateFormOpen(false);
    },
  });

  const admins = data?.response?.data?.data || [];
  const totalPages = Math.ceil((data?.response?.data?.total || 0) / limit);

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
              
              <TableHead className="text-white text-center">NAME</TableHead>
              <TableHead className="text-white text-center">USERNAME</TableHead>
              <TableHead className="text-white text-center">ROLE</TableHead>
              <TableHead className="text-white text-center">STATUS</TableHead>
              <TableHead className="text-white text-center">
                <Button 
                  onClick={() => setIsCreateFormOpen(true)}
                  className="bg-[#439A86] hover:bg-[#368275]"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Subadmin
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {/* @ts-ignore */}
            {admins.map((admin) => (
              <TableRow key={admin.id} className="text-center">
                <TableCell>
                  <div className="flex items-center gap-6">
                    <input
                      type="checkbox"
                      className="h-4 w-4 border-[#E8E8E8] shadow checked:bg-[#439A86]"
                    />
                    <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                  </div>
                </TableCell>

                <TableCell>
                  <Badge variant="outline" className="bg-[#E6E6F2] text-[#427D77]">
                    {admin.name}
                  </Badge>
                </TableCell>

                <TableCell>{admin.username}</TableCell>

                <TableCell className="text-green-500">
                  {admin.role}
                </TableCell>

                <TableCell>
                  <p className={admin.isActive ? "text-green-500" : "text-red-500"}>
                    {admin.isActive ? 'active' : 'disabled'}
                  </p>
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

      <AdminCreateForm
        isOpen={isCreateFormOpen}
        onClose={() => setIsCreateFormOpen(false)}
        onSubmit={(values) => createMutation.mutate(values)}
        // @ts-ignore
        isLoading={createMutation.isLoading}
      />

      <footer className="bg-[#5EA9F7] text-white py-4 mt-auto">
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-[#439A86] rounded disabled:opacity-50"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              className={`px-4 py-2 bg-[#439A86] rounded ${
                page === i + 1 ? 'bg-[#368275]' : ''
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-[#439A86] rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </footer>
    </div>
  );
};

export default SubAdminTable;