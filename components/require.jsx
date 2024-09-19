import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

const Require = ({ message }) => {
  const [isVisible, setIsVisible] = useState(false);
  const timerRef = useRef(null);

 
  
  const handlePressIn = () => {
    setIsVisible(true);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  const handlePressOut = () => {
    timerRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 1500); // Adjusted timing for responsive hiding
  };

  return (
    <>
      {isVisible && (
        <Text
          className="absolute right-9 top-[10px] text-primaryRed bg-red-200 border-primaryRed px-3 font-bold py-1 rounded-3xl"
        >
          {message.message}
        </Text>
      )}
      {message.condition && (
        <TouchableOpacity
          className="absolute right-0"
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <Image
            className="w-5 h-5 mr-3"
            source={require('../assets/icon/required.png')}
          />
        </TouchableOpacity>
      )}
    </>
  );
};

export default Require;
