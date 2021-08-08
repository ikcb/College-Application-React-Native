//Import
import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Linking,
    Image,
    ScrollView,
} from "react-native";
import { windowWidth } from "../../constants/Constants"

//Export Function
export default function AboutTeam({ }) {

    //Main Function
    return (
        <ScrollView>
            <View style={{
                paddingTop: 30,
                flex: 1,
                backgroundColor: "transparent",
                justifyContent: "center",
                paddingHorizontal: 15
            }}>
                <View style={styles.containerBox}>
                    <Text style={styles.textMiddle}>Our Team</Text>
                    <View style={styles.lineBar} />
                    <View style={styles.imageContain}>
                        <TouchableOpacity
                            activeOpacity={0.4}
                            onPress={() => Linking.openURL("https://github.com/Ankur6702")}
                        >
                            <View style={styles.imageBox}>
                                <Image style={styles.image} source={{ uri: 'https://avatars.githubusercontent.com/u/74523865?v=4' }} />
                                <Text style={styles.textEnd}>Ankur A</Text>
                                <Text style={styles.textTitle}>Content Writer</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.4}
                            onPress={() => Linking.openURL("https://github.com/MrMischievousX")}
                        >
                            <View style={styles.imageBox}>
                                <Image style={styles.image} source={{ uri: 'https://avatars.githubusercontent.com/u/72198360?v=4' }} />
                                <Text style={styles.textEnd}>Akash T</Text>
                                <Text style={styles.textTitle}>App Developer</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.4}
                            onPress={() => Linking.openURL("https://github.com/jhasiddhant")}
                        >
                            <View style={styles.imageBox}>
                                <Image style={styles.image} source={{ uri: "https://avatars.githubusercontent.com/u/72513126?v=4" }} />
                                <Text style={styles.textEnd}>Siddhant J</Text>
                                <Text style={styles.textTitle}>App Tester</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.imageContain}>
                        <TouchableOpacity
                            activeOpacity={0.4}
                            onPress={() => Linking.openURL("https://github.com/HimanshuChittora23908")}
                        >
                            <View style={styles.imageBox}>
                                <Image style={styles.image} source={{ uri: 'https://avatars.githubusercontent.com/u/75764096?v=4' }} />
                                <Text style={styles.textEnd}>Himanshu C</Text>
                                <Text style={styles.textTitle}>Web Developer</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.4}
                            onPress={() => Linking.openURL("https://github.com/RaghhavDTurki")}
                        >
                            <View style={styles.imageBox}>
                                <Image style={styles.image} source={require("../../assets/Raghhav.webp")} />
                                <Text style={styles.textEnd}>Raghhav D</Text>
                                <Text style={styles.textTitle}>Backend Developer</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={[styles.containerBox, { paddingHorizontal: 20, marginBottom: 30, marginTop: 30 }]}>
                    <Text style={styles.textMiddle}>Mission</Text>
                    <View style={styles.lineBar} />
                    <Text style={styles.textMission}>Our mission is to provide a user-friendly interface for college students where they can access all the major things required in their college education on a single platform.
                    </Text>
                </View>
                <View style={[styles.containerBox, { paddingHorizontal: 20, marginBottom: 30 }]}>
                    <Text style={styles.textMiddle}>Vision</Text>
                    <View style={styles.lineBar} />
                    <Text style={styles.textMission}>Our vision is to make students much more focussed by reducing their load of checking different applications to access information related to their college education. On AcadHere, students can access their assignments, important notices, study material etc. through a single platform.
                    </Text>
                </View>
                <View style={[styles.containerBox, { paddingHorizontal: 20, marginBottom: 30 }]}>
                    <Text style={styles.textMiddle}>Idea</Text>
                    <View style={styles.lineBar} />
                    <Text style={styles.textMission}>Our idea is to centralize all the important data related to classes, assignments etc. on a single platform so as to increase the accessibility of data by college students, and thus reducing the chances of late submission of assignments by the students. AcadHere has a proper notification system so that it will remind the students about the important assignments well before the time of submission.
                    </Text>
                </View>
                <View style={[styles.containerBox, { paddingHorizontal: 20, marginBottom: 30 }]}>
                    <Text style={styles.textMiddle}>Brainstorming</Text>
                    <View style={styles.lineBar} />
                    <Text style={styles.textMission}>Idea generation is both about quality and quantity. Before starting to create this application, we all brainstormed a lot of features that we can include in AcadHere and through many discussions we came up with certain things which we can include. The brainstorming part was full of discussions on new ideas and things we can work on, whether it was designing the UI or choosing the correct features to include in the app.
                    </Text>
                </View>
                <View style={[styles.containerBox, { paddingHorizontal: 20, marginBottom: 30, }]}>
                    <Text style={styles.textMiddle}>Finding a team</Text>
                    <View style={styles.lineBar} />
                    <Text style={styles.textMission}>A team plays a major role in deciding the future of any project and luckily we formed a perfect team of 5 friends in which each of us contributed independently in different domains. We have a balanced team consisting of a frontend developer, backend developer, android developer, content writer and a tester. Apart from this every member in our team remains keen to solve each other's doubts, which increases the efficiency of other teammates also.
                    </Text>
                </View>
                <View style={[styles.containerBox, { paddingHorizontal: 20, marginBottom: 30, }]}>
                    <Text style={styles.textMiddle}>Features and UI</Text>
                    <View style={styles.lineBar} />
                    <Text style={styles.textMission}>
                        Students can:
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.textMission}> 1. </Text>
                        <Text style={styles.textMission}>
                            See all the assignments with their deadline shared on google classrooms and also can set a timer so as to receive a notification reminder for completing a particular assignment.
                        </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.textMission}> 2. </Text>
                        <Text style={styles.textMission}>
                            View all the important notices.
                        </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.textMission}> 3. </Text>
                        <Text style={styles.textMission}>
                            Access all the material including books and slides shared by the professors.
                        </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.textMission}> 4. </Text>
                        <Text style={styles.textMission}>
                            View details of upcoming coding contests and hackathons.
                        </Text>
                    </View>
                </View>
                <View style={[styles.containerBox, { paddingHorizontal: 20, marginBottom: 30, }]}>
                    <Text style={styles.textMiddle}>Finishing and launching</Text>
                    <View style={styles.lineBar} />
                    <Text style={styles.textMission}>The thing about finishing a project is that finishing is really only the beginning, improvements and changes will always be there. After months of hard work we finally completed this application with a motive of making students much more focussed by spending less time on exploring different applications to do the same work. It was a complete team effort which made it possible to finish this application in a very short duration.
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    containerBox: {
        borderWidth: 2,
        backgroundColor: "white",
        elevation: 20,
        height: "auto",
        borderColor: "white",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
    },
    lineBar: {
        width: 30,
        height: 5,
        backgroundColor: "tomato",
        borderRadius: 5,
        alignSelf: "center",
        marginBottom: 10,
        marginTop: 5,
    },
    imageBox: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 20
    },
    image: {
        width: windowWidth / 5,
        height: windowWidth / 5,
        borderRadius: windowWidth / 5,
        borderWidth: 0.3,
        borderColor: "grey"
    },
    imageContain: {
        flexDirection: "row",
        flex: 1,
        justifyContent: "space-evenly",
        marginBottom: 20
    },
    textMiddle: {
        fontSize: 18,
        marginBottom: 1,
        fontWeight: "700",
        color: "black",
        letterSpacing: 1,
        textAlign: 'center',
        fontFamily: "sans-serif",
    },
    textMission: {
        letterSpacing: 0.5,
        fontSize: 16,
        marginBottom: 1,
        fontWeight: "700",
        fontFamily: "sans-serif",
        color: "grey",
    },
    textEnd: {
        textAlign: 'center',
        fontSize: 14,
        fontWeight: "700",
        color: "grey",
        marginTop: 2,
        fontFamily: "sans-serif",
    },
    textTitle: {
        textAlign: 'center',
        fontSize: 14,
        fontFamily: "sans-serif",
        fontWeight: "400",
        color: "grey",
        marginTop: 2,
        letterSpacing: 0.3,
    },
    icon: {
        fontSize: 50,
        color: "red",
    },
    akash: {
        fontSize: 30,
        fontFamily: "Bebas",
        letterSpacing: 1.3,
        textAlign: "center",
        marginTop: 30,
        marginBottom: 60,
        color: "black",
    },
});