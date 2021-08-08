import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native'
import { windowWidth, windowHeight, COLORS2 } from "../../constants/Constants";


export default function UploadBox({ item, index }) {
    const { Message, Post_Time, Subject_Code, Url } = item
    const time = new Date(Post_Time).toDateString()
    return (
        <View style={[styles.box, { shadowColor: COLORS2[index % COLORS2.length], backgroundColor: "white" }]}>
            <TouchableOpacity style={{ flex: 1, justifyContent: "space-around" }} onPress={() => Linking.openURL(Url)}>
                <Text style={styles.uploadText}>{Subject_Code}</Text>
                <Text style={styles.uploadShortText} numberOfLines={2}>{Message}</Text>
                <Text style={styles.uploadShortText}>{time}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    box: {
        width: windowWidth * 0.4,
        padding: 12,
        height: windowHeight * 0.18,
        marginHorizontal: 10,
        shadowOffset: {
            width: 0,
            height: 20,
        },
        shadowOpacity: 1,
        shadowRadius: 20,
        elevation: 15,
        marginBottom: 20,
        marginTop: 10,
        justifyContent: "center",
        alignItems: "flex-start",
        borderRadius: 20
    },
    uploadText: {
        fontSize: 22,
        fontWeight: "700",
        fontFamily: "sans-serif",
    },
    uploadShortText: {
        fontSize: 15,
        fontWeight: "600",
        fontFamily: "sans-serif",
        color: "grey",
    }
})