import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import { Input } from 'react-native-elements';
import { windowWidth, windowHeight } from "../../constants/Constants"
import axios from 'axios';
import { setAdmin } from '../../reduxConfig/actions';

export default function Notes({ dispatch }) {
    const [message, setmessage] = useState("")
    const [url, seturl] = useState("")
    const [code, setcode] = useState("")
    const [okh, setokh] = useState(false)

    const reset = () => {
        setmessage('')
        seturl('')
        setcode('')
    }

    useEffect(() => {
        reset()
    }, [])

    const postNotes = () => {
        console.log("Start Post Notes")
        const item = {
            "Url": url,
            "Subject_Code": code,
            "Message": message,
            "Resources_Type": "Notes",
        };

        axios.post('https://backend-clg-app.herokuapp.com/admin/resources/notes/', item).then(response => {
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
                    placeholder="Subject Code"
                    onChangeText={setcode}
                    value={code}
                    inputStyle={{ fontFamily: "sans-serif", marginLeft: 10 }}
                />
                <Input
                    placeholder="Url"
                    onChangeText={seturl}
                    value={url}
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
                    onPress={postNotes}
                >
                    <Text style={styles.btntext}>Post Notes</Text>
                </TouchableOpacity>
            </View>
            {okh ? <Text style={styles.successTxt}>Notes Posted</Text> : null}
            <View style={{ paddingBottom: 70, backgroundColor: "transparent" }}></View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    btntext: {
        color: "black",
        fontFamily: "sans-serif",
        fontSize: 20,
    },
    successTxt: {
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