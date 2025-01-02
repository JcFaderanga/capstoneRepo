import { Image, ScrollView, Text, TouchableOpacity, View, ActivityIndicator, Pressable  } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar"
import React, { useState,useRef, useMemo, useCallback } from 'react'
import { router, useLocalSearchParams } from 'expo-router';
import { homeIcons } from '../../constant'
import CustomButtonWithIconOnHome from '../../components/UI/button/mainScreenBtn'
import DonationDrive from '../../components/donationDrive'
import { useAuth } from '../../context/authContext';
import ModalBloodBank from '../../components/Modals/modalBloodBank';
import ThemeContainer from '../../components/UI/themeContainer';
//import useFetchRequests from '../../hooks/fetchRequests';
import { TimeAgo } from '../../constant/timeStamp';
import {ProfileInfo, ProfileDetails} from '../../components/profile__tab';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; 
import BottomSheet ,{ BottomSheetView,BottomSheetBackdrop } from '@gorhom/bottom-sheet';
const home = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false); 
  const { user } = useAuth();
  
  if(!user)return;
  
    if(modalVisible){
      return(
        <ModalBloodBank
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        />
      )
    }

    const onScroll = (event) => {
      const offsetX = event.nativeEvent.contentOffset.x;
      const pageIndex = Math.round(offsetX / screenWidth);
      setCurrentPage(pageIndex);
    };

     const bottomSheetRef = useRef(null);
       const snapPoints = useMemo(() => ['59%', '95%'], []);
       const renderBackdrop = useCallback(
        (props) => <BottomSheetBackdrop appearsOnIndex={2} disappearsOnIndex={1} {...props} />,
          []
        );
        const handleSheetChange = (index) => {
          if (index < 0) {
            bottomSheetRef.current?.snapToIndex(1);
          }
        };
         const renderCustomHandle = () => (
                 <View className="p-2 rounded-t-lg">
                   <Text className="text-center text-xl font-bold"></Text>
                 </View>
               );
  return (
    <ThemeContainer bgColor={'white'}>
      <GestureHandlerRootView style={{flex: 1}}> 
          <View className="w-full h-[40px] flex-row justify-between items-center bg-primary_red">
                <View className="px-4">
                  <Text className="text-white font-bold">Blood Group: A+</Text>
                </View>
                <View className="w-auto h-full ">
                  <TouchableOpacity className=" pr-5 h-full justify-center items-center flex-row">
                    <Image
                      className="w-6 h-5 ml-4"
                      style={{ tintColor: "white" }}
                      source={require('../../assets/icon/menu.png')}
                    />
                  </TouchableOpacity>
                </View>
            </View>
          <ProfileInfo/>    
            <BottomSheet 
                index={1} 
                snapPoints={snapPoints} 
                handleComponent={renderCustomHandle} 
                backdropComponent={renderBackdrop}
                onChange={handleSheetChange}
                  >
              <BottomSheetView>
                  <FeatureBox 
                      icon={require('../../assets/icon/mediumStock.png')}
                      title={'Blood Bank'}
                      description={'Explore available blood types and inventory.'}
                  />
                  <FeatureBox 
                      icon={require('../../assets/icon/why donate.png')}
                      title={'Donate'}
                      description={'Be a hero, donate and save lives.'}
                  />
                  <FeatureBox 
                      icon={require('../../assets/icon/FAQs.png')}
                      title={'FAQs'}
                      description={'Find answers to common questions about blood donation.'}
                      tintColor={'#F42F47'}
                  />
                  <FeatureBox 
                      icon={require('../../assets/icon/clock.png')}
                      title={'Donation History'}
                      description={'View your past donations and their impact.'}
                      tintColor={'#F42F47'}
                  />
                  <FeatureBox 
                      icon={require('../../assets/icon/target.png')}
                      title={'Donation Drive'}
                      description={'Explore available blood types and inventory.'}
                  />
              </BottomSheetView>
          </BottomSheet>
      </GestureHandlerRootView> 
  </ThemeContainer>  
  )
}
export default home

const FeatureBox =({icon, title, description, tintColor})=>{
  return(
    <View className="w-full px-5">
        <Pressable 
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
  )
}
