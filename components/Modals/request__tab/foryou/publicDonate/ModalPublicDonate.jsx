import { Modal, StyleSheet, Text, View,Pressable,Image,ImageBackground } from 'react-native'
import React from 'react'

const ModalPublicDonate = ({visible, onRequestClose}) => {
  return (
    <View>
        <Modal
        transparent={false} 
        visible={visible}
        animationType= "slide"
        onRequestClose={onRequestClose}
        >
        <Pressable onPress={onRequestClose} className="w-full h-16">
            <Image
                source={require('../../../../../assets/icon/backArrow.png')}
                className="w-5 absolute my-1 mx-5"
                resizeMode='contain'
            />
        </Pressable>
            <View className='w-full h-full'> 
               <Text>Pre-Screening</Text>
            </View>
        </Modal>
    </View>
  )
}


export default ModalPublicDonate

