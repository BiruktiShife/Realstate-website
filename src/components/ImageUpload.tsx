"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";

interface UploadedImage {
  url: string;
  hash: string;
  description?: string;
}

interface ImageUploadProps {
  onImagesUploaded: (images: UploadedImage[]) => void;
  propertyId?: string;
  companyId?: string;
  maxFiles?: number;
  existingImages?: UploadedImage[];
}

export function ImageUpload({
  onImagesUploaded,
  propertyId,
  companyId,
  maxFiles = 10,
  existingImages = [],
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadedImages, setUploadedImages] =
    useState<UploadedImage[]>(existingImages);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList) => {
    if (files.length === 0) return;

    const remainingSlots = maxFiles - uploadedImages.length;
    if (files.length > remainingSlots) {
      alert(`You can only upload ${remainingSlots} more image(s)`);
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();

      // Add files to form data
      Array.from(files).forEach((file) => {
        formData.append("files", file);
      });

      // Add metadata
      if (propertyId) formData.append("propertyId", propertyId);
      if (companyId) formData.append("companyId", companyId);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Upload failed");
      }

      // Add uploaded images to state
      const newImages = result.results.map(
        (r: { url: string; hash: string }) => ({
          url: r.url,
          hash: r.hash,
          description: "",
        })
      );

      const updatedImages = [...uploadedImages, ...newImages];
      setUploadedImages(updatedImages);
      onImagesUploaded(updatedImages);
    } catch (error) {
      console.error("Upload error:", error);
      alert(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);

    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const removeImage = async (index: number) => {
    const imageToRemove = uploadedImages[index];

    try {
      // Delete from Pinata
      const response = await fetch(`/api/upload?hash=${imageToRemove.hash}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Deletion failed");
      }

      // Remove from state
      const updatedImages = uploadedImages.filter((_, i) => i !== index);
      setUploadedImages(updatedImages);
      onImagesUploaded(updatedImages);
    } catch (error) {
      console.error("Delete error:", error);
      alert(error instanceof Error ? error.message : "Failed to delete image");
    }
  };

  const updateImageDescription = (index: number, description: string) => {
    const updatedImages = uploadedImages.map((img, i) =>
      i === index ? { ...img, description } : img
    );
    setUploadedImages(updatedImages);
    onImagesUploaded(updatedImages);
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-gray-400"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        <div className="space-y-2">
          <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
          <div>
            <p className="text-sm text-gray-600">
              Drag and drop images here, or{" "}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                browse
              </button>
            </p>
            <p className="text-xs text-gray-500 mt-1">
              PNG, JPG, WebP up to 10MB each. Max {maxFiles} images.
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading || uploadedImages.length >= maxFiles}
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Select Images
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Uploaded Images */}
      {uploadedImages.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-sm">
            Uploaded Images ({uploadedImages.length}/{maxFiles})
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {uploadedImages.map((image, index) => (
              <div key={index} className="border rounded-lg p-3 space-y-2">
                <div className="relative">
                  <img
                    src={image.url}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-32 object-cover rounded"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-1 right-1 h-6 w-6 p-0"
                    onClick={() => removeImage(index)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
                <Input
                  placeholder="Image description (optional)"
                  value={image.description || ""}
                  onChange={(e) =>
                    updateImageDescription(index, e.target.value)
                  }
                  className="text-sm"
                />
                <p className="text-xs text-gray-500 truncate">
                  IPFS: {image.hash}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
