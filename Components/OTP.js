import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, TouchableOpacity, Alert } from 'react-native';
import axios from '../axios';
import { useNavigation } from '@react-navigation/native';

const OTP = ({ isVisible, onClose, onSubmit, fun ,setLoggedin}) => {
  const navigate = useNavigation();
  const [otp, setOtp] = useState('');
  const handleSubmit = async () => {
    axios.post('/verifyotp', otp)
    // axios.post('/verifyotp', { otp })
      .then(result => {
        setLoggedin(true);
        fun(false);
        navigate.navigate('Dashboard');
      })
      .catch(err => {
        Alert.alert('OTP not verified');
        fun(false);
      })
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.7}
    >
      <View className="w-full h-screen flex justify-center items-center gap-5">
        <Text className="w-3/4 text-center font-bold ">Enter OTP sent to GMail</Text>
        <TextInput
          className="border-2 border-slate-300 w-3/4 p-2 my-5"
          placeholder="Enter OTP"
          onChangeText={(text) => setOtp(text)}
          value={otp}
          keyboardType="default"
          maxLength={6}
        />
        <Button title="Submit" onPress={handleSubmit} />

        <TouchableOpacity className="py-10" onPress={() => { fun(false) }}>
          <Text className="text-blue-500">Return to Sign Up page</Text>
        </TouchableOpacity>

      </View>
    </Modal>
  );
};

export default OTP;
