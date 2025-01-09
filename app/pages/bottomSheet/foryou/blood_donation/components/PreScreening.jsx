import { StyleSheet, Text, View, Pressable, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import * as Animatable from 'react-native-animatable';
import { ScrollView } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';

// Example Modal Component Placeholder
const ModalPublicDonate = ({ visible, onRequestClose }) => {
    if (!visible) return null;
    return (
        <View style={styles.modalContainer}>
            <Text style={styles.modalText}>This is the modal content</Text>
            <TouchableOpacity onPress={onRequestClose} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
        </View>
    );
};

const PreScreening = ({ onPress, request_data }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [condition, setCondition] = useState(null); // null = no selection, true = "Yes", false = "No"
    const router = useRouter();

    const handleProceed = () => {
        if (condition === false) {
            // Only allow proceeding if "No" is selected
            router.push({
                pathname: '../../../../pages/donate',
                params: { request_data: JSON.stringify(request_data) },
            });

            if (onPress) {
                onPress(true);
            }
        }
    };

    const handleConditionSelect = (value) => {
        setCondition(value);
        if (value === true) {
            // Show alert when "Yes" is selected
            Alert.alert(
                "Consult Your Doctor",
                "You have mentioned a condition that may make you ineligible for donation. Please consult your doctor for advice.",
                [{ text: "OK", onPress: () => {} }]
            );
        }
    };

    const renderPressable = (value, label) => (
        <Pressable
            style={{
                backgroundColor: condition === value ? 'white' : 'transparent',
            }}
            className="w-20 h-12 border border-white rounded-2xl flex justify-center mx-2"
            onPress={() => handleConditionSelect(value)}
        >
            <Text
                style={{
                    color: condition === value ? '#F42F47' : 'white',
                }}
                className="text-white text-center font-bold"
            >
                {label}
            </Text>
        </Pressable>
    );

    if (modalVisible) {
        return (
            <ModalPublicDonate
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            />
        );
    }

    return (
        <ScrollView className="bg-primary_red">
            <View className="w-full px-4 mt-5 mb-10">
                {/* Informational Animatable Views */}
                <Animatable.View
                    className="w-full rounded-xl bg-[#F64C61] px-4 py-4 my-2"
                    animation="zoomIn"
                    duration={200}
                    easing="ease-in"
                >
                    <Text className="text-white text-base text-center my-2">
                        Donating blood is a compassionate and selfless act that can save lives.
                    </Text>
                </Animatable.View>
                <Animatable.View
                    className="w-full rounded-xl bg-[#F64C61] px-4 py-4 my-2"
                    animation="zoomIn"
                    duration={200}
                    easing="ease-in"
                    delay={200}
                >
                    <Text className="text-white text-base text-center my-2">
                        By becoming a blood donor, you ensure that the blood you provide is healthy and beneficial for those in need.
                    </Text>
                </Animatable.View>
                <Animatable.View
                    className="w-full rounded-xl px- py-2"
                    animation="zoomIn"
                    duration={200}
                    easing="ease-in"
                    delay={300}
                >
                    <Text className="text-white font-bold text-base my-2">
                        Conditions that make your blood unsuitable for donation:
                    </Text>
                    <Text className="text-white text-base px-3">1. Acquired Immune Deficiency Syndrome (AIDS)/HIV Infection</Text>
                    <Text className="text-white text-base px-3">2. Hepatitis</Text>
                    <Text className="text-white text-base px-3">3. Syphilis</Text>
                    <Text className="text-white text-base px-3">4. Malaria</Text>
                </Animatable.View>

                {/* Yes/No Selection */}
                <Animatable.View
                    className="w-full rounded-xl py-2 flex-row"
                    animation="zoomIn"
                    duration={200}
                    easing="ease-in"
                    delay={400}
                >
                    <View className="w-[50%] flex justify-center">
                        <Text className="text-wrap text-base text-white font-bold">
                            Do you have any conditions mentioned above?
                        </Text>
                    </View>
                    <View className="flex-row items-center">
                        {renderPressable(true, 'Yes')}
                        {renderPressable(false, 'No')}
                    </View>
                </Animatable.View>

                {/* Proceed Button */}
                <TouchableOpacity
                    disabled={condition !== false} // Enabled only if "No" is selected
                    style={{
                        opacity: condition !== false ? 0.5 : 1,
                    }}
                    className="w-[310px] h-[50px] mx-auto rounded-2xl bg-white justify-center items-center shadow-md mt-10"
                    onPress={handleProceed}
                >
                    <Text className="text-primary_red font-bold text-xl">Proceed now</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default PreScreening;

// Styles
const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalText: {
        color: 'white',
        fontSize: 18,
        marginBottom: 20,
    },
    modalButton: {
        backgroundColor: '#F42F47',
        padding: 10,
        borderRadius: 10,
    },
    modalButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
