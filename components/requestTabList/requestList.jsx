import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Image } from 'react-native';
import { TimeAgo } from '../../constant/timeStamp';
import { fetchRequests } from '../../services/userServices';
import RequestBox from './requestBox';

const ProfileList = ({ bloodTypeFilterResult }) => {//get filters of data from foryou.jsx 
  const [requestList, setRequestList] = useState([]);//store type request to show on the list
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false); 

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const requests = await fetchRequests({ bloodTypeFilterResult });//pass seletected types to query to filter list result 
        setRequestList(requests);// set filter result to requestList
      } catch (err) {
        setError(err.message);
      }finally{
        setLoading(false);
      }
    };
    fetchData();
  }, [bloodTypeFilterResult]);// every time there is an update will automatically reload

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const requests = await fetchRequests({ bloodTypeFilterResult });
      setRequestList(requests);
    } catch (err) {
      setError(err.message);
    }
    setRefreshing(false);
  };

  if (loading) return <ActivityIndicator size="large" color="#F42F47" />;
  if (error) return <Text>Error: {error}</Text>;

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
          renderItem={({ item }) => (
            <RequestBox
              name={item.userName}
              description={item.description}
              bloodType={item.blood_type}
              units={item.units}
              anonymous={item.anonymous}
              timePosted={TimeAgo(item.created_at)}
            />
          )}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      )}
      
    </View>
  );
};

export default ProfileList;
