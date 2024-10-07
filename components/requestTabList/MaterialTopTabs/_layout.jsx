import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ForYou from './ForYou'; // Update this to match the new file name
import MyDonation from './MyDonation';
import MyRequest from './MyRequest';

const Tab = createMaterialTopTabNavigator();

export default function MaterialTopTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="For You" component={ForYou} />
      <Tab.Screen name="My Donation" component={MyDonation} />
      <Tab.Screen name="My Request" component={MyRequest} />
    </Tab.Navigator>
  );
}
