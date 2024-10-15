import { StyleSheet, Text, View,Modal,Pressable } from 'react-native'
import React,{useState, useEffect} from 'react'
import CustomBtn from '../UI/button/button'
export const BloodType = ({type, onPress, isSelected }) => {
  return (
    <View>
      <Pressable 
      onPress={()=> onPress(type)}
      style={[isSelected && styles.bgBtn]}
      className="w-[65] h-[65] m-1 border-2 border-primaryRed rounded-[25px] flex justify-center items-center">
          <Text style={[isSelected && styles.txtColor]} className="text-xl font-bold text-primaryRed">{type}</Text>
      </Pressable>
    </View>
  )
}
const styles = StyleSheet.create({
  bgBtn:{
    backgroundColor: '#F42F47'
  },
  txtColor:{
    color: 'white',
  }
})

const modalFilterRequest = ({visible,onRequestClose,selectedBloodType}) => {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const typeList = ["A+","A-","B+","B-","O+","O-","AB+","AB-"];

  const handleSelectType = (type) => {
    // Toggle selection: add to array if not selected, remove if already selected
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };
   const handlePressed =()=>{
    selectedBloodType(selectedTypes);
    }
  return (
    <Modal
    transparent={true} 
    visible={visible}
    animationType="fade" 
    onRequestClose={onRequestClose} 
  >

    <Pressable className="flex-1 justify-center items-center bg-black/30" onPress={onRequestClose}>
      <Pressable className="w-[90%] bg-white rounded-[20px] py-5" onPress={(e) => e.stopPropagation()}>
       <Text className="text-xl font-bold text-[#3D3D3D] text-center mt-2">You Can Donate Blood To</Text>
       <Text className="text-base text-[#9C9C9C] text-center mt-2">Select blood group you want to donate</Text>
       <View className="flex-row flex-wrap justify-center mt-5 mb-3">
                {
                    typeList.map((type, index)=>(
                        <BloodType
                            key={index}
                            type={type}
                            onPress={handleSelectType}
                            isSelected={selectedTypes.includes(type)}
                        />
                    ))
                }
            </View>
            <View className="mx-auto mt-2 mb-5 w-[90%] h-[50px] ">
        <Pressable className="flex-1 text-white text-base bg-primaryRed rounded-xl justify-center items-center"
          onPress={handlePressed} 
        >
            <Text className="text-white text-lg font-bold">Okay</Text>          
       
        </Pressable>
      </View>
      </Pressable>
    </Pressable>
  </Modal>
  )
}

export default modalFilterRequest
