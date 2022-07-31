import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,Alert, Modal, Pressable,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import Constants from 'expo-constants';
import { Colors } from './src/utils/Colors';
import { Focus } from './src/features/Focus';
import { Timer } from './src/features/Timer';
import { FocusHistory } from './src/features/FocusHistory';
import { RoundedButton } from './src/components/RoundedButton';
import { fontSizes } from './src/utils/Sizes';

export default function App() {
  const [totalTimeSpent, setTotalTimeSpent] = useState(0)
  const [currentSubject, setCurrentSubject] = useState(null);
  const [history, setHistory] = useState([]);
  const [modalVisible, setModalVisible] = useState(totalTimeSpent > 60);
  return (
    <SafeAreaView style={styles.container}>
      {(totalTimeSpent > 60) ? (
        <>
        
        <View style={styles.centeredView}>
             <Modal
               animationType="slide"
               transparent={true}
               visible={modalVisible}
               onRequestClose={() => {
                 Alert.alert("Nice job, now continue to focus");
                 setModalVisible(!modalVisible);
                 setTotalTimeSpent(0);
               }}
             >
               <View style={styles.centeredView}>
                 <View style={styles.modalView}>
                   <Text style={styles.modalText}>You have been focusing for over an hour, don't forget to drink some water !</Text>
                   <Pressable
                     style={[styles.button, styles.buttonClose]}
                     onPress={() => {
                      setModalVisible(!modalVisible);
                      setTotalTimeSpent(0);
                    }}
                   >
                     <Text style={styles.textStyle}>Ok, will do !</Text>
                   </Pressable>
                 </View>
               </View>
             </Modal>
           </View>
        </>  
      ):(
        <>
        {!currentSubject ? (
          <>
            <Focus addSubject={setCurrentSubject} />
            <FocusHistory history={history} setHistory={setHistory}/>
          </>
          ) : (
          <Timer
            focusSubject={currentSubject}
            onTimerEnd={(subject) => {
              setHistory([...history,subject])
            }}
            clearSubject={() => setCurrentSubject(null) } 
            totalTimeSpent={totalTimeSpent}
            setTotalTimeSpent={setTotalTimeSpent} 
            setModalVisible={setModalVisible}/>
        )}
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:40,
    //padding: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: Colors.darkBlue,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
});