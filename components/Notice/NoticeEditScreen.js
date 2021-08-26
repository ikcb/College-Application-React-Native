import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { Input, Header } from 'react-native-elements';
import { windowWidth, windowHeight } from "../../constants/Constants"
import axios from 'axios';
import { setAdmin } from '../../reduxConfig/actions';
import { useDispatch } from 'react-redux';

export default function NoticeEdit({ route, navigation }) {
    const { item } = route.params

    const [message, setmessage] = useState(item.Message)
    const [heading, setheading] = useState(item.Heading)
    const [code, setcode] = useState(item.Status)
    const [okh, setokh] = useState(false)
    const dispatch = useDispatch();

    const reset = () => {
        setmessage('')
        setcode('')
        setheading('')
    }

    const patchNotice = () => {
        console.log("Start Post Notice")
        var config = {
            method: 'patch',
            url: `https://backend-clg-app.herokuapp.com/admin/notice_board/${item._id}`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                "Heading": heading,
                "Message": message,
                "Status": code,
            }
        };

        axios(config).then(response => {
            setokh(true)
            setTimeout(() => {
                setokh(false)
                navigation.navigate('Notice')
            }, 1000)
        }).catch((e) => {
            dispatch(setAdmin(false))
            navigation.navigate('Notice')
        });

        reset()
    }

    return (
        <>
            <Header
                barStyle={'dark-content'}
                elevated
                backgroundColor="white"
                containerStyle={{ backgroundColor: "white" }}
                centerComponent={{ text: 'NOTICE PATCH', style: { fontWeight: "600", color: 'black', fontSize: 24, letterSpacing: 1 } }}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <Input
                        placeholder="Status"
                        onChangeText={setcode}
                        value={code}
                        inputStyle={{ fontFamily: "sans-serif", marginLeft: 10 }}
                    />
                    <Input
                        placeholder="Heading"
                        onChangeText={setheading}
                        value={heading}
                        inputStyle={{ fontFamily: "sans-serif", marginLeft: 10 }}
                    />
                    <Input
                        multiline
                        placeholder="Message"
                        onChangeText={setmessage}
                        value={message}
                        inputContainerStyle={styles.input}
                        inputStyle={{ fontFamily: "sans-serif", marginLeft: 10 }}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={patchNotice}
                    >
                        <Text style={styles.btntext}>Patch Notice</Text>
                    </TouchableOpacity>
                </View>
                {okh ? <Text style={styles.successTxt}>Notice Patched</Text> : null}
                <View style={{ paddingBottom: 70, backgroundColor: "transparent" }}></View>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    btntext: {
        color: "black",
        fontFamily: "sans-serif",
        fontSize: 20,
    }, successTxt: {
        color: "green",
        fontFamily: "sans-serif",
        fontSize: 30,
        letterSpacing: 1,
        fontWeight: "bold",
        textAlign: "center",
    },
    button: {
        alignSelf: "center",
        width: windowWidth / 2,
        height: windowHeight / 15,
        alignItems: "center",
        borderRadius: 10,
        marginTop: 30,
        justifyContent: "center",
        borderWidth: 0.5,
        backgroundColor: "#eaf4fc",
        borderColor: "black",
    },
    container: {
        margin: 30,
    },
    input: {
        fontFamily: "sans-serif",
        fontSize: 20,
        textAlign: "left",
    }
})