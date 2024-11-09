import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const CustomDatePicker = () => {
  const [date, setDate] = useState(null); // Initialize as null
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate) => {
    setDate(selectedDate); // Set selected date
    hideDatePicker();
  };

  // Format date to "Nov 10 2024"
  const formatDate = (date) => {
    return date ? date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }) : 'Select Date';
  };

  return (
    <View style={{ padding: 20 }}>
      <View style={{ width: '100%', borderColor: '#ccc', borderWidth: 1, height: 48, borderRadius: 15, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16 }}>
        <Text style={{ fontSize: 16, color: '#808080' }}>
          {formatDate(date)}
        </Text>
        <Pressable style={{ width: '100%', height: '100%', position: 'absolute' }} onPress={showDatePicker} />
      </View>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        date={date || new Date()}
        maximumDate={new Date()}
        customHeaderIOS={<Text style={{ fontSize: 18, fontWeight: 'bold' }}>Pick a Date</Text>}
      />
    </View>
  );
};

export default CustomDatePicker;
