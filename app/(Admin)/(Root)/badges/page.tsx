"use client"

import { useState } from "react";
import Image from "next/image";
import { PlusCircle, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FileUpload from "@/components/helper/file-upload";
import { badgeValidation } from "@/validation/badge.validation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { fetchBadge } from "@/services/badge.service";

const initialBadges = [
  { id: 1, name: "Gold Medal", image: "/placeholder.svg?height=80&width=80" },
  { id: 2, name: "Silver Medal", image: "/placeholder.svg?height=80&width=80" },
  { id: 3, name: "Bronze Medal", image: "/placeholder.svg?height=80&width=80" },
  { id: 4, name: "Achievement Badge", image: "/placeholder.svg?height=80&width=80" },
  { id: 5, name: "Excellence Award", image: "/placeholder.svg?height=80&width=80" },
];

type Badge = {
  name: string;
  image: string;
};

function CreateBadge() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<Badge>({
    resolver: yupResolver(badgeValidation),
  });

  const onSubmit = (data: Badge) => {
    reset();
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          Create New Badge
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Badge</DialogTitle>
          <DialogDescription>Add a new badge with an image and name.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="badge-name">Badge Name</Label>
            <Input id="badge-name" {...register("name")} placeholder="Enter badge name" />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="badge-image">Badge Image</Label>
            <FileUpload
              className="rounded-full w-16 h-16 bg-gray-200 flex justify-center items-center cursor-pointer hover:bg-gray-300 transition-all"
              setValue={setValue}
              maxFileSize={2 * 1024 * 1024}
              onUploadSuccess={(url) => setValue("image", url)}
              onUploadError={(error) => console.error(error)}
              name="image"
            >
              <Upload />
            </FileUpload>
            {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
          </div>
          <DialogFooter>
            <Button variant="outline" type="button" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Badge</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function BadgeList() {
  const { data } = useQuery({
    queryKey: ["badges"],
    queryFn: () => fetchBadge(1, 10),
  });

  console.log("->",data);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {data?.response?.data?.map((badge:{name:string,image:string,id:string}) => (
        <Card key={badge.id} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex flex-col items-center gap-4">
              <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-muted">
                <Image src={badge.image || "/placeholder.svg"} alt={badge.name} fill className="object-cover" />
              </div>
              <h3 className="text-lg font-medium text-center">{badge.name}</h3>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function BadgesAdminPage() {
  

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <CreateBadge  />
      </div>
      <BadgeList  />
    </div>
  );
}
