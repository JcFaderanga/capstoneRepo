import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileInfo from '../../components/profileInfo';
import ContentTitleButton from '../../components/contentTitle';
import { homeIcons } from '../../constant';
import { Modal } from 'react-native'; 
import { useAuth } from '../../context/authContext';
import { useRouter } from 'expo-router';
import { supabase } from '../../lib/supabase';
import ProfileDetails from '../../components/profileDetails';
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

const handleEdit =()=>{
  router.push('../screens/editProfileInfo');
  setModalVisible(false);
}
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
            size={{ width: 25, height: 25 }}
            icon={require('../../assets/icon/edit.png')}
            backIcon={homeIcons.arrowNoCircle}
            onPress={handleEdit}
          />
          <ContentTitleButton
            title={"Settings"}
            size={{ width: 25, height: 25 }}
            icon={homeIcons.settings}
            backIcon={homeIcons.arrowNoCircle}
          />
          <ContentTitleButton
            title={"Log out"}
            size={{ width: 25, height: 25 }}
            icon={require('../../assets/icon/logout.png')}
            backIcon={homeIcons.arrowNoCircle}
            onPress={handleLogout} 
          />
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const Profile = () => {
  const [modalVisible, setModalVisible] = useState(false); 
  const menuOptions = () => {
    setModalVisible(true); 
  };

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
        <ProfileInfo />
        <ProfileDetails/>
      </SafeAreaView>
      <CustomModal modalVisible={modalVisible} setModalVisible={setModalVisible} /> 
    </View>
  );
};

export default Profile;
