import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Colors } from "react-native-paper";
import { fontSizes, spacing } from "../utils/Sizes";
import { RoundedButton } from "../components/RoundedButton";

export const FocusHistory = ({history, setHistory}) => {
    if(!history || !history.length) return <Text style= {styles.title}>We haven't focused on anything yet !</Text>;

    const renderItem = ({item}) => <Text style={styles.item}>- {item}</Text>
    return(
        <>
            <View style={styles.container}>
                <Text style={styles.title}>Things we've focused on :</Text>
                <FlatList 
                    data={history}
                    renderItem={renderItem}
                />
            </View>
            <View style={styles.button}>
                <RoundedButton size={100} title="Reset" onPress={()=> {setHistory([])}}/>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container:{
        padding: spacing.md,
        flex: 1,
    },
    title : {
        color: Colors.white,
        fontSize: fontSizes.md,
        textAlign: "center",
        paddingTop: fontSizes.md,
        fontWeight: "bold",
    },
    item: {
        fontSize: fontSizes.md,
        color: Colors.white,
        paddingTop: spacing.sm
    },
    button:{
        flexDirection: "row",
        justifyContent: "center",
        paddingBottom:10,
    }
})