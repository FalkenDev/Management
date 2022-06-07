import { ImageBackground, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Base, Typography } from '../styles/index.js'; 
import { StatusBar } from 'expo-status-bar';

export default function Home(route) {
  console.log("Home");
  return (
    <SafeAreaView style={Base.container}>
        <View style={Base.home}>
        <Text style={Typography.title}>Hej på dig</Text>
      </View>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}