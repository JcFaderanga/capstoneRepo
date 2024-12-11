import { StyleSheet, Text, View,ImageBackground} from 'react-native'
import React from 'react'
import { homeIcons } from '../constant'
const BloodStockIcon = ({type,stock}) => {

    let stockStatus;
    if(stock === 'low'){
         stockStatus = homeIcons.lowStock;
    }
    if(stock === 'medium'){
         stockStatus = homeIcons.mediumStock;
    }
    if(stock === 'high'){
         stockStatus = homeIcons.highStock;
    }
  return (
    <View>
        <View className="h-[72] w-[52] m-4 mb-1">      
            <ImageBackground source={stockStatus}
                className="w-full flex-1 justify-end"
                resizeMode="cover" >
                <Text className="bg-[#3A3A3A] rounded-full w-8 h-8 text-center py-1 text-white font-bold absolute top-[-5] right-[-10]">{type}</Text>
            </ImageBackground>
        </View>
        <Text className="text-center text-base">{stock}</Text>
    </View>
  )
}

export default BloodStockIcon

const styles = StyleSheet.create({})