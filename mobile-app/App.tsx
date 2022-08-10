import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Profile from './Profile';
import Repository from './Repository';
import Following from './Following';
import Followers from './Followers';
import Home from './Home';


const Tab = createBottomTabNavigator();

/**
 * Creates a tab navigator using the bottom tab navigator created in Tab to allow navigation between components and
 * adds styled icons.
 * @constructor NA
 */
function MyTabs() {
  return (
      <Tab.Navigator
          initialRouteName="Home"
          tabBarOptions={{
            activeTintColor: '#E94B26',
          }}
      >
        <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="home" color={color} size={size} />
              ),
            }}
        />
        <Tab.Screen
            name="Repository"
            component={Repository}
            options={{
                tabBarLabel: 'Repositories',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="book" color={color} size={size} />
                ),
            }}
        />
        <Tab.Screen
            name="Following"
            component={Following}
            options={{
                tabBarLabel: 'Following',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="account-check" color={color} size={size} />
                ),
            }}
        />
        <Tab.Screen
            name="Followers"
            component={Followers}
            options={{
                tabBarLabel: 'Followers',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="account-group" color={color} size={size} />
                ),
            }}
        />
        <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
              tabBarLabel: 'Profile',
              tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="account" color={color} size={size} />
              ),
            }}
        />
      </Tab.Navigator>
  );
}

/**
 * App component that controls the entire application with the NavigationContainer and MyTabs component.
 * @constructor NA
 */
export default function App() {
  return (
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
  );
}


