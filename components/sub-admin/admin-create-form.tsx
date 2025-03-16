'use client';
import { Dialog } from '@/components/ui/dialog';
import { DialogContent } from '@/components/ui/dialog'; // Add this import
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';
import { Input } from '../ui/input';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

// Type for form data
type AdminFormData = {
  name: string;
  username: string;
  password: string;
  role: 'subadmin'; // Fixed role
};

export const AdminCreateForm = ({ 
  isOpen, 
  onClose,
  onSubmit,
  isLoading
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: AdminFormData) => void;
  isLoading: boolean;
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm<AdminFormData>();
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (values: AdminFormData) => {
    try {
      setError(null);
      await onSubmit({ ...values, role: 'subadmin' }); // Force role as subadmin
    } catch (err) {
      setError('Error occurred while creating admin');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[500px]">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Create New Subadmin</h2>
          
          {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}

          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <Input
                {...register('name', { required: 'Name is required' })}
                placeholder="Enter Fullname"
              />
              {errors.name && (
                <span className="text-red-500 text-sm">{errors.name.message}</span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Username <span className="text-red-500">*</span>
              </label>
              <Input
                {...register('username', { 
                  required: 'Username is required',
                  minLength: {
                    value: 3,
                    message: 'Username must be at least 3 characters long'
                  }
                })}
                placeholder="Enter Username"
              />
              {errors.username && (
                <span className="text-red-500 text-sm">{errors.username.message}</span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <Input
                type="password"
                {...register('password', { 
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters long'
                  }
                })}
              />
              {errors.password && (
                <span className="text-red-500 text-sm">{errors.password.message}</span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Role
              </label>
              <Input
                value="Sub Admin"
                readOnly
                className="bg-gray-100 cursor-not-allowed"
              />
              <input type="hidden" {...register('role')} value="subadmin" />
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#439A86] hover:bg-[#368275] gap-2"
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                {isLoading ? 'Creating...' : 'Create Subadmin'}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};