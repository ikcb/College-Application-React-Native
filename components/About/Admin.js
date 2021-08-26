import axios from 'axios';
import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { Input } from 'react-native-elements';
import { windowWidth, windowHeight } from "../../constants/Constants"
import Books from './Books';
import Notes from './Notes';
import Notice from './Notice';
import Video from './Video';
import { useSelector, useDispatch } from 'react-redux';
import { setAdmin } from '../../reduxConfig/actions';

export default function AdminScreen() {
    const { Admin } = useSelector((state) => state);
    const dispatch = useDispatch();

    const [error, seterror] = useState(false)
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    const [index, setIndex] = useState(0)

    const checkUser = async () => {
        seterror(false)
        const article = {
            "username": username,
            "password": password
        };
        axios.post('https://backend-clg-app.herokuapp.com/admin/login', article)
            .then(response => {
                response.data === "ok!" ? dispatch(setAdmin(true)) : dispatch(setAdmin(false))
            })
            .catch((e) => seterror(true));
    }
    
    const renderTab = () => {
        switch (index) {
            case 0: return <Notice dispatch={dispatch} />;
            case 1: return <Notes dispatch={dispatch} />;
            case 2: return <Video dispatch={dispatch} />;
            case 3: return <Books dispatch={dispatch} />;
        }
    }

    if (!Admin)
        return <View style={styles.userContainer}>
            <Input
                placeholder="Username"
                onChangeText={setusername}
                value={username}
                inputStyle={{ fontFamily: "sans-serif", marginLeft: 10 }}
                leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
            />
            <Input
                placeholder="Password"
                onChangeText={setpassword}
                value={password}
                inputStyle={{ fontFamily: "sans-serif", marginLeft: 10 }}
                secureTextEntry
                leftIcon={{ type: 'font-awesome', name: 'key' }}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    checkUser();
                }}
            >
                <Text style={styles.btntext}>Sign In</Text>
            </TouchableOpacity>
            {error ? <Text style={styles.error}>Enter Right Credentials</Text> : null}
        </View>

    return (<View styles={styles.dataContainer}>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal style={styles.tab}>
            <Text style={[styles.tabElement, { borderBottomWidth: index == 0 ? 2.2 : 0 }]} onPress={() => setIndex(0)}>Notice</Text>
            <Text style={[styles.tabElement, { borderBottomWidth: index == 1 ? 2.2 : 0 }]} onPress={() => setIndex(1)}>Notes</Text>
            <Text style={[styles.tabElement, { borderBottomWidth: index == 2 ? 2.2 : 0 }]} onPress={() => setIndex(2)}>Recordings</Text>
            <Text style={[styles.tabElement, { borderBottomWidth: index == 3 ? 2.2 : 0 }]} onPress={() => setIndex(3)}>Ebooks</Text>
        </ScrollView>
        {
            renderTab()
        }
    </View>
    )
}

const styles = StyleSheet.create({
    userContainer:
    {
        flex: 1,
        margin: 30,
    },
    dataContainer:
    {
        flex: 1,
        margin: 30,
    },
    btntext: {
        color: "black",
        fontFamily: "sans-serif",
        fontSize: 20,
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
    tab: {
        backgroundColor: "white",
        paddingTop: 10,
    },
    tabElement: {
        fontSize: 20,
        paddingVertical: 5,
        marginHorizontal: 15,
        fontFamily: "sans-serif",
        borderBottomColor: "red"
    },
    error: {
        fontSize: 20,
        fontFamily: "sans-serif",
        color: "red",
        fontFamily: "600",
        textAlign: "center",
        marginTop: 20
    }
})