import { StyleSheet, Text, View, Pressable, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileInfo from '../../components/profileInfo';
import ContentTitleButton from '../../components/contentTitle';
import { Modal } from 'react-native'; 
import { useAuth } from '../../context/authContext';
import { useRouter } from 'expo-router';
import { supabase } from '../../lib/supabase';
import ProfileDetails from '../../components/profileDetails';
import { avatar__icon } from '../../services/userAvatar'
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
  const [avatar_image, setAvatarImage] = useState(null);
  const { user } = useAuth();
  const router = useRouter();

  const menuOptions = () => {
    setModalVisible(true); 
  };

  const setProfile = async () => {
      console.log("profile")
  };

  useEffect(() => {
    const fetchAvatar = async () => {
      if (user && user.id) {
        const avatar = await avatar__icon(user.id);
        setAvatarImage(avatar);
      }
    };
    fetchAvatar();
  }, [user?.id]);

 
  return (
    <View className="w-full h-full bg-white">
      <SafeAreaView>
        <View className="w-full h-[40px] flex-row justify-between items-center bg-primaryRed">
          <View></View>
          <View className="w-auto h-full ">
            <TouchableOpacity  onPress={menuOptions} className=" pr-5 h-full justify-center items-center flex-row">
              <Image
                className="w-6 h-5 ml-4"
                style={{ tintColor: "white" }}
                source={require('../../assets/icon/menu.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <ProfileInfo setProfile={setProfile} profile={avatar_image}/>
        <ProfileDetails/>
      </SafeAreaView>
      <CustomModal modalVisible={modalVisible} setModalVisible={setModalVisible} /> 
    </View>
  );
};

export default Profile;
