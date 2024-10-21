import { Pressable, Image, Alert, View } from 'react-native';
import React, { useState } from 'react';

const ToggleBtn = ({ AlterDescription, onPress, AlertTitle,status }) => {
  const [isToggle, setToggle] = useState(status);

  const handlePress = () => {
    // If toggle is currently off (false) and being turned on (true)
    if (!isToggle) {
      Alert.alert(
        AlertTitle,
        AlterDescription,  // Alert only when turning on
        [{ text: 'OK' }]
      );
    }
    // Update the toggle state
    setToggle(!isToggle);

    // Call the onPress function passed as a prop if it exists
    onPress && onPress(!isToggle); // Passing the new toggle state
  };

  return (
    <View>
      <Pressable onPress={handlePress}>
        <Image
          className="w-9"
          source={
            isToggle
              ? require('../../../assets/icon/toggleOn.png')  // Show on state
              : require('../../../assets/icon/toggleOff.png') // Show off state
          }
          resizeMode='contain'
        />
      </Pressable>
    </View>
  );
};

export default ToggleBtn;
