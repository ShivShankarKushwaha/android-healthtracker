import { View, Text, Linking, TouchableOpacity } from 'react-native'
import React from 'react'
import Header1 from './Header1'
import { ScrollView } from 'react-native-gesture-handler'
import Footercomp from './Footer';

export default function About() {
    const sendEmail = () => {
        const recipientEmail = 'shivshankarkushwaha0000@gmail.com';
        const subject = 'Regarding Health tracker';
        const body = '';

        const mailtoUri = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;

        Linking.openURL(mailtoUri)
            .then(() => {
                console.log('Email client opened successfully');
            })
            .catch((error) => {
                console.error('Error opening email client', error);
            });
    };

    return (
        <ScrollView>
            <Header1></Header1>
            <View>
                <View className=" w-full pb-5 lg:pb-0 border-0 mx-auto min-h-[25rem] rounded-bl-xl rounded-br-xl">
                    <Text className="w-full h-auto bg-blue-800 flex justify-center items-center  text-lg text-white text-center p-5" >Welcome to Health Tracker</Text>
                    <Text className="m-2 text-justify text-sm p-5">At Health Tracker, we are dedicated to empowering individuals on their journey towards better health and well-being. Our mission is to provide you with the tools, insights, and support you need to take control of your health and make informed decisions.Founded by a team of passionate health enthusiasts, Health Tracker was born out of the desire to bridge the gap between technology and personal well-being. We understand that in today's fast-paced world, it's easy to neglect our health amidst our busy schedules. That's why we've created a comprehensive health tracking platform that seamlessly integrates into your lifestyle.What sets us apart is our commitment to user-centric design and data privacy. We believe that your health data is personal, and you should have full control over it. Our state-of-the-art security measures ensure that your information remains confidential and secure at all times.</Text>
                    <TouchableOpacity onPress={() => { sendEmail() }}>
                        <Text className="underline cursor-pointer text-blue-500 m-2 text-center" target="_blank" >Contact Us</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { Linking.openURL('https://healthtracker-jwpl.onrender.com/') }}>
                        <Text className=" cursor-pointer text-blue-500 m-2 text-center" target="_blank" >Use Web Version</Text>
                    </TouchableOpacity>

                </View>
            </View>
            <Footercomp></Footercomp>
        </ScrollView>
    )
}