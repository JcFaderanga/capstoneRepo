import {
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import style from '../style/style'; 

const CustomBtn = ({ title, onPress, disable, isLoading }) => {
  return (
    <View>
      <View className="mx-auto mt-5 mb-5">
        <TouchableOpacity className="text-white text-base"
          style={[style.button, disable && { opacity: 0.9 }]} 
          onPress={onPress} 
          disabled={disable}
        >
          {isLoading ? (
            <Image 
              source={require("../assets/icon/loading1.gif")}  
              style={{ width: 30, height: 30, tintColor:"white" }}              
            />
          ) : (
            <Text className="text-white text-base font-bold">{title}</Text>          
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomBtn;
