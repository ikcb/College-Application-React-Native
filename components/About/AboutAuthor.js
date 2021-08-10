//Import
import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Linking,
    ScrollView,
} from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';

//Export Function
export default function AboutAuthor() {

    //Main Function
    return (
        <ScrollView>
            <View style={{
                paddingTop: 30,
                flex: 1,
                justifyContent: "center",
                paddingHorizontal: 15,
                backgroundColor: "transparent",
            }}>
                <View style={styles.containerBox}>
                    <TouchableOpacity
                        style={{ marginBottom: 10 }}
                        onPress={() => Linking.openURL("https://github.com/MrMischievousX")}
                    >
                        <Text style={styles.textMiddle}>Owner</Text>
                        <Text style={styles.textEnd}>@MrMischievousX</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ marginBottom: 1 }}
                        onPress={() => Linking.openURL("mailto:2020kucp1138@iiitkota.ac.in")}
                    >
                        <Text style={styles.textMiddle}>Send me an Email</Text>
                        <Text style={styles.textEnd}>Want to give me a feedback</Text>
                    </TouchableOpacity>
                </View>

                <View style={[styles.containerBox, { marginTop: 30 }]}>
                    <Text style={styles.textStart}>App</Text>
                    <TouchableOpacity style={{ marginBottom: 10 }}>
                        <Text style={styles.textMiddle}>Package</Text>
                        <Text style={styles.textEnd}>com.acadhere</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginBottom: 10 }}>
                        <Text style={styles.textMiddle}>Version</Text>
                        <Text style={styles.textEnd}>1.0.0</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ marginBottom: 10 }}
                        onPress={() =>
                            Linking.openURL(
                                "https://github.com/MrMischievousX/College-Application-React-Native"
                            )
                        }
                    >
                        <Text style={styles.textMiddle}>Report a bug</Text>
                        <Text style={styles.textEnd}>
                            Create an issue in the git repository
                        </Text>
                    </TouchableOpacity>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                            marginTop: 25,
                        }}
                    >
                        <TouchableOpacity
                            onPress={() =>
                                Linking.openURL("https://www.instagram.com/akash_tureha23/?hl=en")
                            }
                        >
                            <AntDesign name="instagram" style={styles.icon} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() =>
                                Linking.openURL(
                                    "https://www.linkedin.com/in/akash-tureha-ba8b0214a/"
                                )
                            }
                        >
                            <AntDesign name="linkedin-square" style={styles.icon} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => Linking.openURL("https://github.com/MrMischievousX")}
                        >
                            <AntDesign name="github" style={styles.icon} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ marginTop: 20 }}>
                    <Text style={styles.akash}> Made with</Text>
                    <Text style={styles.akash}> ❤️</Text>
                    <Text style={styles.akash}> Team Aztecs</Text>
                </View>
            </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    containerBox: {
        borderWidth: 2,
        backgroundColor: "white",
        elevation: 5,
        borderColor: "white",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 15,
    },
    textStart: {
        fontSize: 16,
        fontFamily: "sans-serif",
        marginBottom: 15,
        fontWeight: "600",
        color: "red",
        letterSpacing: 0.5,
    },
    textMiddle: {
        fontSize: 20,
        fontFamily: "sans-serif",
        marginBottom: 1,
        fontWeight: "600",
        color: "black",
        letterSpacing: 0.5,
    },
    textEnd: {
        fontSize: 18,
        fontFamily: "sans-serif",
        fontWeight: "600",
        color: "grey",
        letterSpacing: 0.5,
    },
    icon: {
        fontSize: 50,
        color: "#f50",
    },
    akash: {
        fontSize: 25,
        fontFamily: "Bebas",
        letterSpacing: 1,
        textAlign: "center",
        color: "black",
    },
});