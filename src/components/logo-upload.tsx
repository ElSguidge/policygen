'use client';

import { useState } from 'react';
import { Label } from '@/components/ui/label';

interface LogoUploadProps {
  value: string;
  onChange: (value: string) => void;
}

export function LogoUpload({ value, onChange }: LogoUploadProps) {
  const [preview, setPreview] = useState(value);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Convert to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setPreview(base64);
        onChange(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setPreview(url);
    onChange(url);
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
      <div>
        <Label htmlFor="logo-upload" className="font-semibold">
          Company Logo (Optional)
        </Label>
        <p className="text-sm text-gray-600 mt-1 mb-3">
          Upload a logo or provide a URL to include in your document header
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* File Upload */}
        <div>
          <Label htmlFor="logo-file" className="text-sm font-medium">
            Upload Logo
          </Label>
          <input
            id="logo-file"
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/svg+xml"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <p className="text-xs text-gray-500 mt-1">PNG, JPG, SVG (max 2MB)</p>
        </div>

        {/* URL Input */}
        <div>
          <Label htmlFor="logo-url" className="text-sm font-medium">
            Or Logo URL
          </Label>
          <input
            id="logo-url"
            type="url"
            value={value && !value.startsWith('data:') ? value : ''}
            onChange={handleUrlChange}
            placeholder="https://example.com/logo.png"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
          <p className="text-xs text-gray-500 mt-1">Enter a direct image URL</p>
        </div>
      </div>

      {/* Preview */}
      {preview && (
        <div className="mt-4">
          <Label className="text-sm font-medium mb-2 block">Preview:</Label>
          <div className="border rounded p-4 bg-white flex items-center justify-center max-h-32">
            <img
              src={preview}
              alt="Logo preview"
              className="max-h-24 max-w-full object-contain"
              onError={() => {
                setPreview('');
                onChange('');
              }}
            />
          </div>
          <button
            type="button"
            onClick={() => {
              setPreview('');
              onChange('');
            }}
            className="mt-2 text-sm text-red-600 hover:text-red-800"
          >
            Remove Logo
          </button>
        </div>
      )}
    </div>
  );
}
