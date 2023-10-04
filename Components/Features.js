import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Svg from 'react-native-svg'
import Footercomp from "./Footer";
import Header1 from "./Header1";

export default function Features() {
    const [activeFeature, setActiveFeature] = useState(null);

    const toggleFeature = (index) => {
        if (activeFeature === index) {
            setActiveFeature(null);
        } else {
            setActiveFeature(index);
        }
    };
    const featuresData = [
        {
            title: "Health Data Tracking",
            content: "Track and record various health metrics, such as weight, height, body mass index (BMI), blood pressure, heart rate, and sleep patterns. Allow users to manually input data or sync with wearable devices and apps. Visualize data using charts and graphs to show progress over time.",
        },
        {
            title: "User Registration and Profiles",
            content: "User registration and login functionality User profile creation to store personal information, health goals, and preferences.",
        },
        {
            title: "Goal Setting and Monitoring",
            content: "Set and customize health goals, such as weight loss, fitness milestones, or daily step counts.Provide tracking tools to monitor progress toward these goals.",
        },
        {
            title: "Personalized Treatment Recommendations",
            content: "Customized treatment plans and recommendations based on the type and stage of cancer detected.",
        },
        {
            title: "Data Privacy and Security",
            content: "Robust data security measures to protect patients' sensitive medical information and maintain compliance with healthcare data regulations.",
        },
        {
            title: "Online Consultations",
            content: "Virtual consultations with healthcare professionals for discussing test results, treatment options, and next steps.",
        },
        {
            title: "Patient Education",
            content: "Educational resources and information about cancer types, treatments, and lifestyle choices to empower patients with knowledge.",
        },
        {
            title: "Data Visualization",
            content: "Interactive charts and visualizations displaying cancer detection results, trends, and progress over time.",
        },
        {
            title: "Integration with Healthcare Systems",
            content: "Seamless integration with electronic health record (EHR) systems and healthcare providers for streamlined patient care.",
        },
        {
            title: "Mobile Accessibility",
            content: "Mobile-friendly design for easy access to cancer detection results and information on smartphones and tablets.",
        },
        {
            title: "Support and Community",
            content: "Online support groups, forums, and community features for patients and caregivers to connect, share experiences, and find emotional support.",
        },
        {
            title: "Research and Development",
            content: "Dedicated research and development efforts to continually improve the accuracy and capabilities of cancer cell detection algorithms.",
        },
    ];
    return (<ScrollView >
        <Header1></Header1>
        <View>
            <View className=" w-full border-0 mx-auto my-5 rounded-bl-xl rounded-br-xl">
                <Text className="w-full bg-blue-800 flex justify-center items-center text-lg text-white text-center p-2">Features</Text>
                <View className="m-2s text-start text-lg p-5">
                    {featuresData.map((feature, index) => (
                        <View key={index} className=" font-sans shadow-sm w-full">
                            <TouchableOpacity className="flex items-start justify-between cursor-pointer hover:bg-slate-100" onPress={() => toggleFeature(index)}>
                                <Text className="text-sm font-medium p-1 focus-visible:font-bold text-justify border-0">{feature.title}</Text>
                            </TouchableOpacity>
                            {activeFeature === index && <Text className="p-0 px-1 text-sm text-gray-400">{feature.content}</Text>}
                        </View>
                    ))}
                </View>
            </View>
        </View>
        <Footercomp></Footercomp>
    </ScrollView>)
}
