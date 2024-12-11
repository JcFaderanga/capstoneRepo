import { StyleSheet, Text, View, Pressable, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useCallback, useMemo, useRef} from 'react';
import ProfileInfo from '../../components/profile__tab/profileInfo';
import ContentTitleButton from '../../components/contentTitle';
import { Modal } from 'react-native'; 
import { useAuth } from '../../context/authContext';
import { useRouter } from 'expo-router';
import { supabase } from '../../lib/supabase';
import ProfileDetails from '../../components/profile__tab/profileDetails';
import { homeIcons } from '../../constant';
import ThemeContainer from '../../components/UI/themeContainer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop,BottomSheetModal  } from '@gorhom/bottom-sheet';
import EditProfileInfo from '../pages/profile__tab/editProfile';
const Profile = () => {
  const [avatar_image, setAvatarImage] = useState(null);
  const [editVisible, setEditVisible] = useState(false);
  const [isMenuVisible, setMenuVisible] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const setProfile = async () => {
      console.log("profile")
  };
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut(); 
    if (error) {
      console.log('Error during logout:', error);
      return;
    } 
    router.replace('.././'); 
  };

  const handleEdit = () => {
    router.push('../pages/profile__tab/editProfile');
    setMenuVisible(false)
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


    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => ['25%'], []);
    //const snapPoints = useMemo(() => ['25%', '50%', '70%', '100%'], []);
    const openBottomSheet = useCallback(() => {
      bottomSheetRef.current?.present();
    }, []);
    const renderBackdrop = useCallback(
        (props) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
        []
    );
  return (
    <ThemeContainer>   
      <View className="w-full h-[40px] flex-row justify-between items-center bg-primary_red">
          <View></View>
          <View className="w-auto h-full ">
            <TouchableOpacity  onPress={openBottomSheet} className=" pr-5 h-full justify-center items-center flex-row">
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
        
        <BottomSheetModal ref={bottomSheetRef} snapPoints={snapPoints} backdropComponent={renderBackdrop}>
                <BottomSheetView>
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
                </BottomSheetView>
            </BottomSheetModal>
    </ThemeContainer>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: 'white',
  },
  contentContainer: {
      flex: 1,
  },
});