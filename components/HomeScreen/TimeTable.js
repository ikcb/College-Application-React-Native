import React from 'react'
import { View, Text, StyleSheet, ImageBackground, Linking } from 'react-native'
import { windowWidth, windowHeight, COLORS2, classbg } from "../../constants/Constants";

export default function TimeTable({ item, index }) {

    return (
        <View style={[styles.box, { shadowColor: COLORS2[index % COLORS2.length] }]}>
            <ImageBackground source={classbg[index % classbg.length]} style={styles.image}>
                <View style={styles.timeContainer}>
                    <Text style={styles.subjectText}>{item.Subject}</Text>
                    <Text style={styles.timeText}>{item.Time}</Text>
                </View>
                <Text style={styles.teacherText}>{item.Teacher}</Text>
                <Text style={styles.linkText} onPress={() => Linking.openURL(item.link)}>Link</Text>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        justifyContent: "space-around",
        paddingVertical: 5,
        alignItems: "stretch"
    },
    box: {
        width: windowWidth * 0.8,
        height: windowHeight * 0.15,
        marginHorizontal: 10,
        shadowOffset: {
            width: 10,
            height: 10,
        },
        shadowOpacity: 1,
        shadowRadius: 12.00,
        elevation: 20,
        backgroundColor: "white",
        marginBottom: 20,
        marginTop: 10,
        borderRadius: 10,
        overflow: "hidden",
    },
    subjectText: {
        fontSize: 22,
        fontWeight: "700",
        fontFamily: "sans-serif",
        paddingLeft: 10,
        color: "white",
        letterSpacing: 1
    },
    timeText: {
        fontSize: 18,
        fontWeight: "700",
        fontFamily: "sans-serif",
        marginRight: 10,
        color: "grey",
        borderColor: "white",
        paddingHorizontal: 5,
        paddingVertical: 2,
        borderRadius: 5,
        backgroundColor: "white",
        elevation: 10
    },
    linkText: {
        fontSize: 18,
        fontWeight: "600",
        fontFamily: "sans-serif",
        color: "black",
        borderColor: "white",
        width: 50,
        textAlign: "center",
        marginLeft: 10,
        borderRadius: 5,
        backgroundColor: "white",
        letterSpacing: 0.5
    },
    teacherText: {
        fontSize: 18,
        fontWeight: "600",
        fontFamily: "sans-serif",
        paddingLeft: 10,
        color: "white",
        marginTop: -5,
        textTransform: "capitalize",
        letterSpacing: 1
    },
    timeContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    timeContainer2: {
        flexDirection: "row",
        justifyContent: "space-between",
    }
})