import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Homepage from './Components/Homepage';
import Features from './Components/Features';
import About from './Components/About';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Services from './Components/Services';
import Dashboard from './Components/Dashboard';
import axios from './axios';
import Profile from './Components/Profile';
import SymptomsList from './Components/Symptoms';
import GetAppointment from './Components/Appointment';
import Goals from './Components/Goals';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ResetPassword from './Components/ResetPassword';
import SplashScreen from 'react-native-splash-screen';

const Drawer = createDrawerNavigator();
export default function App()
{
  const [loggedin, setloggedin] = useState(false);
  if (typeof drawerLabel === "function" && drawerLabel() === null) return null;
  async function usercookie()
  {
    let user =await AsyncStorage.getItem('token');
    user = "user=" + user;
    axios.post("/initializeuser", {user:user}).then(responce => { console.log(responce.data);setloggedin(true) }).catch(err => { console.log(err);setloggedin(false);AsyncStorage.removeItem('token').then(()=>{console.log('token deleted');}) })
  }
  useEffect(() =>
  {
    SplashScreen.hide();
    axios.get("/user")
      .then(result => { setloggedin(true) })
      .catch(err =>
      {
        setloggedin(false);
      })
      usercookie();
  },[])
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen options={{headerShown:'' }} name="Home">{(props) => <Homepage {...props} loggedin={loggedin} />}</Drawer.Screen>
        <Drawer.Screen options={{ headerShown: '' }} name="Features" component={Features} />
        <Drawer.Screen options={{ headerShown: '' }} name="AboutUs" component={About} />
        {!loggedin && <Drawer.Screen options={{ headerShown: '', drawerItemStyle: { display: 'none' } }} name="SignUp">{(props) => <SignUp {...props} setLoggedin={setloggedin} />}</Drawer.Screen>}
        {!loggedin && <Drawer.Screen options={{ headerShown: '' }} name="Login">{(props) => <Login {...props} setLoggedin={setloggedin} />}</Drawer.Screen>}
        {loggedin && <Drawer.Screen options={{ headerShown: '' }} name="Dashboard" component={Dashboard} />}
        {loggedin && <Drawer.Screen options={{ headerShown: '' }} name="Profile">{(props) => <Profile {...props} setLoggedin={setloggedin} />}</Drawer.Screen>}
        {loggedin && <Drawer.Screen options={{ headerShown: '' }} name="Symptom" component={SymptomsList} />}
        {loggedin && <Drawer.Screen options={{ headerShown: '' }} name="GetAppointments" component={GetAppointment} />}
        {loggedin && <Drawer.Screen options={{ headerShown: '' }} name="Exercize Goals" component={Goals} />}
        {loggedin && <Drawer.Screen options={{ headerShown: '', drawerItemStyle: { display: 'none' } }} name="ResetPass" component={ResetPassword} />}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}


// import { ScrollView, Text, View } from "react-native";
// import axios from "./axios";
// import Header from "./Components/Header";
// import Homepage from "./Components/Homepage";
// import Footer from "./Components/Footer";
// import Features from "./Components/Features";
// export default function App()
// {
//   return(<ScrollView>
//     <Header></Header>
//     <Homepage></Homepage>
//     <Features></Features>
//     <Footer></Footer>
//   </ScrollView>)
// }