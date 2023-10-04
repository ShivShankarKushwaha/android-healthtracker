// src/components/ExerciseTracker.js
import React, { useEffect, useState } from "react";
import CustomProgress from './CustomProgress';
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Header1 from "./Header1";
import Spinner from "./Spinner";
import axios from "../axios";


function Goals() {
    const [runningMinutes, setRunningMinutes] = useState(0);
    const [exercizeminutes, setexercizeminutes] = useState(0);
    const [waterIntake, setWaterIntake] = useState(0);
    const [showreset, setshowreset] = useState(false);
    const [updatetarget, setupdatetarget] = useState(true);
    const [target, settarget] = useState({ exercize: 30, running: 30, water: 4000 });
    const [usertarget, setusertarget] = useState({ exercize: 0, running: 0, water: 0 });
    const [loading, setloading] = useState(false);
    async function handletargetupdate() {
        setloading(true);
        axios.post("/settarget", usertarget)
            .then(result => {
                setupdatetarget(!updatetarget);
                setshowreset(!showreset);
                Alert.alert('Target Updated Successfully');
                setloading(false);
            })
            .catch(err => {
                Alert.alert('Target not updated');
                setloading(false);
            })
    }
    async function gettarget() {
        setloading(true);
        axios.get('/gettarget')
            .then(result => {
                settarget(result.data);
                setusertarget(result.data);
                setloading(false);
            })
            .catch(err => {
                console.log('target not found');
                setloading(false)
            })
    }
    async function updatetoday() {
        const data = { running: runningMinutes, exercize: exercizeminutes, water: waterIntake };
        setloading(true);
        axios.post("/updatetoday", data)
            .then(result => {
                Alert.alert('Todays Goals updated')
                setloading(false);
            })
            .catch(err => {
                Alert.alert('Not updated');
                setloading(false);
            })
        // let data = await fetch("https://healthtracker-jwpl.onrender.com/updatetoday", { method: 'POST', credentials: 'include', body: new URLSearchParams({ running: runningMinutes, exercize: exercizeminutes, water: waterIntake }) });
        // if (data.status != 200) {
        //     // return alertfunction('Not updated', 'red');
        //    
        // }
    }
    async function gettoday() {
        axios.post('/gettoday',{})
        .then(result=>{
            setWaterIntake(result.data.water);
            setRunningMinutes(result.data.running);
            setexercizeminutes(result.data.exercize);
        });
    }
    useEffect(() => {
        gettarget();
        gettoday();
    }, [updatetarget]);
    return (
        <ScrollView className="w-screen">
            <Header1></Header1>
            {loading && <Spinner></Spinner>}
            <View className=" py-5 flex flex-col items-center justify-center bg-gray-100 w-screen">
                <Text className="text-2xl font-semibold mb-4">Daily Activity Tracker</Text>
                <TouchableOpacity onPress={() => setshowreset(!showreset)}>
                    <Text className="p-2 text-xl bg-green-500 text-white rounded shadow-xl shadow-green-700" >Reset Target</Text>
                </TouchableOpacity>
                {showreset && <View className="w-full flex flex-row justify-around items-center mt-5">
                    <Text>Exercize</Text>
                    <Text>Running</Text>
                    <Text>Water Intake</Text>
                </View>}
                {showreset ? <View className="w-full my-5 mt-1 flex flex-row justify-around items-center flex-wrap">
                    <View className="border-0 w-28   drop-shadow-lg shadow-lg shadow-gray-300 flex flex-col justify-center items-center">
                        <Image className="w-20 h-24" source={require('../public/exercize.png')} alt="" />
                        <TextInput className="p-1 w-full border-slate-400 border-2 outline-gray-300"  inputMode="numeric" placeholder="Exercize minutes" value={String(usertarget.exercize)} onChangeText={(text) => { setusertarget({ ...usertarget, exercize: text }) }} />
                    </View>
                    <View className="border-0 w-28  drop-shadow-lg shadow-lg shadow-gray-300 flex flex-col justify-center items-center">
                        <Image className="w-20 h-24" source={require('../public/running.png')} alt="" />
                        <TextInput className="p-1 w-full outline-gray-300 border-slate-400 border-2" inputMode="numeric" placeholder="Running/ walking minutes" value={String(usertarget.running)} onChangeText={(text) => { setusertarget({ ...usertarget, running: text }) }} />
                    </View>
                    <View className="border-0 w-28  drop-shadow-lg shadow-lg shadow-gray-300 flex flex-col justify-center items-center">
                        <Image className="w-40 h-24" source={require('../public/drinkwater.jpeg')} alt="" />
                        <TextInput className="p-1 w-full border-slate-400 border-2 outline-gray-300"  inputMode="numeric" placeholder="water drink (in ml)" value={String(usertarget.water)} onChangeText={(text) => { setusertarget({ ...usertarget, water: text }) }} />
                    </View>
                    <TouchableOpacity onPress={() => { handletargetupdate() }} className="border-0 w-32 h-32 sm:w-40 drop-shadow-lg shadow-lg shadow-gray-300 flex flex-col justify-center items-center">
                        <Text className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 active:scale-95 duration-300" >Update</Text>
                    </TouchableOpacity>
                </View> : null}
                <View className="flex flex-row my-4 justify-between items-center space-x-3">
                    <View className="w-[30%]">
                        <Text className="block text-gray-700 text-xs mb-2 text-center" >
                            Today Exercize (minutes):
                        </Text>
                        <TextInput inputMode="numeric" id="goal" name="goal" className="w-full px-3 py-2 border rounded-lg" value={String(exercizeminutes)} onChangeText={(text) => { setexercizeminutes(text) }} />
                        <View className="m-4">
                            <CustomProgress target={target.exercize} percentage={exercizeminutes} />
                        </View>
                    </View>
                    <View className="w-[30%]">
                        <Text className="block text-gray-700 text-xs font-bold mb-2 text-center" >
                            Today Running (minutes):
                        </Text>
                        <TextInput  inputMode="numeric" id="running" name="running" className="w-full px-3 py-2 border rounded-lg" value={String(runningMinutes)} onChangeText={(text) => setRunningMinutes(text)} />
                        <View className="m-4">
                            <CustomProgress target={target.running} percentage={runningMinutes} />
                        </View>
                    </View>
                    <View className="w-[30%]">
                        <Text className="block text-gray-700 text-xs font-bold mb-2 text-center" >
                            Today Water Intake (ml):
                        </Text>
                        <TextInput  id="water" inputMode="numeric" name="water" className="w-full px-3 py-2 lg:mt-0 border rounded-lg" value={String(waterIntake)} onChangeText={(text) => { setWaterIntake(text); }} />
                        <View className="m-4">
                            <CustomProgress target={target.water} percentage={waterIntake} />
                        </View>
                    </View>
                </View>
                <TouchableOpacity onPress={() => { updatetoday() }}>
                    <Text className="bg-blue-500 mb-5 text-white px-4 py-2 rounded-lg hover:bg-blue-600 active:scale-95 duration-300">Update Progress</Text>
                </TouchableOpacity>
                {/* <Footercomp></Footercomp> */}
            </View>
        </ScrollView>

    );
}

export default Goals;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 16,
    },
    calendar: {
        marginBottom: 16,
    },
    progressContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '90%',
    },
    progressCircle: {
        alignItems: 'center',
    },
    suggestionContainer: {
        marginTop: 32,
        padding: 16,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
    },
    suggestionText: {
        fontSize: 16,
    },
});
