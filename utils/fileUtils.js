import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { supabase } from '../lib/supabase';

// Function to convert Base64 to Uint8Array
const base64ToArrayBuffer = (base64) => {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};

export const pickDocument = async () => {
  const result = await DocumentPicker.getDocumentAsync({
    type: '*/*', // Allows selection of any file
  });

  if (result.canceled) return { error: 'No file selected' };

  const file = result.assets[0];

  // Get the file extension from the name
  const allowedExtensions = ['pdf', 'jpg', 'jpeg', 'png'];
  const fileExtension = file.name.split('.').pop().toLowerCase();

  // Validate the file type
  if (!allowedExtensions.includes(fileExtension)) {
    return { error: 'Invalid file type. Please select a PDF or an image.' };
  }

  return file; // Return file object if valid
};

export const uploadFile = async (folderName, file, fileType) => {
  if (!file) return null;

  try {
    // Read file as Base64 string
    const fileContent = await FileSystem.readAsStringAsync(file.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // Convert Base64 to Uint8Array
  
    const fileBlob = base64ToArrayBuffer(fileContent);

    // Ensure the file name is safe for URLs
    const safeFileName = file.name.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9._-]/g, '');
    const fileName = `${folderName}/${Date.now()}${safeFileName}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('uploads') // Your Supabase Storage bucket
      .upload(fileName, fileBlob, {
        contentType: fileType.startsWith('application/pdf') ? 'application/pdf' : 'image/jpeg',
      });

    if (error) throw error;

    return fileName;
  } catch (error) {
    console.error('Upload failed:', error);
    return null;
  }
};
