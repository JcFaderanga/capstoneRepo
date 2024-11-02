React Native and Expo Router installation{
https://docs.expo.dev/router/installation/#prerequisites
npx create-expo-app@latest [your-app-name] --template blank@latest
npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar
}

Native wind installation{
https://www.nativewind.dev/quick-starts/expo
npm install nativewind
npm install --save-dev tailwindcss@3.3.2
--GO TO THE LINK ABOVE FOR DETAILED GUIDE--
}

Supabase isntallation{
https://supabase.com/docs/guides/getting-started/tutorials/with-expo-react-native
npx expo install @supabase/supabase-js @react-native-async-storage/async-storage @rneui/themed
}

MatrialTopTabs{
npm install @react-navigation/native @react-navigation/material-top-tabs react-native-pager-view
npm install react-native-screens react-native-safe-area-context

}
for dropdown list or menu{
npm install react-native-picker-select,
npm install @react-native-picker/picker
}

philippines addresses{
npm install phil-reg-prov-mun-brgy
}

EAS Build{
eas login / Logged out
eas build:configure
eas build -p android --profile preview
}

to update eas-cli@12.5.1 use "npm install -g eas-cli"

for Material Top Navigation
npm i @react-navigation/material-top-tabs

for image picker{
npx expo install expo-image-picker
}

for file system to upload image to supabase storage{
npx expo install expo-file-system
npm i base64-arraybuffer
}
folder structure
app/
(auth)/
(tabs)/
request.jsx
screen/
requestPages/
requestdetails.jsx
/\_layout.jsx
index.jsx
component/
requestTabList/
MaterialTopTabs/
layoout.jsx
foryou.jsx
mydonation.jsx
myrequest.jsx

database structure
profile{
id,
user_id,
contact: {email, phone},
user: {first_name,middle_name,last_name},
user_details: {birth_date,gender,blood_type},
donation_status:{donation_Availability,anonymous_donor},
address:{region,province,city,street},
},

NOTIFICATION

donation request

- recieve notif if some send a blood request
- status of blood request(if you request)
- status of who donated how many donated(if you request)
- status of your donation when you donate

donation drive

- recieve notication for up comming donation drive
