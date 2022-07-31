import React, { useState } from 'react';
import { View, StyleSheet, Text, Vibration, TextInput, Dimensions } from 'react-native';
import { Button } from 'react-native-paper';
import { Countdown } from '../components/CountDown';
import { RoundedButton } from '../components/RoundedButton';
import { fontSizes, spacing } from '../utils/Sizes';
import { Colors } from '../utils/Colors';
import { Timing } from './Timing';
import KeepAwake, { useKeepAwake } from 'expo-keep-awake';
import ProgressBar from 'react-bootstrap/ProgressBar';
import * as Progress from "react-native-progress";

const ONE_SECOND_IN_MS = 1000
const PATTERN = [
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
];


export const Timer = ({ focusSubject, clearSubject, onTimerEnd, totalTimeSpent, setTotalTimeSpent, setModalVisible }) => {
  useKeepAwake();
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [minutes, setMinutes] = useState(0.1);
  const [number, onChangeNumber] = useState(null);
  const percentage = parseFloat(progress*100).toFixed(2);

  const onEnd = (reset) => {
    setModalVisible((parseFloat(totalTimeSpent)+parseFloat(minutes))>60);
    setTotalTimeSpent(parseFloat(totalTimeSpent)+parseFloat(minutes));
    setIsStarted(false);
    setProgress(0);
    reset();
    onTimerEnd(focusSubject);
    Vibration.vibrate(PATTERN)
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={setProgress}
          onEnd={onEnd}
        />
      </View>
      <View style={{ paddingTop: spacing.xxl }}>
        <Text style={styles.title}>Focusing on</Text>
        <Text style={styles.task} numberOfLines={2}>{focusSubject}</Text>
      </View>
      <View style={styles.customTiming}>
        <Progress.Bar progress={progress} width={Dimensions.get('window').width - 20} height={20} animated/>
       <Text style={styles.percentage}>{percentage}%</Text> 
      </View>
      <View style={styles.timingWrapper}>
        <Timing onChangeTime={setMinutes}/>
      </View>
      <View style={styles.customTime}>
        <TextInput
          style={styles.textInput}
          onChangeText={onChangeNumber}
          value={number}
          keyboardType="numeric"
          placeholder="Enter a custom amount of minutes"
        />
        <RoundedButton style={styles.ButtonConfirm} size={75} title="Confirm" onPress={()=> setMinutes(number)}/>
      </View>
      <View style={styles.buttonWrapper}>
        {!isStarted && (
          <RoundedButton title="start" onPress={() => setIsStarted(true)} />
        )}
        {isStarted && (
          <RoundedButton title="pause" onPress={() => setIsStarted(false)} />
        )}
      </View>
      <View style={styles.clearSubjectWrapper}>
        <RoundedButton size={60} title="Cancel" onPress={clearSubject}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countdown: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 0.3,
    flewDirection: 'row',
    padding: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: Colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  task: {
    color: Colors.white,
    textAlign: 'center',
    flexDirection: 'row',
    padding: 5,
  },
  timingWrapper:{
    flex: 0.05,
    flexDirection: 'row',
    padding: spacing.xl,
  },
  clearSubjectWrapper:{
    flexDirection:'row',
    justifyContent:'center',
  },
  customTiming:{
      marginTop:10,
      color: Colors.white,
      alignItems: "center",
      flexDirection: 'row',
      justifyContent: 'center',
  },
  percentage:{
    color: Colors.white,
    alignItems: "center",
    flexDirection: 'row',
    position:'absolute'
  },
  textInput:{
    textAlign: 'center',
    backgroundColor: Colors.white,
    height: fontSizes.xxl,
    marginTop: 15,
    marginBottom: 10,
    marginRight: 20,
    padding: 5,
  },
  customTime:{
    flex: 0.1,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    padding: 10,
    marginTop: 30,
    marginBottom: 30,
  },
});
