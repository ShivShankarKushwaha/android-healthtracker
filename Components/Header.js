import { Image, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useState } from "react";
export default function Header() {
    const navigation =useNavigation();
    const [menuwidth, setmenuwidth] = useState('w-0');
    function hamburgerpressed() {
        if (menuwidth === 'w-screen')
            setmenuwidth('w-0');
        else {
            setmenuwidth('w-screen');
        }
    }
    return (<View className="w-full h-fit flex flex-row justify-between items-center px-5 m-2 z-10">
        <TouchableOpacity onPress={() => { hamburgerpressed() }}>
            <View className="w-10 h-8 flex flex-col gap-1 z-10 my-auto">
                <Text className="w-5 h-1 bg-lime-500"></Text>
                <Text className="w-5 h-1 bg-lime-500"></Text>
                <Text className="w-5 h-1 bg-lime-500"></Text>
            </View>
        </TouchableOpacity>
        <Text className="text-xl font-bold -z-20">Health Tracker</Text>
        <Image className="w-14 h-14 rounded-full -z-30" source={{ uri: 'https://source.unsplash.com/random/?health' }}></Image>
        <View style={{transition:'3s',transitionDuration:'3s',transitionProperty: "width"}} className={" absolute h-screen -top-2 -left-2 -z-10 border-0 bg-slate-900 text-white flex flex-col py-20 items-center " + menuwidth}>
            <TouchableOpacity onPress={()=>{navigation.navigate('Homepage');hamburgerpressed()}}>
                <Text className="my-5 text-white">Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{navigation.navigate('Features');hamburgerpressed()}}>
                <Text className="my-5 text-white">Features</Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={()=>{navigation.navigate('AboutUs');hamburgerpressed()}}>
                <Text className="my-5 text-white">About Us</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text className="my-5 text-white bg-blue-700 p-2 rounded active:scale-95">Login</Text>
            </TouchableOpacity>
        </View>
    </View>)
}