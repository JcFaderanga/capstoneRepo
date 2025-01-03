import { Image, ScrollView, Text, TouchableOpacity, View, ActivityIndicator, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { homeIcons } from '../../constant';
import CustomButtonWithIconOnHome from '../../components/UI/button/mainScreenBtn';
import DonationDrive from '../../components/donationDrive';
import { useAuth } from '../../context/authContext';
import ModalBloodBank from '../../components/Modals/modalBloodBank';
import ThemeContainer from '../../components/UI/themeContainer';
import { TimeAgo } from '../../constant/timeStamp';
import { ProfileInfo } from '../../components/profile__tab';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; 
import BottomSheet, { BottomSheetView, BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import UseFetchDonationCount from '../../hooks/blood_donation/fetchUnitDonated';
import ContentTitleButton from '../../components/contentTitle';
import { supabase } from '../../lib/supabase';

const Home = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { user } = useAuth();
  const { totalUnitDonated, FetchUnitCount } = UseFetchDonationCount();
  const bottomSheetRef = useRef(null);
  const modalRef = useRef(null);

  const snapPoints = useMemo(() => ['59%', '95%'], []);
  const modalSnapPoints = useMemo(() => ['25%'], []);

  useEffect(() => {
    if (user) {
      FetchUnitCount(user?.id);
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut(); 
      if (error) {
        console.log('Error during logout:', error.message);
        return;
      }
      setTimeout(() => {
        router.replace('.././');
      }, 100);
    } catch (err) {
      console.error('Unexpected error during logout:', err);
    }
  };

  const openModalSheet = useCallback(() => {
    modalRef.current?.present();
  }, []);

  const renderCustomHandle = () => (
    <View className="p-2 rounded-t-lg">
      <Text className="text-center text-xl font-bold"></Text>
    </View>
  );

  const renderBackdrop = useCallback(
    (props) => <BottomSheetBackdrop appearsOnIndex={2} disappearsOnIndex={1} {...props} />,
    []
  );

  const modalBackDrop = useCallback(
    (props) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
    []
  );

  const handleEdit = () => {
    router.push('../pages/profile__tab/editProfile');
    modalRef.current?.close();
  };

  if (!user) {
    return (
      <ThemeContainer bgColor="white">
        <Text className="text-center mt-10">Loading user data...</Text>
      </ThemeContainer>
    );
  }

  return (
    <ThemeContainer bgColor={'white'}>
      <GestureHandlerRootView style={{ flex: 1 }}> 
        <View className="w-full h-[40px] flex-row justify-between items-center bg-primary_red">
          <View className="px-4">
            <Text className="text-white font-bold">Blood Group: {user?.blood_type}</Text>
          </View>
          <TouchableOpacity onPress={openModalSheet} className="pr-5 h-full justify-center items-center flex-row">
            <Image
              className="w-6 h-5 ml-4"
              style={{ tintColor: "white" }}
              source={require('../../assets/icon/menu.png')}
            />
          </TouchableOpacity>
        </View>
        <ProfileInfo unit={totalUnitDonated} />    
        <BottomSheet 
          index={0} 
          snapPoints={snapPoints} 
          handleComponent={renderCustomHandle} 
          backdropComponent={renderBackdrop}
        >
          <BottomSheetView>
                  <FeatureBox 
                    icon={require('../../assets/icon/mediumStock.png')}
                    title={'Blood Bank'}
                    description={'Explore available blood types and inventory.'}
                  />
                  <FeatureBox 
                    icon={require('../../assets/icon/target.png')}
                    title={'Donation Drive'}
                    description={'Explore available blood types and inventory.'}
                  />

                  <FeatureBox 
                    icon={require('../../assets/icon/settings.png')}
                    title={'Donation Settings'}
                    description={'Manage your donation preferences.'}
                    tintColor={'#F42F47'}
                    onPress={()=>router.push('../pages/donationSettings')}
                  />
                  <FeatureBox 
                    icon={require('../../assets/icon/clock.png')}
                    title={'Donation History'}
                    description={'View your past donations and their impact.'}
                    tintColor={'#F42F47'}
                    onPress={()=>router.push('../pages/donationHistory')}
                  />
                  <FeatureBox 
                    icon={require('../../assets/icon/FAQs.png')}
                    title={'FAQs'}
                    description={'Find answers to common questions about blood donation.'}
                    tintColor={'#F42F47'}
                    onPress={()=>router.push('../pages/FAQs')}
                  /> 
          </BottomSheetView>
        </BottomSheet>
        <BottomSheetModal ref={modalRef} snapPoints={modalSnapPoints} backdropComponent={modalBackDrop}>
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
      </GestureHandlerRootView> 
    </ThemeContainer>  
  );
};

const FeatureBox = ({ icon, title, description, tintColor,onPress }) => {
  return (
    <View className="w-full px-5">
      <Pressable onPress={onPress}
        className="w-full h-28 bg-slate-100 border-gray-500 rounded-3xl px-6 mb-4 flex-row items-center">
        <Image
          source={icon}
          className="w-9 h-12 mr-4"
          resizeMode='contain'
          tintColor={tintColor}
        />
        <View className="flex-1">
          <Text className="font-bold text-lg">{title}</Text>
          <Text>{description}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Home;
