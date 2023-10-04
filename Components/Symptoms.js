import React, { useEffect, useState } from 'react'
import { Button, ScrollView, Text, TextInput, View } from 'react-native';
// import DatePicker from 'react-native-datepicker';
import DatePicker from '@react-native-community/datetimepicker';
// import { format } from 'date-fns';
import Header1 from './Header1';
import Spinner from './Spinner';
import axios from '../axios';



function SymptomsList() {
    const [list, setlist] = useState({ symptom: '', note: '', date: new Date() });
    const [editingdata, seteditingdata] = useState({ ...list, cured: false, id: '' });
    const [buttontext, setbuttontext] = useState('Add');
    const [error, seterror] = useState('');
    const [refreshlist, setrefreshlist] = useState(false);
    const [allnotes, setallnote] = useState([]);
    const [loading, setloading] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    async function addnote() {
        if (!list.symptom) {
            return seterror('*symptoms are necessary');
        }
        if (buttontext !== 'Add') {
            updatedata(list);
            return;
        }
        setbuttontext('Processing..');
        console.log('list data sent', list);
        // axios.post('/addnote', { ...list })
        axios.post('/addnote', list )
            .then(result => { setrefreshlist(!refreshlist); setlist({ symptom: '', date: '', note: '' }); setbuttontext('Add') })
            .catch(err => { seterror('Note not added'); setbuttontext('Add') });
    }
    useEffect(() => {
        async function getnotes() {
            setloading(true);
            axios.get("/getnotes")
                .then(result => { setallnote(result.data) ;console.log('all notes are ',result.data);setloading(false)})
                .catch(err => { console.log('No data found');setloading(false) });
        }
        getnotes();
    }, [refreshlist]);

    async function onDelete(id) {
        // axios.post('/deletenote', { id: id })
        console.log('deleting id',id);
        setloading(true);
        axios.post('/deletenote', {id:id} )
            .then(result => { setrefreshlist(!refreshlist); setbuttontext('Add');console.log(result.data); setloading(false) })
            .catch(err => { setrefreshlist(!refreshlist);console.log(err); setloading(false) });
    }
    async function onEdit(obj) {
        if (obj.date) {
            obj.date = new Date(obj.date);
            obj.date = (obj.date).toISOString().split('T')[0];
            console.log('date is setting:', obj.date);
        }
        setlist(obj);
        seteditingdata({ ...list, cured: obj.cured, id: obj._id });
        console.log('inside onedit', editingdata);
        setbuttontext("Update");
    }
    async function updatedata(data) {
        console.log('sending edited data:', data);
        data.id = data._id;
        if (!data.date) {
            data.date = "";
        }

        // axios.post('/updatedata', { ...data })
        setloading(true);
        axios.post('/updatedata',data )
            .then(result => { setrefreshlist(!refreshlist); setlist({ date: '', note: '', symptom: '' });setloading(false);setbuttontext('Add');console.log(result.data); })
            .catch(err => { setrefreshlist(!refreshlist);setloading(false);console.log(err); });
    }
    return (
        <ScrollView>
            <Header1></Header1>
            {loading && <Spinner></Spinner>}
            <View className='w-full mx-auto shadow-xl drop-shadow-lg shadow-slate-100 border-0 my-10 p-5 flex flex-col justify-center items-center'>
                <Text className='text-center text-xl text-black'>Add Your Symptoms</Text>
                <TextInput className='border-2 border-slate-300 p-2 my-5 text-base w-full' inputMode='text' placeholder='Enter Symptoms' value={list.symptom} onChangeText={(text) => { setlist({ ...list, symptom: text }); seterror('') }} />
                <TextInput onChangeText={(text) => { setlist({ ...list, note: text }) }} value={list.note} inputMode='text' className='w-full border-2 border-slate-300 p-2' multiline={true} numberOfLines={5} placeholder='Explain symptoms (if):'></TextInput>
                <View className='flex flex-row justify-evenly items-center border-0 border-slate-100 p-5'>
                    <Text className="w-1/2">Starting date of your symptoms</Text>
                    <Button
                        title="Select Date"
                        onPress={() => {
                            setShowDatePicker(true);
                        }}
                    />

                    {showDatePicker && <DatePicker
                        value={list.date}
                        mode="date"
                        display="default"
                        onChange={(event, selectedDate) => {
                            if (selectedDate !== undefined) {
                                setlist({ ...list, date: selectedDate });
                                setShowDatePicker(false);
                            }
                        }}

                    />}

                </View>
                <Text className='p-4 text-red-300'>{error}</Text>
                <Button type='submit' title={buttontext} className="bg-gradient-to-tr from-blue-500 to-blue-900 hover:scale-105 transform transition duration-200 ease-in-out shadow-lg rounded-lg text-white font-bold py-3 px-6" onPress={() => { addnote() }}></Button>
            </View>
            {allnotes.length === 0 ? <Text id='datafound' className='font-bold text-xl text-gray-600 m-5'> No Symptom Found</Text> : null}
            <View className='flex  flex-wrap w-full justify-evenly items-center'>
                {allnotes.map((data, index) => {
                    let editdata = data;
                    let extractdate = new Date(data.date);
                    extractdate = extractdate.toLocaleDateString();
                    return (
                        <View key={index} className=" flex flex-col w-full items-center rounded overflow-hidden shadow-lg">
                            <View className="px-6 py-4">
                                <Text className="font-bold text-xl mb-2">{data.symptom}</Text>
                                <Text className="text-gray-700 text-base">Descrition: {data.note}</Text>
                                {data.date ? <Text className="text-gray-700 text-base">Starting Date: {extractdate}</Text> : null}
                                <Text className="text-gray-700 text-base">Cured:{data.cured ? "Yes" : "No"}</Text>
                            </View>
                            <View className="py-4 flex flex-row">
                                <View className="mx-4">
                                    <Button
                                    color={'green'}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                                        onPress={() => onEdit(editdata)} title='Edit'
                                    >
                                    </Button>
                                </View>
                                <Button
                                color='red'
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                    onPress={() => onDelete(data._id)} title='Delete'
                                >
                                </Button>
                            </View>
                        </View>
                    )
                })}
            </View>

        </ScrollView>
    )
}

export default SymptomsList;