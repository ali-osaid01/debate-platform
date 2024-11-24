'use client'
import React, { useState, useRef } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

interface FileUploadProps {
  shape?: 'circle' | 'rectangle'; // Ensure shape type is restricted to either circle or rectangle
  className?: string; // Made className optional
}

const FileUpload = ({ shape = 'circle', className = '' }: FileUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Handle file change event
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target?.files ? event.target.files[0] : null;
    if (selectedFile) {
      setFile(selectedFile);
      handleFileUpload(selectedFile);
    }
  };
  
  const isValidFileType = (file: File) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
    return allowedTypes.includes(file.type);
  };

  // Handle file upload
  const handleFileUpload = async (selectedFile: File) => {
    // File type validation
    if (!isValidFileType(selectedFile)) {
      setError('Invalid file type. Please upload an image file.');
      toast.error('Invalid file type. Please upload an image file.'); 
      return;
    }

    const formData = new FormData();
    formData.append('media', selectedFile);

    setUploading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/api/media', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUploading(false);
      setUploadedFileUrl(response.data.urls[0]);
      toast.success('File uploaded successfully!'); 
    } catch (err) {
      setUploading(false);
      setError('Error uploading file. Please try again.');
      toast.error('Error uploading file. Please try again.');
    }
  };

  // Get shape class for styling based on the "shape" prop
  const getShapeClass = () => {
    return shape === 'circle' ? 'rounded-full' : 'rounded-lg';
  };

  return (
    <div className={`relative ${className}`}>
      {/* Invisible file input */}
      <input
        type="file"
        ref={fileInputRef} 
        onChange={handleFileChange}
        style={{ display: 'none' }} 
        id="file-upload-input"
        accept="image/*" // Restrict file input to images only
      />

      {/* Clickable area to upload */}
      <div
        className={`cursor-pointer ${getShapeClass()} w-40 h-40 flex justify-center items-center bg-gray-200 hover:bg-gray-300 transition-all ease-in-out`}
        style={{
          backgroundImage: uploadedFileUrl ? `url(${uploadedFileUrl})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        onClick={() => fileInputRef?.current?.click()} 
      >
        {/* Placeholder or uploading text */}
        {!uploadedFileUrl && !uploading && (
          <div className="text-center text-gray-500">
            Click to upload
          </div>
        )}
        {uploading && (
          <div className="text-center text-gray-500">Uploading...</div>
        )}
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default FileUpload;
