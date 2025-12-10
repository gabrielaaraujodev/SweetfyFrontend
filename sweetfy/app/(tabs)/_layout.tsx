import { CustomTabBar } from '../../components/PageTips/BottomNavigator';
import { Image } from 'react-native';

import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen
        name="logout"
        options={{
          title: 'logout',
          tabBarIcon: ({ focused, size }) => (
            <Image
              source={require('../../assets/icons/logout.png')}
              style={{
                width: size,
                height: size,
                opacity: focused ? 1 : 0.5,
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused, size }) => (
            <Image
              source={require('../../assets/icons/home.png')}
              style={{
                width: size,
                height: size,
                opacity: focused ? 1 : 0.5,
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="teste2"
        options={{
          title: 'TEste2',
          tabBarIcon: ({ focused, size }) => (
            <Image
              source={require('../../assets/icons/profile.png')}
              style={{
                width: size,
                height: size,
                opacity: focused ? 1 : 0.5,
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="createProductPage"
        options={{
          href: null,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="createOrderPage"
        options={{
          href: null,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="createIngredientPage"
        options={{
          href: null,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="createServicePage"
        options={{
          href: null,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="createRecipePage"
        options={{
          href: null,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="seeMoreProducts"
        options={{
          href: null,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="seeMoreRecipes"
        options={{
          href: null,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="seeMoreOrders"
        options={{
          href: null,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
