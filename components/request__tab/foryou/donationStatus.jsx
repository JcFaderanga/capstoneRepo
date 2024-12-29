import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import React from 'react'
import * as Progress from 'react-native-progress';
const DonationStatusBar = ({request_data, progress}) => {
  return (
    <ImageBackground
        source={require('../../../assets/icon/handBG.png')}
        className="mx-auto w-[90%] rounded-3xl h-40 bg-[#F58694] mt-10 mb-5"
        resizeMode="cover" >
        <View className="flex-row h-full w-full items-center justify-evenly">
        <View className="w-32  h-32 rounded-full flex justify-center items-center">
        <Progress.Circle
            progress={progress?.percent} size={110} borderWidth={0}
            color="#F42F47" thickness={9} showsText={true} 
            formatText={() => request_data?.blood_type} 
            textStyle={styles.progressText} unfilledColor="#E5E5E5" 
            animated={true} 
            />
        </View>
        <View>
            <Text className="text-white text-2xl font-bold ">Need</Text>
            <Text className="text-white text-5xl font-bold">{request_data?.units}</Text>
        </View>
        <View>
            <Text className="text-white text-2xl font-bold">Left</Text>
            <Text className="text-white text-5xl font-bold">{progress?.left}</Text>
        </View>
        </View>
    </ImageBackground>
  )
}

export default DonationStatusBar
const styles = StyleSheet.create({
    progressText: {
      color: 'white',
      fontSize: 40,
      fontWeight: 'bold',
    },
  })