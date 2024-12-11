// import React, { useRef, useState, useEffect } from "react";
// import { ScrollView, View, Text, Dimensions, StyleSheet } from "react-native";
// import ThemeContainer from "../../components/UI/themeContainer";

// const AutoScrollViewWithPagination = () => {
//   const [currentPage, setCurrentPage] = useState(0);
//   const scrollViewRef = useRef(null);
//   const screenWidth = Dimensions.get("window").width;

//   const pages = [
//     { color: "red", text: "Page 1" },
//     { color: "orange", text: "Page 2" },
//     { color: "yellow", text: "Page 3" },
//     { color: "green", text: "Page 4" },
//     { color: "blue", text: "Page 5" },
//     { color: "indigo", text: "Page 6" },
//     { color: "violet", text: "Page 7" },

//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       // Calculate the next page index
//       const nextPage = (currentPage + 1) % pages.length;

//       // Scroll to the next page
//       if (scrollViewRef.current) {
//         scrollViewRef.current.scrollTo({
//           x: nextPage * screenWidth,
//           animated: true,
//         });
//       }

//       setCurrentPage(nextPage);
//     }, 100000); 

//     return () => clearInterval(interval); // Cleanup on unmount
//   }, [currentPage, screenWidth, pages.length]);

//   return (
//   <ThemeContainer>
//     <View style={styles.container}>
//       {/* Pagination Dots */}
//       <View style={styles.pagination}>
//         {pages.map((_, index) => (
//           <View
//             key={index}
//             style={[
//               styles.dot,
//               currentPage === index ? styles.activeDot : styles.inactiveDot,
//             ]}
//           />
//         ))}
//       </View>
//       <ScrollView
//         ref={scrollViewRef}
//         horizontal
//         pagingEnabled
//         showsHorizontalScrollIndicator={false}
//         onScroll={(event) => {
//           const offsetX = event.nativeEvent.contentOffset.x;
//           const pageIndex = Math.round(offsetX / screenWidth);
//           setCurrentPage(pageIndex);
//         }}
//         scrollEventThrottle={16}
//       >
//         {pages.map((page, index) => (
//           <View key={index} style={[styles.page, { backgroundColor: page.color }]}>
//             <Text style={styles.text}>{page.text}</Text>
//           </View>
//         ))}
//       </ScrollView>
 
//     </View>
//   </ThemeContainer> 
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   page: {
//     width: Dimensions.get("window").width,
//     height: Dimensions.get("window").height * 1, // Adjust height as needed
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   text: {
//     color: "#fff",
//     fontSize: 24,
//     fontWeight: "bold",
//   },
//   pagination: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     marginVertical: 20,
//   },
//   dot: {
//     width: 10,
//     height: 10,
//     borderRadius: 5,
//     marginHorizontal: 5,
//   },
//   activeDot: {
//     backgroundColor: "black",
//   },
//   inactiveDot: {
//     backgroundColor: "gray",
//   },
// });
import React, { useRef, useMemo, forwardRef } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // Import GestureHandlerRootView
import { BottomSheetModal } from '@gorhom/bottom-sheet';


const CustomBottomSheetModal = forwardRef((props, ref) => {
  const snapPoints = useMemo(() => ['50%', '75%'], []);

  return (
    <BottomSheetModal ref={ref} index={0} snapPoints={snapPoints}>
      <View style={styles.contentContainer}>
        <Text style={styles.containerHeadline}>Bottom Modal 😎</Text>
      </View>
    </BottomSheetModal>
  );
});

export default function TabOneScreen() {
  const bottomSheetRef = useRef(null);

  const handlePresentModalPress = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.present(); 
    } else {
      console.warn('BottomSheetModal reference is not set.');
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}> 
      <View style={styles.container}>
        <CustomBottomSheetModal ref={bottomSheetRef} />
        <Button title="Present Modal" onPress={handlePresentModalPress} />
      </View>
    </GestureHandlerRootView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center', // Center the content vertically
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center', // Center the content in the modal
  },
  containerHeadline: {
    fontSize: 24,
    fontWeight: '600',
    padding: 20,
  },
});
