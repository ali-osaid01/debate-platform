'use client';
import React, { useState, useRef } from 'react';
import { toast } from 'sonner';
import Image from 'next/image';
import { useFormMutation } from '@/hooks/useFormMutation';
import { ERROR_FILE_UPLOAD, SUCCESS_FILE_UPLOAD } from '@/utils/constant';
import { upload } from '@/services/file-upload.server';
import { FieldValues, Path, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { Input } from '../ui/input';
import { Loader2 } from 'lucide-react';

interface FileUploadProps<T extends FieldValues> {
  maxFileSize?: number; 
  onUploadSuccess?: (url: string) => void; 
  onUploadError?: (error: string) => void; 
  children?: React.ReactNode; 
  className: string; 
  setValue:UseFormSetValue<T>
  name:Path<T>
}

const FileUpload = <T extends FieldValues>({
  maxFileSize = 5 * 1024 * 1024, 
  onUploadSuccess,
  onUploadError,
  children,
  className,
  setValue,
  name
}: FileUploadProps<T>) => {
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const uploadedCache = useRef<Map<string, string>>(new Map()); 

  // Validate file type
  const isValidFileType = (file: File) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
    return allowedTypes.includes(file.type);
  };

  const { handleFormSubmit, isLoading, mutation } = useFormMutation<
    any, 
    Error,
    File
  >({
    mutationFn: upload, 
    errorMessage: ERROR_FILE_UPLOAD,
  });

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const media = event.target?.files ? event.target.files[0] : null;

    if (!media) return;

    if (!isValidFileType(media)) {
      const errorMessage = 'Invalid file type. Please upload an image file.';
      toast.error(errorMessage);
      return;
    }

    if (media.size > maxFileSize) {
      const errorMessage = `File is too large. Max size is ${maxFileSize / 1024 / 1024}MB.`;
      toast.error(errorMessage);
      return;
    }

    
    const cacheKey = `${media.name}-${media.lastModified}`;
    
    if (uploadedCache.current.has(cacheKey)) {
      const cachedUrl = uploadedCache.current.get(cacheKey)!;
      setUploadedFileUrl(cachedUrl);
      toast.success('File loaded from cache!');
      return;
    }

    const result = await handleFormSubmit(media);
    setValue(name,result);
    if (result) {
      setUploadedFileUrl(String(result));
      uploadedCache.current.set(cacheKey, String(result));
      toast.success('File uploaded successfully!');
    }
  };

  const handleCustomClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
        accept="image/*"
      />

      <div
        className={className}
        onClick={handleCustomClick} 
        style={{
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {isLoading ? (
          <Loader2 className='animate-spin'/>
        ) : uploadedFileUrl ? (
          <div className="relative w-full h-full">
            <Image
              src={uploadedFileUrl}
              alt="Uploaded"
              layout="fill"
              objectFit="cover"
            />
          </div>
        ) : (
          children
        )}
      </div>

      {mutation.isError && (
        <p className="text-red-500 text-sm mt-2">Error uploading file. Try again.</p>
      )}
    </div>
  );
};

export default FileUpload;
