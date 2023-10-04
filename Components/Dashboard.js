import React, { useEffect, useState } from 'react';
import { View, Text, Alert, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Header1 from './Header1';
import CustomProgress from './CustomProgress';
import axios from '../axios'
import Footercomp from './Footer';
import Spinner from './Spinner';

export default function Dashboard() {
  const [loading, setloading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [runningMinutes, setRunningMinutes] = useState(0);
  const [exercizeminutes, setexercizeminutes] = useState(0);
  const [target, settarget] = useState({ exercize: 30, running: 30, water: 4000 });
  const [waterIntake, setWaterIntake] = useState(0);

  // useEffect(() => {
  //   console.log('selected date is ', selectedDate);
  //   // getToday(selectedDate.toString().split('T')[0]);
  //   getToday(selectedDate);
  //   getTarget();
  // }, [selectedDate]);
  useEffect(()=>
  {
    getToday();
    getTarget();
  },[])
  async function getToday(date) {
    setloading(true);
    if(date)
    {
      axios.post('/gettoday', {date:date})
        // axios.post('/gettoday',{date:date})
        .then(result => { setWaterIntake(result.data.water); setRunningMinutes(result.data.running); setexercizeminutes(result.data.exercize); setloading(false);console.log('date '+date+' data',result.data); })
        .catch(err => { console.log('Failed to get todays data', err); setloading(false) })
    }
    else
    {
      axios.post('/gettoday', {})
        // axios.post('/gettoday',{date:date})
        .then(result => { setWaterIntake(result.data.water); setRunningMinutes(result.data.running); setexercizeminutes(result.data.exercize); setloading(false);console.log('todays data',result.data); })
        .catch(err => { console.log('Failed to get todays data', err); setloading(false) })
    }
  }

  async function getTarget() {

    axios.get('/gettarget')
      .then(result => { settarget(result.data); console.log('target is', target); })
      .catch(err => {
        console.log('Failed to fetch target');
      })
  }

  const handleDateClick = (date) => {
    // setSelectedDate(date);
    console.log('selected date',date);
    getToday(date);
  };

  return (
    <ScrollView style={styles.container}>
      <Header1></Header1>
      {loading && <Spinner></Spinner>}
      <Text style={styles.title} className="text-center">Track Your Daily Activity</Text>
      <Calendar
        current={selectedDate.toString()}
        onDayPress={(day) => handleDateClick(day.dateString)}
        style={styles.calendar}
      />

      <View style={styles.progressContainer}>
        <Text>Running</Text>
        <Text>Exercize</Text>
        <Text>Water Intake</Text>
      </View>

      <View style={styles.progressContainer}>
        <CustomProgress target={target.running} percentage={runningMinutes} />
        <CustomProgress target={target.exercize} percentage={exercizeminutes} />
        <CustomProgress target={target.water} percentage={waterIntake} />
      </View>

      <View style={styles.suggestionContainer}>
        <Text style={styles.suggestionText}>All the prescription and suggested exercise will show here.</Text>
      </View>
      <Footercomp></Footercomp>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',

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
