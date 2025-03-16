export interface IAdmin {
    id: string;
    name: string;
    email: string;
    role: string;
    permissions: string[];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
  }