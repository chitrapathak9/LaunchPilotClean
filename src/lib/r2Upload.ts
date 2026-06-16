import { supabase } from './supabase';

interface UploadOptions {
  folder: 'blogs' | 'case-studies' | 'general';
  onProgress?: (percent: number) => void;
}

/**
 * Upload a file to Cloudflare R2 via a pre-signed URL from our Edge Function.
 * Returns the public CDN URL of the uploaded file.
 */
export async function uploadToR2(file: File, options: UploadOptions): Promise<string> {
  const { folder, onProgress } = options;

  // 1. Get a pre-signed upload URL from our Edge Function
  const { data: sessionData } = await supabase.auth.getSession();
  const accessToken = sessionData.session?.access_token;

  const edgeFunctionUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/get-r2-upload-url`;

  const response = await fetch(edgeFunctionUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      fileName: file.name,
      contentType: file.type,
      folder,
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(err.error || `Failed to get upload URL: ${response.status}`);
  }

  const { signedUrl, publicUrl } = await response.json();

  // 2. Upload directly to R2 using the signed URL
  await new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable && onProgress) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    });

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve();
      } else {
        reject(new Error(`Upload failed with status ${xhr.status}`));
      }
    });

    xhr.addEventListener('error', () => reject(new Error('Upload network error')));
    xhr.addEventListener('abort', () => reject(new Error('Upload aborted')));

    xhr.open('PUT', signedUrl);
    xhr.setRequestHeader('Content-Type', file.type);
    xhr.send(file);
  });

  return publicUrl;
}

/**
 * Generate a unique file name to avoid collisions
 */
export function generateFileName(file: File): string {
  const ext = file.name.split('.').pop() || 'bin';
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  const safeName = file.name
    .replace(/\.[^/.]+$/, '') // remove extension
    .replace(/[^a-z0-9]/gi, '-') // replace special chars
    .toLowerCase()
    .substring(0, 40);
  return `${safeName}-${timestamp}-${random}.${ext}`;
}

/**
 * Validate an image file before upload
 */
export function validateImageFile(file: File): string | null {
  const MAX_SIZE = 10 * 1024 * 1024; // 10MB
  const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/avif'];

  if (!ALLOWED_TYPES.includes(file.type)) {
    return 'Please upload a valid image file (JPEG, PNG, WebP, GIF, or AVIF)';
  }

  if (file.size > MAX_SIZE) {
    return 'Image must be smaller than 10MB';
  }

  return null;
}
