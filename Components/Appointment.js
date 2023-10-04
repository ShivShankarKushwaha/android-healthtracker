import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, Alert } from 'react-native';
import Header1 from './Header1';
import DatePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import axios from '../axios';
import Spinner from './Spinner';
import Footercomp from './Footer';

function GetAppointment() {
    const [rappointment, setrappointment] = useState({ date: new Date(), time: 'morning', message: '' });
    const [appointmentarr, setappointmentarr] = useState([]);
    const [updatelist, setupdatelist] = useState(true);
    const [loading, setloading] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);

    async function requestappointment() {
        const { date, time, message } = rappointment;
        if (!date || !time) {
            Alert.alert('Date and time required')
        } else {
            let checkdate = new Date(date);
            let currentdate = new Date();
            console.log('today', currentdate, 'appointment', checkdate);
            let monthsDifference =
                (checkdate.getFullYear() - currentdate.getFullYear()) * 12 +
                (checkdate.getMonth() - currentdate.getMonth());
            if (monthsDifference > 3) {
                Alert.alert('Set upcoming date');
            }
            setloading(true);
            axios.post('/requestappointment',rappointment)
            .then(result=>{setupdatelist(!updatelist);Alert.alert('Appointment requested successfully');setloading(false);setrappointment({date:new Date,message:'',time:'morning'})})
            .catch(err=>{Alert.alert('Appointment not requested');setloading(false)})
            console.log('Requested Appointment:', { date, time, message });
        }
    }

    async function appointmentlist() {
        setloading(true);
        axios.get("/appointmentlist")
        .then(result=>{
            console.log('recieved data is',result.data);
            setappointmentarr(result.data);
            setloading(false)}
        )
        .catch(err=>{console.log(err);setloading(false)});
    }

    useEffect(() => {
        appointmentlist();
    }, [updatelist]);

    return (
        <ScrollView className="flex-1 bg-gray-100 p-5 pt-0">
            <Header1></Header1>
            {loading && <Spinner></Spinner>}
            <View className="bg-white p-8 rounded-lg shadow-md w-full md:w-1/2">
                <Text className="text-2xl font-semibold mb-4">Get an Appointment</Text>
                <View>
                    <View className="mb-4">
                        <Text className="block text-gray-700 text-sm font-bold mb-2">
                            Select Date:
                        </Text>
                        <Button
                            title="Select Date"
                            onPress={() => {
                                setShowDatePicker(true);
                            }}
                        />

                        {showDatePicker && <DatePicker
                            className="w-full px-3 py-2 border rounded-lg"
                            value={rappointment.date}
                            mode="date"
                            display="default"
                            onChange={(event, selectedDate) => {
                                if (selectedDate !== undefined) {
                                    setrappointment({ ...rappointment, date: selectedDate });
                                    setShowDatePicker(false);
                                }
                            }}

                        />}
                    </View>
                    <View className="mb-4">
                        <Text className="block text-gray-700 text-sm font-bold mb-2">
                            Select Time:
                        </Text>
                        <Picker
                            selectedValue={rappointment.time}
                            onValueChange={(itemValue, itemIndex) =>{setrappointment({...rappointment,time:itemValue})}}
                        >
                            <Picker.Item label="Morning" value="morning" />
                            <Picker.Item label="Afternoon" value="afternoon" />
                            <Picker.Item label="Evening" value="evening" />
                        </Picker>
                    </View>
                    <View className="mb-4">
                        <Text className="block text-gray-700 text-sm font-bold mb-2">
                            Message (Optional):
                        </Text>
                        <TextInput
                            id="message"
                            name="message"
                            multiline={true}
                            numberOfLines={4}
                            className="w-full px-3 py-2 border rounded-lg"
                            value={rappointment.message}
                            onChangeText={(text) =>
                                setrappointment({ ...rappointment, message: text })
                            }
                        ></TextInput>
                    </View>
                    <View className="text-center">
                        <Button
                        onPress={requestappointment}
                            type="submit"
                            title='Request Appointment'
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        >
                            
                        </Button>
                    </View>
                </View>
            </View>

            <View horizontal className="mt-5">
                {appointmentarr.map((item, index) => {
                    console.log('item',item);
                    let extractdate = new Date(item.date);
                    console.log('extract date',extractdate.toUTCString());
                    item.date = extractdate.toUTCString();
                    console.log('item.date',item.date);
                    return (
                        <View key={index} className=" w-full border-2 border-gray-200 my-1 flex flex-col justify-center p-2 drop-shadow-lg min-h-[10rem] bg-gradient-to-bl from-fuchsia-200 to-red-300 text-violet-600 text-left from-30% to-70% ">
                            <Text><Text className='text-blue-500'>Date requested:</Text>  {item.date}</Text>
                            <Text> <Text className='text-blue-500'>Time:</Text> {item.time}</Text>
                            <Text> <Text className='text-blue-500'>message:</Text> {item.message ? item.message : "<<no message>>"} </Text>
                            <Text><Text className='text-blue-500'>Scheduled:</Text>{item.status ? "Yes" : "No"}</Text>
                        </View>
                    )
                })}
            </View>
            <Footercomp></Footercomp>
        </ScrollView>
    );
}

export default GetAppointment;
