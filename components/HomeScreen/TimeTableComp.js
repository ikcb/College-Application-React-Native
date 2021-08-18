import React, { useEffect, useState } from 'react'
import { FlatList, View, StyleSheet, Text } from 'react-native'
import TimeTable from './TimeTable'
import axios from 'axios';
import { setBatch, setBatchData } from "../../reduxConfig/actions"
import { ButtonGroup, Icon } from "react-native-elements"

export default function TimeTableComp({ batch, batchData, dispatch }) {
    const batches = ['A1', 'A2', 'A3', 'A4']
    const day = new Date().getDay()

    useEffect(() => {
        const getTimeTable = () => {
            axios.get(`https://backend-clg-app.herokuapp.com/timetable?lb=${batches[batch]}&day=${day}`)
                .then((data) => dispatch(setBatchData(data.data)))
        }
        getTimeTable()
    }, [batch])

    if (!batchData || batchData.length <= 0)
        return <View style={{ flex: 1, justifyContent: "space-evenly" }}>
            <ButtonGroup
                onPress={(e) => dispatch(setBatch(e))}
                selectedIndex={batch}
                buttons={batches}
                buttonStyle={{ margin: 10 }}
                textStyle={{ fontSize: 20, fontWeight: "600" }}
                selectedButtonStyle={{ margin: 10, backgroundColor: 'orange', color: "white" }}
                containerStyle={{ height: 50, width: 300, alignSelf: "center" }}
            />
        </View>

    return (
        <>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={styles.deadlineText1}>
                    Today Classes
                </Text>
                <Icon
                    name='undo'
                    type='font-awesome'
                    color='#f50'
                    containerStyle={{ marginRight: 10 }}
                    onPress={() => dispatch(setBatchData(null))} />
            </View>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={batchData}
                renderItem={({ item, index }) => {
                    return <TimeTable item={item} index={index} />
                }}
                keyExtractor={(item, index) => index.toString()}
            />
        </>
    )
}

const styles = StyleSheet.create({
    deadlineText1: {
        color: "#737373",
        fontSize: 18,
        letterSpacing: 0.5,
        fontWeight: "600",
        fontFamily: "sans-serif",
        paddingLeft: 10,
    },
})