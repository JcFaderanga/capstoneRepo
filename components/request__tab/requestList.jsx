import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, Image } from 'react-native';
import { TimeAgo } from '../../constant/timeStamp';
import { fetchRequests } from '../../services/userServices';
import RequestBox from './requestBox';
import SheetViewRequest from '../../app/pages/bottomSheet/foryou/blood_donation/sheetViewBloodRequest';
var limit = 0;
const ProfileList = ({ bloodTypeFilterResult }) => {//get filters of data from foryou.jsx 
  const [requestList, setRequestList] = useState([]);//store type request to show on the list
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false); 
  const [selectedRequest, setSelectedRequest] = useState(null);
  //console.log(JSON.stringify(requestList, null, 4) )

    
  const ViewRequestBottomSheetRef = useRef(null);
  const getRequestList = async(limit)=>{
    const requests = await fetchRequests({ bloodTypeFilterResult }, limit);//pass seletected types to query to filter list result 
    setRequestList(requests);// set filter result to requestList
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
        getRequestList();
      setLoading(false);
    };
    fetchData();
  }, [bloodTypeFilterResult]);// every time there is an update will automatically reload

  const handleRefresh = async () => {
    setRefreshing(true);
      await getRequestList();
    setRefreshing(false);
  };
  if (loading) return <ActivityIndicator size="large" color="#F42F47" />;
  
  const fetchListLimit= async()=>{
    setRefreshing(true);
      await getRequestList(limit += 10);
    setRefreshing(false);
  }

  const viewSelectedRequest = (data) => {
    console.log(data)
    setSelectedRequest(data);
    ViewRequestBottomSheetRef.current?.present();
  };

  return (
    <View className="h-full">
      {requestList.length === 0 ? (
        <View className="flex-1 items-center">
           <Image source={require('../../assets/icon/noRequestFound.png')} resizeMode="contain" className="w-64"/>
        </View>
      ) : (
        <FlatList
          className="h-full w-full"
          data={requestList}
          keyExtractor={(item) => item.blood_request_id.toString()}
          renderItem={({ item, index }) => (
            <RequestBox
             index = {index}
              userId={item.user_id}
              name={item.userName}
              description={item.description}
              bloodType={item.blood_type}
              units={item.units}
              anonymous={item.anonymous}
              timePosted={TimeAgo(item.created_at)}
              onPress={() => viewSelectedRequest(item)}
            />
          )}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          onEndReached={()=>{
            fetchListLimit(); 
          }}
        />
      )}
      <SheetViewRequest ref={ViewRequestBottomSheetRef} request_data={selectedRequest}/>
    </View>
  );
};
export default ProfileList;
