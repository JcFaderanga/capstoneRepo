import { StyleSheet, Text, View,Image, Pressable } from 'react-native'
import React from 'react'
import { useAuth } from '../context/authContext';
import { avatar } from '../constant';
const _layout=()=>{
    return (
        <AuthProvider>
          <ProfileInfo />
        </AuthProvider>
      );
}

const ProfileInfo = ({setProfile,profile}) => {
console.log("profilInfo = avatar is -- ",profile)
    const { setAuth, user } = useAuth();
    const formatDate = (timestamp) => {
      // Check if timestamp is valid
      if (!timestamp || isNaN(new Date(timestamp).getTime())) {
        return "Invalid date";  
      }
      const date = new Date(timestamp);
      const options = { year: 'numeric', month: 'long' };
      return new Intl.DateTimeFormat('en-US', options).format(date);
    };
    
    const userCreatedAt = user?.created_at;
    const formattedDate = formatDate(userCreatedAt);
  return (
    <>
        <View className="w-full h-[180px] flex bg-primaryRed">
                <View className="w-full h-[130px] flex-row items-center justify-between">
                    <View className=" ml-6">
                        <Image source={profile}
                                  style={styles.profileImage}
                                  className=""
                                  resizeMethod='retain'/>
                          <Pressable 
                          style={{elevation: 5}}
                          className="w-8 h-8 rounded-full bg-white absolute bottom-0 right-1 flex items-center justify-center"
                          onPress={setProfile}
                          >
                            <Image 
                            source={require('../assets/icon/editPen.png')} 
                            resizeMode='contain' 
                            className="w-4"
                            style={{elevation: 5, tintColor: '#3A3A3A'}}
                            />
                          </Pressable>
                    </View>  
                    <View className="float-left  h-full flex-1 ml-5 justify-center">
                      <Text className="float-left text-2xl font-bold text-white">{user && user.first_name + ' '+ user.last_name}</Text>
                      <Text className="float-left text-sm font-bold text-white">ID: {user&&user.id}</Text>
                    </View>
                </View>
                <View className="w-full h-[35] flex-1 flex-row items-center justify-between px-4">
                  <View className="flex-row items-center">
                    <Text className="text-white text-[11px]">Joined {user && formattedDate}</Text>
                    </View>
                    <View className="flex-row">
                        <Text className="text-white mx-3 text-sm">
                          <Text className="text-base font-bold">0 </Text>
                          Following
                        </Text>
                        <Text className="text-white text-sm">
                          <Text className="text-base font-bold">0 </Text>
                          Follower
                        </Text>
                    </View>
                </View>
            </View>
    </>
    
  )
}

export default ProfileInfo
const styles = StyleSheet.create({
    profileImage: {
      width: 110,
      height: 110,
      borderColor: 'white',
     // borderWidth: 1,
      borderRadius:50,
      elevation: 10,
      shadowColor: '#000',
      shadowOffset: { width: 20, height: 20 },
      shadowOpacity: 1,
      shadowRadius: 10, // For a rounded image
    },
  });
