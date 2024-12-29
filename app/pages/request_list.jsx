import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import ThemeContainer from '../../components/UI/themeContainer'
import { FetchAllRequest } from '../../hooks/my_request_hooks'
import { useAuth } from '../../context/authContext'
import MostRecentRequest from '../../components/request__tab/myrequest/mostRecentRequest'
import { FlatList } from 'react-native-gesture-handler'
const Request_list = () => {
    const {user} = useAuth();
    const {allRequest, fetchAllRequest} = FetchAllRequest();

    useEffect(()=>{
        fetchAllRequest(user?.id);
    },[allRequest]);
  return (
    <View >
        <FlatList
            className="px-4"
            data={allRequest}
            keyExtractor={(item)=> item.blood_request_id.toString()}
            renderItem={({item, index})=>(
                <MostRecentRequest recentRequest={item}/>
            )}
        />
    </View>
  )
}

export default Request_list

const styles = StyleSheet.create({})