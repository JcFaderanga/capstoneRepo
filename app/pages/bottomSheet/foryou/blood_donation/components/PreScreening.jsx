import { StyleSheet, Text, View, Pressable, TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import * as Animatable from 'react-native-animatable'
import { ScrollView } from 'react-native-gesture-handler';


const PreScreening = () =>{
    const [modalVisible, setModalVisible] = useState(false);
  
    if(modalVisible){
      return(
        <ModalPublicDonate
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        />
      )
    }
    return(
    <ScrollView className="bg-primary_red"> 
        <View className=" w-full px-4 mt-5 mb-10">
            <Animatable.View className=" w-full rounded-xl bg-[#F64C61] px-4 py-4 my-2" 
            animation = 'zoomIn' duration={200} easing={'ease-in'} delay={0}>
                <Text className="text-white text-base text-center my-2">Donating blood is a compassionate and selfless act that can save lives.</Text>
            </Animatable.View>
            <Animatable.View className=" w-full rounded-xl bg-[#F64C61] px-4 py-4 my-2" 
            animation = 'zoomIn' duration={200} easing={'ease-in'} delay={200}>
                <Text className="text-white text-base text-center my-2">By becoming a blood donor, you ensure that the blood you provide is healthy and beneficial for those in need. </Text>
            </Animatable.View>
            <Animatable.View className=" w-full rounded-xl px- py-2" 
            animation = 'zoomIn' duration={200} easing={'ease-in'} delay={300}>
                <Text className="text-white font-bold text-base my-2">Condition that make your blood unsuitable for donation: </Text>
                <Text className="text-white text-base px-3">1. Acquired Immune Deficiency Syndrome (AIDS)/HIV Infection </Text>
                <Text className="text-white text-base px-3">2. Hepatitis </Text>
                <Text className="text-white text-base px-3">3. Syphilis </Text>
                <Text className="text-white text-base px-3">4. Malaria </Text>
            </Animatable.View>


            <Animatable.View className="w-full rounded-xl py-2 flex-row "
            animation = 'zoomIn' duration={200} easing={'ease-in'} delay={400}>
                 <View className="w-[50%] flex justify-center ">
                    <Text className="text-wrap text-base text-white font-bold">Do you have any Conditions mention above?</Text>
                </View>
                <View className="flex-row  items-center">
                    <Pressable className="w-20 h-12 border border-white rounded-2xl flex justify-center mx-2">
                        <Text className="text-white text-center font-bold">Yes</Text>
                    </Pressable> 
                    <Pressable className="w-20 h-12 border border-white rounded-2xl flex justify-center mx-2">
                        <Text className="text-white text-center font-bold">no</Text>
                    </Pressable> 
                </View>
            </Animatable.View>

            <Animatable.View className="w-full rounded-xl py-2 flex-row "
            animation = 'zoomIn' duration={200} easing={'ease-in'} delay={500}>
                 <View className="w-[50%] flex justify-center ">
                    <Text className="text-wrap text-base text-white font-bold">Are you feeling well today?</Text>
                </View>
                <View className="flex-row  items-center">
                    <Pressable className="w-20 h-12 border border-white rounded-2xl flex justify-center mx-2">
                        <Text className="text-white text-center font-bold">Yes</Text>
                    </Pressable> 
                    <Pressable className="w-20 h-12 border border-white rounded-2xl flex justify-center mx-2">
                        <Text className="text-white text-center font-bold">no</Text>
                    </Pressable> 
                </View>
            </Animatable.View>

            


           <TouchableOpacity className="w-[310px] h-[50px] mx-auto rounded-2xl bg-white justify-center items-center shadow-md mt-4"
           >
              <Text className="text-primary_red font-bold text-xl">Proceed now</Text>
            </TouchableOpacity>
        </View>
    </ScrollView>
    );
   }
export default PreScreening;