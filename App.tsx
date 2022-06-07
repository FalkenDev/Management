import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Base } from './styles/index.js'; 
import { useEffect, useState } from 'react';
import FlashMessage from 'react-native-flash-message';
import Home from './components/Home';
import LoginScreen from "react-native-login-screen";
import { ImageBackground, Text, View } from 'react-native';
import AuthModel from "./models/auth";
import { showMessage } from 'react-native-flash-message';

const Tab = createBottomTabNavigator();
const routeIcons = {
  "Hem": "home",
  "Projects": "folder-open",
  "Inspiration": "lightbulb-outline",
  "To-Do": "auto-awesome-motion",
  "Planner": "calendar-today",
  "Links": "link",
};

export default function App() {
  console.log("------| app.tsx |------");
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
  let setEmail = "";
  let setPassword = "";
  //console.log(auth);
  console.log(setEmail);
  console.log(setPassword);

  async function doLogin() {
    if (setPassword && setEmail) {
        const result = await AuthModel.login(setEmail, setPassword);
        setEmail = "";
        setPassword = "";

        if(result.type === "success") {
            setIsLoggedIn(true);
        }
        showMessage(result);
    } else {
        showMessage({
            message: "E-post eller lössenord fattas",
            description: "Var vänligen att skriva in både e-post och lössenord",
            type: "warning"
        });
    }
}
  let statement1 = false;
  let statement2 = false;
  if (isLoggedIn === false) {
    return (
      <SafeAreaView style={Base.container}>
          <LoginScreen
            logoImageSource={require("./assets/FalkenDevLogo.png")}
            onLoginPress={() => {
              doLogin()
            }}
            onSignupPress={() => {}}
            onEmailChange={(emailString: string) => {
              setEmail = emailString;
            }}
            onPasswordChange={(passwordString: string) => {
              setPassword = passwordString;
            }}
            disableSocialButtons={false}
            disableSignup={true} // Ingen signup atm
          >
          </LoginScreen>
        <StatusBar style="light" />
        <FlashMessage position="top"/>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={Base.container}>
        <NavigationContainer>
        <Tab.Navigator screenOptions={({ route }) => ({
          headerStyle: {
            backgroundColor: '#1a1a1a',
          },
          headerTitleStyle: {
            color: 'white'
          },
          tabBarStyle: {
            backgroundColor: '#1a1a1a',
            height: 60,
            borderTopWidth: 0,
            paddingHorizontal: 5,
            paddingBottom: 5,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            marginTop: -5,
            paddingBottom: 4,
          },
          tabBarIcon: ({ color, size }) => {
            let iconName = routeIcons[route.name] || "warning";

            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'gray',
        })}
      >
            <Tab.Screen name="Hem" component={Home}/>
            <Tab.Screen name="Projects" component={Home}/>
            <Tab.Screen name="Inspiration" component={Home}/>
            <Tab.Screen name="To-Do" component={Home}/>
            <Tab.Screen name="Planner" component={Home}/>
            <Tab.Screen name="Links" component={Home}/>
          </Tab.Navigator>
        </NavigationContainer>
        <StatusBar style="light" />
        <FlashMessage position="top"/>
      </SafeAreaView>
    );
  }
}
