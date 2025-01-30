import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { supabase } from '../lib/supabase';
export const pickDocument = async () => {
  const result = await DocumentPicker.getDocumentAsync({
    type: '*/*', // Allows PDFs and images
  });

  if (result.canceled) return null;

  return result.assets[0]; // Returns file object
};

export const pickImage = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 1,
  });
  

  if (result.canceled) return null;

  return result.assets[0]; // Returns image object
};



export const uploadFile = async (file, fileType) => {
  if (!file) return;

  try {
    // Convert file to blob
    const fileContent = await FileSystem.readAsStringAsync(file.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    const fileBlob = new Uint8Array(
      Buffer.from(fileContent, 'base64').buffer
    );

    // Create a unique filename
    const fileName = `${Date.now()}.${fileType === 'pdf' ? 'pdf' : 'jpg'}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('uploads') // Your Supabase Storage bucket
      .upload(fileName, fileBlob, {
        contentType: fileType === 'pdf' ? 'application/pdf' : 'image/jpeg',
      });

    if (error) throw error;

    // Get the file URL
    const { data: publicURL } = supabase.storage
      .from('uploads')
      .getPublicUrl(fileName);

    console.log('File uploaded successfully:', publicURL);
    return publicURL;
  } catch (error) {
    console.log('Upload failed:', error);
    return null;
  }
};
