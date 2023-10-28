
import { View, Text, TextInput, Button, TouchableOpacity, Alert, Linking } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import Header1 from './Header1';
import { ScrollView } from 'react-native-gesture-handler';
import Footercomp from './Footer';
import axios from '../axios';
import Spinner from './Spinner';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin, GoogleSigninButton, statusCodes, } from '@react-native-google-signin/google-signin';
GoogleSignin.configure();
import config from '../config';

const Login = ({ setLoggedin }) => {
  const [loading, setloading] = useState(false);
  const [user, setuser] = useState({ email: '', password: '' });
  const navigate = useNavigation();

  async function userlogin() {
    setloading(true);
    // axios.post('/login', { ...user })
    axios.post('/login', user)
      .then(result => {
        setLoggedin(true);
        navigate.navigate('Dashboard');
        setloading(false);
      })
      .catch(err => {
        console.log('error in login', err);
        if (err.response && err.response.status === 300) {
          Alert.alert('Incorrect Credentials');
        } else {
          console.log(err);
          Alert.alert('User not found! Please Sign Up');
          navigate.navigate('SignUp');
        }
        setloading(false);
      });
  }
  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      let userInfo = await GoogleSignin.signIn();
      userInfo.API=config.API;
      console.log('userinfo', userInfo);
      setloading(true);
      axios.post("/androidgooglesign", { userInfo: userInfo })
        .then(result => {
          console.log(result.data);
          const token = result.data?.token;
          console.log('jwt token received', token);
          if (token) {
            AsyncStorage.setItem('token', token).then(() => { console.log('token saved'); })
          }
          setLoggedin(true);
          navigate.navigate('Dashboard');
        })
        .catch(async err => {
          Alert.alert('Error', 'Something Error Occured');
          try {
            await GoogleSignin.revokeAccess();
          } catch (error) {
            console.log(err,error);
          }
        })
        .finally(() => { setloading(false) });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ScrollView>
      <Header1></Header1>
      {loading && <Spinner></Spinner>}
      <View className=" border-0 m-1 h-[85vh]">
        <View className="w-full h-full flex flex-col justify-center items-center border-0">
          <Text className="text-lg text-center text-green-500 font-semibold m-5">Login</Text>
          <TextInput className="border-2 border-gray-200 w-full m-2 p-1" inputMode='email' placeholder='Enter Email' value={user.email} onChangeText={(text) => { setuser({ ...user, email: text }) }}></TextInput>
          <TextInput className="border-2 border-gray-200 w-full p-1" secureTextEntry={true} placeholder='Enter Password' value={user.password} onChangeText={(text) => { setuser({ ...user, password: text }) }}></TextInput>
          <View className="w-fit p-2 m-5">
            <Button color='green' title='Log In' onPress={() => { userlogin() }}></Button>
          </View>
          <GoogleSigninButton
            style={{ width: 250, height: 48 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={() => { 
              signInWithGoogle();
              // Linking.openURL('http://localhost:5500/auth/google') 
              // Alert.alert('unavailable','please use custom login')
            }}
          />
          <TouchableOpacity className="mt-5">
            <Text className="text-blue-500">Forget Password?</Text>
          </TouchableOpacity>
          <Text className="m-10">Don't Have account?</Text>
          <TouchableOpacity className="flex justify-center items-center flex-row" onPress={() => { navigate.navigate('SignUp') }}>
            <Text className="text-blue-400 p-2">Sign Up</Text>
            <Text>Here</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Footercomp></Footercomp>
    </ScrollView>
  )
}

export default Login;