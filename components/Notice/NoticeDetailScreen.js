import React, { useState } from 'react'
import { View, StyleSheet, ScrollView, Linking } from 'react-native'
import { Header, Icon, Text, Divider } from 'react-native-elements'
import Autolink from 'react-native-autolink';

export default function NoticeDetailScreen({ navigation, route }) {
    const [press, setpress] = useState(false)

    const { Message, Link, Heading, Other, Post_Time, Status } = route.params.item
    const date = new Date(Post_Time).toDateString()

    console.log(Link)

    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <Header
                barStyle={'dark-content'}
                backgroundColor="transparent"
                containerStyle={styles.headerStyle}
                leftComponent={<Icon name='angle-left' color="#598fa0" type="font-awesome" onPress={() => navigation.goBack()} containerStyle={{ marginLeft: 8 }} iconStyle={styles.backButton} />}
                rightComponent={<Icon name={press ? 'bookmark' : "bookmark-o"} color="#598fa0" type="font-awesome" onPress={() => setpress(!press)} containerStyle={{ marginRight: 8 }} iconStyle={styles.starButton} />}
            />
            <ScrollView style={{ paddingHorizontal: 15 }}>
                <Text style={styles.msgDate}>
                    Date : {date}
                </Text>
                <Text style={styles.msgStatus}>
                    Status : {Status}
                </Text>
                <Text style={styles.msgHeading}>
                    {Heading}
                </Text>
                <Divider
                    orientation="horizontal"
                    insetType="center"
                    color="#598fa0"
                    width={1.5}
                />
                <Autolink style={styles.msgDescription} text={Message.replace(/^ +/gm, '')} />
                <Divider
                    orientation="horizontal"
                    insetType="center"
                    color="#598fa0"
                    width={1}
                />
                {Link || Other ? <Text style={styles.msgAttach}>
                    Attachments
                </Text> : null}
                {
                    Link ? <Text onPress={() => Linking.openURL(Link)} style={styles.msgLink}>
                        {Link}
                    </Text>
                        : null
                }
                {
                    Other ? <Text onPress={() => Linking.openURL(Other)} style={styles.msgLink}>
                        {Other}
                    </Text>
                        : null
                }

                <View style={{ paddingBottom: 70 }}></View>
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    backButton: {
        fontSize: 35,
        padding: 5,
        fontWeight: "700"
    },
    starButton: {
        fontSize: 30,
        padding: 5
    },
    msgHeading: {
        color: "#2D3A47",
        fontSize: 30,
        fontWeight: "700",
        marginTop: 10,
        marginBottom: 5,
        textAlign: "left",
    },
    msgDescription: {
        fontSize: 18,
        fontWeight: "400",
        fontFamily: "sans-serif",
        textAlign: "left",
        marginTop: 5,
        marginBottom: 5,
        color: "#919AB1",
    },
    msgStatus: {
        color: "#67778C",
        fontSize: 22,
        fontWeight: "600",
        fontFamily: "sans-serif",
    },
    msgLink: {
        color: "#0E7AFE",
        fontSize: 17,
        fontWeight: "600",
        fontFamily: "sans-serif",
        marginVertical: 5
    },
    msgAttach: {
        color: "#67778C",
        fontSize: 22,
        fontWeight: "600",
        marginTop: 10,
        fontFamily: "sans-serif",
    },
    msgDate: {
        color: "red",
        fontSize: 24,
        fontWeight: "600",
        fontFamily: "sans-serif",
    },
    headerStyle: {
        backgroundColor: "transparent",
        alignItems: "center",
        justifyContent: "center",
        borderBottomColor: "#EAEDF3"
    }
})