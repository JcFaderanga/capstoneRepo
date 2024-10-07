import { Modal, StyleSheet, Text, View,Pressable,Image,ImageBackground } from 'react-native'
import React from 'react'
import BloodStockIcon from '../bloodStockIcon'
import { homeIcons } from '../../constant'
const ModalBloodBank = ({visible, onRequestClose}) => {
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
                source={require('../../assets/icon/backArrow.png')}
                className="w-5 absolute my-1 mx-5"
                resizeMode='contain'
            />
        </Pressable>
            <View className='w-full h-full'> 
                <View className="w-full h-[40%] ">
                    <ImageBackground 
                        source={ require('../../assets/icon/bloodStockGraph.png') } // Remote image
                        className="w-full flex-1 justify-end"
                        resizeMode="cover" >
                            <View className="flex w-full h-[40%]">
                                <Text className=" text-xl text-[#464A57] text-center">BE A LIFESAVER</Text>
                                <Text className=" text-4xl text-primaryRed text-center">DONATE <Text className="font-bold">BLOOD</Text></Text>
                            </View>
                    </ImageBackground>
                </View>
                <View className="w-full px-2 mt-2 flex-wrap flex-row">
                    <View className="flex-row justify-center items-center">
                        <Text className="text-base font-bold my-2">Current Blood Stock </Text>
                        <Image className="w-[20] h-[20]"
                                    tintColor={'#F42F47'}
                                    source={homeIcons.FAQs}
                            />
                    </View>  
                    <View className="w-full flex-wrap flex-row justify-center">
                        <BloodStockIcon type={'A+'} stock='medium'/>
                        <BloodStockIcon type={'A-'} stock='low'/>
                        <BloodStockIcon type={'B+'} stock='medium'/>
                        <BloodStockIcon type={'B-'} stock='low'/>
                        <BloodStockIcon type={'AB+'} stock='high'/>
                        <BloodStockIcon type={'AB-'} stock='high'/>
                        <BloodStockIcon type={'O+'} stock='low'/>
                        <BloodStockIcon type={'O-'} stock='medium'/>
                    </View>
                </View>
            </View>
        </Modal>
    </View>
  )
}


export default ModalBloodBank

