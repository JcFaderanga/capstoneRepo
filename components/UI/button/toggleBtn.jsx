import { Pressable, Image, Alert, View } from "react-native";
import React, { useEffect, useState } from "react";

const ToggleBtn = ({
  AlterDescription,
  onPress,
  AlertTitle,
  disable = false,
  status = false,
}) => {
  const [isToggle, setToggle] = useState(status);

  useEffect(() => {
    setToggle(!!status);
  }, [status]);

  const handlePress = () => {
    if (disable) return;
    if (!isToggle) {
      Alert.alert(
        AlertTitle || "Alert", // Fallback for AlertTitle
        AlterDescription || "No description provided.", // Fallback for AlterDescription
        [{ text: "OK" }]
      );
    }

    // Update toggle state
    setToggle((prevToggle) => !prevToggle);

    // Trigger onPress callback if provided
    if (onPress) {
      onPress(!isToggle);
    }
  };

  return (
    <View>
      <Pressable onPress={handlePress}>
        <Image
          className="w-9"
          source={
            isToggle
              ? require("../../../assets/icon/toggleOn.png")
              : require("../../../assets/icon/toggleOff.png")
          }
          resizeMode="contain"
        />
      </Pressable>
    </View>
  );
};

export default ToggleBtn;
