import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import { Input } from 'react-native-elements';
import { windowWidth, windowHeight } from "../../constants/Constants"
import axios from 'axios';
import { setAdmin } from '../../reduxConfig/actions';

export default function Notice({ dispatch, data = { message: '', heading: '', code: '' } }) {
    const [message, setmessage] = useState(data.message)
    const [heading, setheading] = useState(data.heading)
    const [code, setcode] = useState(data.code)
    const [okh, setokh] = useState(false)

    const reset = () => {
        setmessage('')
        setcode('')
        setheading('')
    }

    useEffect(() => {
        reset()
    }, [])

    const postNotice = () => {
        console.log("Start Post Notice")
        const item = {
            "Heading": heading,
            "Message": message,
            "Status": code,
        };

        axios.post('https://backend-clg-app.herokuapp.com/admin/notice_board/', item).then(response => {
            setokh(true)
            setTimeout(() => {
                setokh(false)
            }, 1000)
        }).catch((e) => dispatch(setAdmin(false)));

        reset()
    }

    return (
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
                    onPress={postNotice}
                >
                    <Text style={styles.btntext}>Post Notice</Text>
                </TouchableOpacity>
            </View>
            {okh ? <Text style={styles.successTxt}>Notice Posted</Text> : null}
            <View style={{ paddingBottom: 70, backgroundColor: "transparent" }}></View>
        </ScrollView>
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