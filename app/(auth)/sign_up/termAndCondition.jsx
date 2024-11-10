import { ScrollView, Text, View,Alert,StyleSheet, Image,Pressable} from 'react-native';
import React,{ useState, useEffect } from 'react';
import {useLocalSearchParams } from 'expo-router'
import CustomBtn from '../../../components/UI/button/button'
import { supabase } from '../../../lib/supabase'
import { useAuth } from '../../../context/authContext';
import { getUserData } from '../../../services/userServices';
import ModalSuccess from './modalSuccess';

const TermAndCondition = () => {
const [condition1, setCondition1] = useState(false);
const [condition2, setCondition2] = useState(false);
const [bgColor1, setBgColor1] = useState('');
const [bgColor2, setBgColor2] = useState('');
const [isLoading, setLoading] = useState(false);
const [Visible, setModalVisible] = useState(false);

const params = useLocalSearchParams();
const { setAuth, setUserData } = useAuth();
console.log("params",params.birthDate)
useEffect(() => {
    setBgColor1(condition1 ? '#F42F47' : 'transparent'); 
    setBgColor2(condition2 ? '#F42F47' : 'transparent'); 
  }, [condition1,condition2]);

  const submit=async()=>{
    if(!condition1 || !condition2){
        console.log("read term and Condition")
    }else{
        setLoading(true); 
        setModalVisible(true);
        const { data: { session, user }, error } = await supabase.auth.signUp({
          email: params.email,
          password: params.password,
        });
        if (error) {
            console.log("ERROR INSERTING EMAIL AND PASS:",error);
          Alert.alert("ERROR INSERTING EMAIL AND PASS:",error.message);
          return;
        }
        
        let res = await getUserData(session?.user?.id);
            setTimeout(()=>{
                setModalVisible(false)
            },1000)
        if(res.success) setUserData(res?.data);
        setAuth(session?.user);
        
        const { error: profileError } = await supabase
          .from('profile')
          .insert([
            { 
                user_id: user.id,  
                email: params.email,
                first_name: params.firstName,
                middle_name: params.middleName,
                last_name: params.lastName,
                address:{
                    street:params.street,
                    region:params.regionName,
                    province:params.provinceName,
                    city:params.cityName,
                    barangay:params.barangay,
                },
                birth_date: params.birthDate, 
                gender: params.gender,
                blood_type: params.bloodType,
                phone_number: params.number
            }
          ]);
        if (profileError) {
          Alert.alert("ERROR INSERTING PROFILE:",profileError.message);
        }
        
        setLoading(false); 
    }
  }
  return (
    <View className="flex-1 bg-gray-50">
         <ModalSuccess
                visible={Visible}
                onRequestClose={() => setModalVisible(false)} 
            />
        <View className="w-full flex-row justify-center mt-10 mb-[40px] mx-auto px-4">
              <View className=" ">
                <Image className="w-16 h-16" source={require('../../../assets/icon/redcross.png')} />
              </View>
              <View className="flex-1 ml-1 justify-center pl-5">
                <Text className="text-2xl text-customgray font-interbold">Philippine Red Cross</Text>
                <Text className="text-base text-customgray font-interbold">Muntinlupa Branch</Text>
              </View>
        </View>
        <View className="flex-1 justify-end">
            <View className="flex-1">
                <ScrollView className="w-full h-full px-4">
                    <Text className="text-base font-bold text-[#3D3D3D]">Term and Condition</Text>
                    <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's 
                        standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                         It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised 
                         in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like 
                         Aldus PageMaker including versions of Lorem Ipsum.</Text>
                    <Text>
                    Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature
                     from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, 
                     looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of 
                     the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 
                     of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise 
                     on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..",
                      comes from a line in section 1.10.32.The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those 
                      interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact
                       original form, accompanied by English versions from the 1914 translation by H. Rackham.
                    </Text>
                    <Text>
                    Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature
                     from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, 
                     looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of 
                     the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 
                     of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise 
                     on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..",
                      comes from a line in section 1.10.32.The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those 
                      interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact
                       original form, accompanied by English versions from the 1914 translation by H. Rackham.
                    </Text>
                    <View className="h-28 w-full flex align-center justify-center px-3">
                        <View className=" flex-row ">
                            <Pressable className="w-4 h-4 border mt-1 mr-2" style={{backgroundColor: bgColor1}} onPress={()=>setCondition1(!condition1)}/>
                            <Text>Accept and understand <Text className="text-primaryRed font-bold">Term and Conditions.</Text></Text>
                        </View>
                       <View className=" flex-row mt-2">
                            <Pressable className="w-4 h-4 border mt-1 mr-2" style={{backgroundColor: bgColor2}} onPress={()=>setCondition2(!condition2)}/>
                            <Text>By using this service, you confirm that you have read, understand and that you accept our <Text className="text-customgray font-bold">Term and Conditions.</Text> </Text>
                       </View>
                       
                    </View>
                </ScrollView>
            </View>
            <View style={{ elevation: 15 }} className=" h-40 pt-8 rounded-t-[40px] bg-white">
                    <CustomBtn
                        title={'Submit'}
                        onPress={submit}
                        isLoading={isLoading}
                    />
            </View>
        </View>
    </View>
  )
}

export default TermAndCondition

const styles = StyleSheet.create({})