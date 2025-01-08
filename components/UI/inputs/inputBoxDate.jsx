import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const InputBoxDate = ({ selectedDate, setSelectedDate, detail, validationError, min }) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setSelectedDate(date);  // Update the birthDate in the parent component
        console.log("function handlCon date :",date)
        hideDatePicker();
    };

    const formatDate = (date) => {
        return date ? date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        }) : 'Select date';
    };

    const today = new Date();
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 1);
    return (
        <View>
            <View className="mt-5 flex items-center w-full">
                <View className="w-full">
                    <Text className=" text-lg px-5 pb-1">{detail}</Text>
                </View>
                <View className="flex justify-center">
                    <View className="
                    w-[310px] h-[56px] rounded-[15px] p-4 text-lg bg-gray-50 border border-[#D9D9D9]
                    focus:bg-gray-100 focus:border-2 focus:border-gray-100"
                        style={
                            (validationError) ? {borderColor: 'red', borderWidth: 2} : {} }
                    >
                        <Text className="text-lg text-[#646464]">
                            {formatDate(selectedDate)}
                        </Text>
                        <Pressable className="absolute w-full h-[55]" onPress={showDatePicker} />
                    </View>
                    <Text className="px-2 absolute bottom-[-20] text-primary_red">{validationError}</Text>
                </View>
            </View>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                date={selectedDate || new Date()}
                minimumDate={min ? today : undefined}
                maximumDate={min? maxDate : today}
                customHeaderIOS={<Text style={{ fontSize: 18, fontWeight: 'bold' }}>Pick a Date</Text>}
            />
        </View>
    );
};

export default InputBoxDate;
