import { supabase } from '../lib/supabase';
import * as FileSystem from 'expo-file-system';
import { decode } from 'base64-arraybuffer';
import { supabaseUrl } from '../lib/supabase';
import { homeIcons } from '../constant';

// Helper function to get image source
export const getUserImageSrc = (imagePath) => {
   //return console.log("image services ==== ", getSupabaseFileUrl())
    imagePath  ? { uri: imagePath }
     : homeIcons.profile; // Provide a path to your local default image
};

// Generate Supabase public URL
export const getSupabaseFileUrl = (filePath) => {
  return { uri: `${supabaseUrl}/storage/v1/object/public/uploads/${filePath}` };
};

// Helper function to generate the file path
const getFilePath = (folderName, isImage) => { 
  return `${folderName}/${Date.now()}${isImage ? '.png' : '.mp4'}`;
};

// Function to upload file to Supabase Storage
export const uploadFile = async (folderName, fileUri, isImage = true) => {
  try {
    const fileName = getFilePath(folderName, isImage);

    // Read file as Base64 string
    const fileBase64 = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // Decode Base64 string to ArrayBuffer
    const imageData = decode(fileBase64);

    // Upload the decoded file to Supabase storage
    const { data, error } = await supabase.storage
      .from('uploads')
      .upload(fileName, imageData, {
        cacheControl: '3600',
        upsert: false,
        contentType: isImage ? 'image/png' : 'video/mp4',
      });

    if (error) throw error;

    console.log('File uploaded successfully:', data);
    return { success: true, msg: 'File uploaded successfully', data };
  } catch (e) {
    console.log('Upload error:', e.message);
    return { success: false, msg: 'Could not upload media' };
  }
};


const setProfile = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 1,
  });

  if (!result.canceled) {
    setProfileImage(result.assets[0].uri); // Temporarily show selected image while uploading
    
    // Upload the image to Supabase
    const uploadResult = await uploadFile('profileImages', result.assets[0].uri);
    if (uploadResult.success) {
      // Update user profile image path in Supabase
      const { error } = await supabase
        .from('profile')
        .update({ image: uploadResult.data.path })
        .eq('id', user.id);

      if (!error) {
        setProfileImage(getSupabaseFileUrl(uploadResult.data.path).uri);
      } else {
        console.log('Error updating profile:', error);
      }
    } else {
      console.log(uploadResult.msg);
    }
  } else {
    alert('You did not select any image.');
  }
};
