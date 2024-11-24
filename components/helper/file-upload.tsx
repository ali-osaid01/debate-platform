'use client'
import React, { useState, useRef } from 'react';
import axios from 'axios';

const FileUpload = ({ shape = 'circle'}) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null);
  
  const fileInputRef = useRef(null);

  const handleFileChange = (event: any) => {
    const selectedFile = event?.target?.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      handleFileUpload(selectedFile);
    }
  };

  // Handle file upload
  const handleFileUpload = async (selectedFile: File) => {
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

      console.log("MEDIA UPLOAD",response.data)
      setUploading(false);
      setUploadedFileUrl(response.data.urls[0]); // Assuming the API responds with the file URL
    } catch (error) {
      setUploading(false);
      setError('Error uploading file');
    }
  };

  // Get shape class for styling
  const getShapeClass = () => {
    if (shape === 'circle') {
      return 'rounded-full'; // Circle shape
    }
    return 'rounded-lg'; // Rectangle shape
  };

  return (
    <div className="relative">
      {/* Invisible file input */}
      <input
        type="file"
        ref={fileInputRef} 
        onChange={handleFileChange}
        style={{ display: 'none' }} 
        id="file-upload-input"
      />

      {/* Clickable area (can be an image preview or a div) */}
      <div
        className={`cursor-pointer ${getShapeClass()} w-40 h-40 flex justify-center items-center bg-gray-200 hover:bg-gray-300 transition-all ease-in-out`}
        style={{
          backgroundImage: uploadedFileUrl ? `url(${uploadedFileUrl})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        onClick={() => fileInputRef?.current?.click()} 
      >
        {/* Placeholder text or image */}
        {!uploadedFileUrl && !uploading && (
          <div className="text-center text-gray-500">
            Click to upload
          </div>
        )}
        {uploading && (
          <div className="text-center text-gray-500">Uploading...</div>
        )}
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default FileUpload;
