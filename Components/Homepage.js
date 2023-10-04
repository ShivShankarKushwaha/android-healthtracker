import { Button, Image, ScrollView, Text, View } from "react-native";
import { Rating, AirbnbRating } from 'react-native-ratings';
// import Header from "./Header";
import Footercomp from "./Footer";
import Header1 from "./Header1";
import { useNavigation } from "@react-navigation/native";

export default function Homepage({loggedin}) {
    const navigate =useNavigation();
    return (<ScrollView>
        <Header1></Header1>
        <View className="m-4">
            <Text className="text-center text-lg text-black font-semibold">Take control of your health With</Text>
            <Text className="text-center text-lg text-black font-semibold"> Health Tracker</Text>
        </View>
        <Text className="p-5 text-justify">
            Stay on top of your health with our comprehensive health tracking platform. Store your symptoms, schedule appointments, and consult with doctors in one place.
        </Text>
        <Text className="p-5 pb-1 font-bold text-black text-justify">
            "Health Tracker has made managing my health so much easier. I can track my symptoms, schedule appointments, and even consult with doctors without leaving my home."
        </Text>
        <Text className="text-center">Shiv Shankar Kushwaha</Text>
        <View className="flex flex-row justify-center items-center my-4">
            <View className="w-[30%] bg-none">
                {/* <Text className="text-center">*****</Text> */}
                <Rating
                    type='star'
                    ratingCount={5}
                    startingValue={4.5}
                    imageSize={15}
                    onFinishRating={4}
                    readonly
                />
            </View>
            <View className="w-[30%]">
                <Text className="text-center">Easy Symptom Tracking</Text>
            </View>
            <View className="w-[30%] text-center">
                <Text className="text-center">Convenient Doctor cunsultations</Text>
            </View>
        </View>
        <Image className="w-[90%] h-60 ml-auto rounded-l-xl" source={{uri:'https://images.unsplash.com/photo-1510017803434-a899398421b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMzczODV8MHwxfHNlYXJjaHwxfHxoZWFsdGglMjB0cmFja2VyfGVufDB8MHx8fDE2OTIyOTEwNjR8MA&ixlib=rb-4.0.3&q=80&w=1080'}} alt="Image"></Image>
        <View className="my-5">
            <Text className="font-bold text-center text-black">Track and manage your symptopms</Text>    
            <Text className="p-5 pt-1 text-justify">HealthTracker allows you to easily track and manage your symptoms. Keep a record of your health history and identify patterns or triggers.</Text>
        </View>    
        <Image className="w-[90%] h-60 mr-auto rounded-r-xl" source={{uri:'https://healthtracker-jwpl.onrender.com/h1.jpeg'}} alt="Image"></Image>
        <View className="my-5">
            <Text className="font-bold text-center text-black">Schedule and organize appointments</Text>    
            <Text className="p-5 pt-1 text-justify">With HealthTracker, you can schedule and organize your appointments with ease. Never miss an important medical visit again.</Text>
        </View>    
        <Image className="w-[90%] h-60 ml-auto rounded-l-xl" source={{uri:'https://healthtracker-jwpl.onrender.com/h2.jpeg'}} alt="image"></Image>
        <View className="mt-5">
            <Text className="font-bold text-center text-black">Connect with doctors for consultations</Text>    
            <Text className=" px-5 text-justify">HealthTracker provides a convenient platform to connect with doctors for consultations. Chat with healthcare professionals and get the guidance you need.</Text>
        </View>    
        <Text className="m-5 text-center text-black">Join Our Community</Text>
        <View className="flex justify-center items-center">
            <Button title="Get Started" onPress={()=>{loggedin?(navigate.navigate('Dashboard')):(navigate.navigate('Login'))}}></Button>
        </View>
        <Footercomp></Footercomp>
    </ScrollView>)
}