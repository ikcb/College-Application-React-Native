import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native'
import { windowWidth, COLORS } from "../constants/Constants"

export default function HackathonBox({ name, site, desc, reg_start, host, reg_end, index }) {
    let start = new Date(reg_start)
    start = start.toString()
    let end = new Date(reg_end)
    end = end.toString()

    return (
        <View style={{ ...styles.contestBox, backgroundColor: COLORS[index % COLORS.length] }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ ...styles.contestTextLink, color: COLORS[index % COLORS.length] }}> {host}</Text>
                <TouchableOpacity onPress={() => Linking.openURL(site)}>
                    <Text style={styles.contestTextVisit}> Link </Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.contestTextName}>Event Name : {name}</Text>
            <Text style={styles.contestTextWebsite}>Start Date : {start.slice(0, 21)}</Text>
            <Text style={styles.contestTextWebsite}>End Date : {end.slice(0, 21)}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    contestBox: {
        borderRadius: 10,
        elevation: 12,
        width: windowWidth - 20,
        height: windowWidth / 2.3,
        marginHorizontal: 0,
        marginVertical: 5,
        padding: 15,
        overflow: "hidden",
        justifyContent: 'space-evenly',
    },
    contestTextName: {
        fontSize: 20,
        fontWeight: "bold",
        fontFamily: "sans-serif",
        letterSpacing: 0.1,
        color: "white",
    },
    contestTextWebsite: {
        fontSize: 16,
        fontWeight: "bold",
        fontFamily: "sans-serif",
        letterSpacing: 0.2,
        color: "white"
    },
    contestTextLink: {
        fontSize: 14,
        color: "white",
        fontWeight: "bold",
        fontFamily: "sans-serif",
        letterSpacing: 1,
        textTransform: "uppercase",
        padding: 4,
        paddingRight: 6,
        borderRadius: 6,
        backgroundColor: "white",
        width: "80%"
    },
    contestTextVisit: {
        fontSize: 14,
        color: "white",
        fontWeight: "bold",
        fontFamily: "sans-serif",
        letterSpacing: 0.5,
        textTransform: "uppercase",
        backgroundColor: "violet",
        padding: 4,
        borderRadius: 6
    },
})

// contest_url: "https://topcoder.com/community/events/"
// duration: 7200
// event_name: "SRM 808"
// resource_website: "topcoder.com"
// start_time: "Fri Jun 25 2021 11:00:00 GMT+0530 (India Standard Time)"
// status: "Upcoming"