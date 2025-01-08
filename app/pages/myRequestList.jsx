import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { FetchAllRequest } from '../../hooks/my_request_hooks'
import { useAuth } from '../../context/authContext'
import MostRecentRequest from '../../components/request__tab/myrequest/requestBox'
import { FlatList } from 'react-native-gesture-handler'
import { useRouter } from 'expo-router';
const Request_list = () => {
    const {user} = useAuth();
    const {allRequest, fetchAllRequest} = FetchAllRequest();
    const router = useRouter();
    useEffect(()=>{
        fetchAllRequest(user?.id);
    },[user]);

   // console.log(allRequest)
    const handleViewRequest = (request_data)=>{
        router.push({
            pathname: './viewRequest',
            params: { request_data: JSON.stringify(request_data) },
        });
    }
  return (
    <View className="bg-slate-100">
        <FlatList
            className=""
            data={allRequest}
            keyExtractor={(item)=> item.blood_request_id.toString()}
            renderItem={({item, index})=>(
                <MostRecentRequest 
                    recentRequest={item}
                    onPress={()=>handleViewRequest(item)}
                />
            )}
        />
    </View>
  )
}

export default Request_list

const styles = StyleSheet.create({})