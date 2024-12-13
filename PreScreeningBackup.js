// import { StyleSheet, Text, View,  Image, ImageBackground, Pressable, TouchableOpacity } from 'react-native'
// import React,{useState, useCallback, useMemo, useRef, forwardRef, useEffect} from 'react'
// import { BottomSheetView, BottomSheetBackdrop,BottomSheetModal  } from '@gorhom/bottom-sheet';
// import { TimeAgo } from '../../../../../constant/timeStamp';
// import * as Progress from 'react-native-progress';
// import * as Animatable from 'react-native-animatable'
// import AntDesign from '@expo/vector-icons/AntDesign';
// import { useAuth } from '../../../../../context/authContext';
// import { ScrollView } from 'react-native-gesture-handler';
// import ModalPublicDonate from '../../../../../components/Modals/request__tab/foryou/publicDonate/ModalPublicDonate';
// import PreSreening from './components/PreScreening'
// const SheetViewRequest = forwardRef(({request_data}, ref) => {
// const [isDonate, setDonate] = useState(false);
  
//    const donate=()=>{
//       snapeToIndex(1)
//       setDonate(true)
//    };
//     const snapPoints = useMemo(() => ['80%','96%'], []);
//     const snapeToIndex = (index) => ref.current?.snapToIndex(index);
//     const renderBackdrop = useCallback(
//         (props) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
//         []
//     );

//     const onSheetChange = useCallback((index) => {
//       if (index === -1) {
//         setDonate(false);
//       }
//     }, []);

//     const renderCustomHandle = () => (
//       <View className="h-14 rounded-t-xl bg-primary_red  items-center flex-row justify-between px-4">
//         {isDonate ? (
//           <Pressable onPress={()=>{setDonate(false);  snapeToIndex(0)}}>
//              <AntDesign name="arrowleft" size={24} color="white" />
//           </Pressable>
//         ):(
//           <Text className="text-white">Posted {TimeAgo(request_data?.created_at)}</Text>
//         )}
//         <View className="flex-row ">
//           <Image source={require('../../../../../assets/icon/dots.png')} resizeMode='contain' className="w-8"/>
//         </View>
//       </View>
//     );
  
//     return (
//       <BottomSheetModal ref={ref} snapPoints={snapPoints} backdropComponent={renderBackdrop}
//         handleComponent={renderCustomHandle} onChange={onSheetChange} className="bg-primary_red"
//       >
//             <BottomSheetView className="bg-primary_red h-full" >
//               {isDonate?(
//                   <PreSreening/>
//               ):(
//                 <Preview request_data={request_data} />
//               )}
            
//                 <Animatable.View  animation = 'zoomIn' duration={200} easing={'ease-in-out'} delay={400}>
//                     <TouchableOpacity
//                         style={isDonate ? { display: 'none' } : {}}
//                         onPress={() => donate()}
//                         accessible={true}
//                         accessibilityLabel="Donate blood button"
//                         className="w-[310px] h-[50px] mx-auto rounded-2xl bg-white justify-center items-center shadow-md mt-4"
//                       >
//                         <Text className="text-primary_red font-bold text-xl">Donate</Text>
//                     </TouchableOpacity>
//                 </Animatable.View>
//             </BottomSheetView>
//       </BottomSheetModal>
//     );
// })
// export default SheetViewRequest;


// {/* REQUEST STATUS*/}
// const RequestStatus =({request_data})=>{

//   return(
// <  Animatable.View  animation = 'zoomIn' duration={200} easing={'ease-in-out'} delay={300}>
//       <ImageBackground
//           source={require('../../../../../assets/icon/handBG.png')}
//           className="mx-auto w-[90%] rounded-3xl h-40 bg-[#F58694] mt-10 mb-5"
//           resizeMode="cover" >
//           <View className="flex-row h-full w-full items-center justify-evenly">
//             <View className="w-32  h-32 rounded-full flex justify-center items-center">
//             <Progress.Circle
//                 progress={.70} size={110} borderWidth={0}
//                 color="#F42F47" thickness={9} showsText={true} 
//                 formatText={() => request_data?.blood_type} 
//                 textStyle={styles.progressText} unfilledColor="#E5E5E5" 
//                 animated={true} 
//               />
//             </View>
//             <View>
//               <Text className="text-white text-2xl font-bold ">Need</Text>
//               <Text className="text-white text-5xl font-bold">{request_data?.units}</Text>
//             </View>
//             <View>
//               <Text className="text-white text-2xl font-bold">Left</Text>
//               <Text className="text-white text-5xl font-bold">2</Text>
//             </View>
//           </View>
//         </ImageBackground>
//        </Animatable.View> 
//   );
// }


// {/* PREVIEW PAGE*/}
// const Preview = ({request_data}) =>{
//   const {user} = useAuth();
//  return(
//   <View className="bg-primary_red  "> 
//       < View className="w-full flex items-center pt-11 px-4 " >

//           <Animatable.View  animation = 'zoomIn' duration={200} easing={'ease-in-out'} delay={100}>
//               <Image source={require('../../../../../assets/icon/profilePic2.jpg')} 
//                 resizeMode='contain' className="h-32 w-32 rounded-full border-2 border-white"/> 
//           </Animatable.View>
//           <Animatable.View className=" flex items-center justify-center" animation = 'zoomIn' duration={200} easing={'ease-in'} delay={200}>
//               <Text className="text-3xl font-bold text-white mt-5 mb-2">{request_data?.userName}</Text>
//               <Text className="text-center text-white">I need a blood donation of {request_data?.blood_type} as soon as possible. Please consider helping.</Text>
//            </Animatable.View>  
//       </View>
//     <RequestStatus request_data={request_data} />
//         <Animatable.Text animation = 'zoomIn' duration={200} easing={'ease-in-out'} delay={400}
//           className="text-white px-4 text-base text-center font-bold">
//             Your blood type {user?.blood_type} is compatible with patients having A+ and AB+ blood types.
//         </Animatable.Text>
//     </View>
//  );
// }

// const styles = StyleSheet.create({
//   progressText: {
//     color: 'white',
//     fontSize: 40,
//     fontWeight: 'bold',
//   },
// })