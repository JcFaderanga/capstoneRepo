import { Modal, StyleSheet, Text, View,Pressable,Image,ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { getBloodRequest } from '../../../services/userServices'
const ModalBloodBank = ({visible, onRequestClose,requestData}) => {
    const [selectedRequestData, setReuquestData]= useState();
    // console.log("REQUEST TO VIEW DATA: ",JSON.stringify(requestData,null, 5));
  return (
    <View>
        <Modal
        transparent={false} 
        visible={visible}
        animationType= "fade"
        onRequestClose={onRequestClose}
        >
        <Pressable onPress={onRequestClose} className="w-full h-16">
            <Image
                source={require('../../../assets/icon/backArrow.png')}
                className="w-5 absolute my-1 mx-5"
                resizeMode='contain'
            />
        </Pressable>
            <View className='w-full h-full'> 
                <Text>modal view request {requestData?.user_id}</Text>
            </View>
        </Modal>
    </View>
  )
}


export default ModalBloodBank
