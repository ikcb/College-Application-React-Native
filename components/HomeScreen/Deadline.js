import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { windowWidth, COLORS } from "../../constants/Constants"

export default function Deadline({ title, link, assignDate, dueDate, dueTime, workType, index }) {
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={() => Linking.openURL(link)}>
            <View style={{ ...styles.box, backgroundColor: COLORS[index % COLORS.length] }}>
                <View style={styles.time}>
                    <FontAwesome name={"bell-o"} size={30} color={"white"} />
                    <Text style={styles.timeText}>{dueTime}</Text>
                    <Text style={styles.timeText}>{dueDate}</Text>
                </View>
                <View style={{ margin: 10 }}>
                    <Text style={styles.contentText1}>{workType}</Text>
                    <Text style={styles.contentText2}>{title}</Text>
                    <Text style={styles.contentText3}>{`Posted on ${new Date(assignDate).toDateString()}`}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    box: {
        width: windowWidth - 20,
        height: 100,
        elevation: 20,
        marginVertical: 8,
        shadowColor: "white",
        marginLeft: 10,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        overflow: "hidden",
        flexDirection: "row",
        opacity: 0.8
    },
    time: {
        width: 100,
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.15)'
    },
    timeText: {
        fontSize: 14,
        fontFamily: "sans-serif",
        color: "white",
        opacity: 1
    },
    contentText1: {
        fontSize: 18,
        letterSpacing: 0.5,
        fontWeight: "800",
        fontFamily: "sans-serif",
        color: "white"
    },
    contentText2: {
        fontSize: 16,
        letterSpacing: 0.5,
        fontWeight: "800",
        fontFamily: "sans-serif",
        color: "white"
    },
    contentText3: {
        fontSize: 16,
        letterSpacing: 0.5,
        fontWeight: "800",
        fontFamily: "sans-serif",
        color: "white"
    }
})