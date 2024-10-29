import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileInfo from '../../components/profileInfo';
import ContentTitleButton from '../../components/contentTitle';
import { Modal } from 'react-native'; 
import { useAuth } from '../../context/authContext';
import { useRouter } from 'expo-router';
import { supabase } from '../../lib/supabase';
import ProfileDetails from '../../components/profileDetails';
import { getUserImageSrc, uploadFile, getSupabaseFileUrl } from '../../services/imageServices';
import * as ImagePicker from 'expo-image-picker';
import { avatar, homeIcons } from '../../constant';
const CustomModal = ({ modalVisible, setModalVisible }) => {
  const { setAuth } = useAuth(); 
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut(); 
    if (error) {
      console.log('Error during logout:', error);
      return;
    } 
    setAuth(null);  
    router.replace('.././'); 
  };

  const handleEdit = () => {
    router.push('../screens/editProfileInfo');
    setModalVisible(false);
  };

  return (
    <Modal
      transparent={true} 
      visible={modalVisible}
      animationType="fade" 
      onRequestClose={() => setModalVisible(false)} 
    >
      <Pressable className="flex-1 justify-end bg-black/30" onPress={() => setModalVisible(false)}>
        <Pressable className="w-full bg-white rounded-t-[20px]" onPress={(e) => e.stopPropagation()}>
          <ContentTitleButton
            title={"Edit"}
            size={{ width: 22, height: 22 }}
            icon={require('../../assets/icon/edit.png')}
            onPress={handleEdit}
          />
          <ContentTitleButton
            title={"Settings"}
            size={{ width: 22, height: 22 }}
            icon={homeIcons.settings}
          />
          <ContentTitleButton
            title={"Log out"}
            size={{ width: 22, height: 22 }}
            icon={require('../../assets/icon/logout.png')}
            onPress={handleLogout} 
          />
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const Profile = () => {
  const [modalVisible, setModalVisible] = useState(false); 
  const [profileImage, setProfileImage] = useState(null);
  const { user } = useAuth();
  const router = useRouter();

  const menuOptions = () => {
    setModalVisible(true); 
  };

  const setProfile = async () => {
      console.log("profile")
  };

  const avatarProfile = ()=>{
    if(user && user.avatar){
     return !user.avatar ? avatar.m1 :  avatar[user.avatar] ; 
    }
  }
 
  return (
    <View className="w-full h-full bg-white">
      <SafeAreaView>
        <View className="w-full h-[40px] flex-row justify-between items-center bg-primaryRed">
          <View></View>
          <View className="w-auto h-5 mr-5 flex-row">
            <Pressable onPress={menuOptions}>
              <Image
                className="w-6 h-5 ml-4"
                style={{ tintColor: "white" }}
                source={require('../../assets/icon/menu.png')}
              />
            </Pressable>
          </View>
        </View>
        <ProfileInfo setProfile={setProfile} profile={avatarProfile()}/>
        <ProfileDetails/>
      </SafeAreaView>
      <CustomModal modalVisible={modalVisible} setModalVisible={setModalVisible} /> 
    </View>
  );
};

export default Profile;
