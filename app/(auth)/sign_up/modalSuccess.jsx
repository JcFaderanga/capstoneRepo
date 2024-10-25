import { StyleSheet, Text, View,Pressable,Modal, Image } from 'react-native'
import React from 'react'

const modalSuccess = ({visible, onRequestClose}) => {
  return (
    <View>
       <Modal
        transparent={true} 
        visible={visible}
        animationType= "fade"
        onRequestClose={onRequestClose}
        >
        <Pressable className="flex-1 justify-center items-center bg-white/90 px-4" onPress={onRequestClose}>
            <View className="" onPress={(e) => e.stopPropagation()}>
                <Image source={require('../../../assets/icon/success.png')} resizeMode='contain' className="w-[300px] h-[300px]"/>
                <Text className="text-primaryRed text-3xl font-bold text-center">Sign up successfully! </Text>
            </View>
        </Pressable>   
        </Modal>
    </View>
  )
}

export default modalSuccess

const styles = StyleSheet.create({})