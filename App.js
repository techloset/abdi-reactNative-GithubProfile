import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UserScreen from './src/screens/UserScreen';
import RepoScreen from './src/screens/RepoScreen';
import {ApolloProvider, client} from './src/context/AppoloClient';
import NAVIGATION from './src/libs/NAV';
import SCREENS from './src/libs/SCREENS';
const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={SCREENS.HOME}
          screenOptions={{headerShown: false}}>
          {NAVIGATION.map((item, index) => {
            return (
              <Stack.Screen
                key={index}
                name={item.screenName}
                component={item.component}
              />
            );
          })}
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
