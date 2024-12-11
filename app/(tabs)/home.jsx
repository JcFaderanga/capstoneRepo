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
  //const { requests, isRequestLoading, errorRequestData } = useFetchRequests(user.id);

    // if (isRequestLoading) {
    //   return <ActivityIndicator />;
    // }
  
    // if (errorRequestData) {
    //   console.log(errorRequestData)
    //   return <Text>Error: {errorRequestData}</Text>;

    // }
  
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
        {/** nav bar */}
        <View className="w-full h-[75px] flex-row justify-between items-center bg-primary_red ">
          <View className=" ml-5 ">
            <Text className="text-2xl font-bold text-white">Hi {user && user?.first_name}!</Text>
          </View>
          <View className=" w-auto h-5 mr-5 flex-row">
            {/** onPress={()=> router.push('../screens/FAQs')} */}
            <TouchableOpacity onPress={() => router.push('../screens/FAQs')}>
              <Image className="w-[22] h-[22]"
                tintColor={'#ffffff'}
                source={homeIcons.FAQs}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/** end nav bar */}
        <ScrollView>
        <View className="w-full ">        
              <View className=" mt-6 mb-4">
                <ScrollView
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                  scrollEventThrottle={16}
                >
                  {/* <Text className='text-primaryRed w-full text-center text-xl font-bold py-2'>Upcoming Donation Drive</Text> */}
                  <DonationDrive onPress={()=>router.push('../screens/donationDrive')}/>
                  <DonationDrive onPress={()=>router.push('../screens/donationDrive')}
                  />
                </ScrollView>
              </View>
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
                onPress={()=>router.push('../../screens/findDonor')}
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