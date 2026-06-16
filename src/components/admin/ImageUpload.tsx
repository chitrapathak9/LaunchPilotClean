import React, { useCallback, useState } from 'react';
import { Upload, X, Image as ImageIcon, Loader2, AlertCircle } from 'lucide-react';
import { uploadToR2, validateImageFile, generateFileName } from '../../lib/r2Upload';

interface ImageUploadProps {
  value: string | null;
  onChange: (url: string | null) => void;
  folder?: 'blogs' | 'case-studies' | 'general';
  label?: string;
  aspectRatio?: 'video' | 'square' | 'wide';
}

export function ImageUpload({
  value,
  onChange,
  folder = 'general',
  label = 'Upload Image',
  aspectRatio = 'video',
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const aspectClasses = {
    video: 'aspect-video',
    square: 'aspect-square',
    wide: 'aspect-[3/1]',
  };

  const handleFile = useCallback(async (file: File) => {
    const validationError = validateImageFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setIsUploading(true);
    setUploadProgress(0);

    try {
      const renamedFile = new File([file], generateFileName(file), { type: file.type });
      const url = await uploadToR2(renamedFile, {
        folder,
        onProgress: setUploadProgress,
      });
      onChange(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  }, [folder, onChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = '';
  };

  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-semibold text-slate-700 block">{label}</label>}

      {value ? (
        <div className={`relative ${aspectClasses[aspectRatio]} rounded-xl overflow-hidden group border border-slate-200 bg-slate-50`}>
          <img src={value} alt="Uploaded" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <label className="cursor-pointer bg-white text-slate-800 px-3 py-2 rounded-lg text-xs font-semibold hover:bg-slate-100 transition-colors flex items-center gap-1.5">
              <Upload size={12} /> Replace
              <input type="file" accept="image/*" className="hidden" onChange={handleInputChange} />
            </label>
            <button
              type="button"
              onClick={() => onChange(null)}
              className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              <X size={14} />
            </button>
          </div>
          {/* URL display */}
          <div className="absolute bottom-0 left-0 right-0 bg-black/70 px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <p className="text-white text-xs truncate font-mono">{value}</p>
          </div>
        </div>
      ) : (
        <label
          className={`${aspectClasses[aspectRatio]} flex flex-col items-center justify-center border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 ${
            isDragging
              ? 'border-[#8B5CF6] bg-[#8B5CF6]/5'
              : 'border-slate-300 bg-slate-50 hover:border-[#8B5CF6]/50 hover:bg-[#8B5CF6]/5'
          } ${isUploading ? 'pointer-events-none' : ''}`}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp,image/gif,image/avif"
            className="hidden"
            onChange={handleInputChange}
            disabled={isUploading}
          />

          {isUploading ? (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="text-[#8B5CF6] animate-spin" size={28} />
              <div className="text-center">
                <p className="text-sm font-semibold text-slate-700">Uploading...</p>
                <div className="mt-2 w-40 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#8B5CF6] rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1">{uploadProgress}%</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 p-6 text-center">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
                <ImageIcon size={22} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-700">Drop image here or click to upload</p>
                <p className="text-xs text-slate-400 mt-1">JPEG, PNG, WebP, GIF, AVIF — max 10MB</p>
              </div>
              <div className="px-4 py-1.5 bg-[#8B5CF6] text-white rounded-lg text-xs font-semibold hover:bg-[#7C3AED] transition-colors">
                Choose File
              </div>
            </div>
          )}
        </label>
      )}

      {error && (
        <div className="flex items-center gap-2 text-red-600 text-xs font-medium bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          <AlertCircle size={14} className="shrink-0" />
          {error}
        </div>
      )}

      {/* URL input fallback */}
      <div className="flex items-center gap-2">
        <div className="h-px flex-1 bg-slate-100" />
        <span className="text-xs text-slate-400">or paste URL</span>
        <div className="h-px flex-1 bg-slate-100" />
      </div>
      <input
        type="url"
        placeholder="https://..."
        value={value || ''}
        onChange={e => onChange(e.target.value || null)}
        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6]/20 placeholder:text-slate-400 transition-all font-mono"
      />
    </div>
  );
}
