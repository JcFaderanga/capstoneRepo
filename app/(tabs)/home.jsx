import { Image, ScrollView, Text, TouchableOpacity, View, ActivityIndicator  } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar"
import React, { useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router';
import { homeIcons } from '../../constant'
import CustomButtonWithIconOnHome from '../../components/UI/button/mainScreenBtn'
import DonationDrive from '../../components/donationDrive'
import { useAuth } from '../../context/authContext';
import ModalBloodBank from '../../components/Modals/modalBloodBank';
import ThemeContainer from '../../components/UI/themeContainer';
//import useFetchRequests from '../../hooks/fetchRequests';
import { TimeAgo } from '../../constant/timeStamp';

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
  return (
    <ThemeContainer bgColor={'white'}>

        <ScrollView>
        <View className="w-full ">        
 
          <View  className="w-full h-36  bg-white flex">
            <View className="w-full flex-row justify-center items-center">
              <CustomButtonWithIconOnHome
                title={'Donate'}
                imgSize={{ width: 45, hight: 45 }}
                imgUrl={homeIcons.donate}
              />
              <CustomButtonWithIconOnHome
                title={'Find donor'}
                imgSize={{ width: 43, hight: 43 }}
                imgUrl={homeIcons.findDonor}
                onPress={()=>router.push('../pages/findDonor')}
              />
              <CustomButtonWithIconOnHome
                title={'Blood Bank'}
                imgSize={{ width: 35, hight: 35 }}
                imgUrl={homeIcons.mediumStock}
                onPress={() => setModalVisible(true)}
              />
            </View>
          </View>
          <Text className="py-1 px-4 text-primaryRed text-lg font-bold">We need your help!</Text>
    
          {/* {requests list} */}
            
         </View>
        </ScrollView>
  </ThemeContainer>  
  )
}

export default home

// {requests.map((request) => (
//   <RequestBox 
//     key={request.blood_request_id} 
//     userId={request.user_id}
//     name={request.userName}
//     description={request.description}
//     bloodType={request.blood_type}
//     units={request.units}
//     anonymous={request.anonymous}
//     timePosted={TimeAgo(request.created_at)}
//     onPress={()=>console.log(JSON.stringify(requests,null,2))}/>          
//   ))}