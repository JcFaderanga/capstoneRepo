import { Modal, StyleSheet, Text, View,Pressable } from 'react-native'
import React from 'react'

const ModalRequestInvalidBloodType = ({visible, onRequestClose}) => {
  return (
    <View>
        <Modal
        transparent={true} 
        visible={visible}
        animationType= "fade"
        onRequestClose={onRequestClose}
        >
        <Pressable className="flex-1 justify-center items-center bg-black/30 px-4" onPress={onRequestClose}>
            <View className="w-full bg-white h-[250px] rounded-3xl" onPress={(e) => e.stopPropagation()}>
            
            </View>
        </Pressable>   
        </Modal>
    </View>
  )
}

export default ModalRequestInvalidBloodType

const styles = StyleSheet.create({})