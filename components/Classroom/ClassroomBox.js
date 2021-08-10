import React from 'react'
import { View, Text, StyleSheet, Pressable, ImageBackground } from 'react-native'
import { windowWidth, COLORS, classbg, windowHeight } from "../../constants/Constants"
import { useNavigation } from '@react-navigation/native';

export default function ClassroomBox({ courseItem }) {
    const { descriptionHeading, name, section, id, index, alternateLink } = courseItem
    const navigation = useNavigation();

    return (
        <Pressable activeOpacity={0.1} onPress={() => navigation.navigate("CourseScreen", { name, id, bgColor: COLORS[index % COLORS.length], section, image: classbg[index % classbg.length], alternateLink: alternateLink })}>
            <View style={styles.contestBox}>
                <ImageBackground source={classbg[index % classbg.length]} style={styles.image}>
                    <View>
                        <Text numberOfLines={1} style={styles.contestTextLink}>{name}</Text>
                        <Text style={styles.contestTextName}>{section ? `${section}` : null}</Text>
                    </View>
                    <Text style={styles.contestTextDesc}>{descriptionHeading}</Text>
                </ImageBackground>
            </View>
        </Pressable>
    )
}


const styles = StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: 'contain',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 15
    },
    contestBox: {
        borderRadius: 8,
        width: windowWidth - 20,
        height: windowHeight / 5.4,
        marginHorizontal: 10,
        marginTop: 5,
        marginBottom: 2,
        overflow: 'hidden',
        justifyContent: 'space-evenly',
    },
    contestTextName: {
        fontSize: 18,
        fontWeight: "600",
        fontFamily: "sans-serif",
        color: "white",
        textTransform: "capitalize"
    },
    contestTextDesc: {
        fontSize: 14,
        fontWeight: "600",
        fontFamily: "sans-serif",
        letterSpacing: 0.1,
        color: "white",
        textTransform: "capitalize"
    },
    contestTextLink: {
        fontSize: 25,
        color: "white",
        fontWeight: "600",
        fontFamily: "sans-serif",
        textTransform: "uppercase",
    },
})

