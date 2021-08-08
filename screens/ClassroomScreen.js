//Import
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native'
import ClassroomBox from "../components/Classroom/ClassroomBox"
import axios from "axios"
import { useSelector, useDispatch } from 'react-redux';
import { Header } from 'react-native-elements'
import { setCoursesList } from "../reduxConfig/actions";
import { GoogleSignin } from '@react-native-google-signin/google-signin';

//Export Function
export default function ClassroomScreen() {

    //Redux
    const { errorAuth, courses } = useSelector((state) => state);
    const dispatch = useDispatch();

    //Local State
    const [error, seterror] = useState(false)
    const [refresh, setRefresh] = useState(false)

    //Load Class Function
    const loadClass = async () => {
        seterror(false)
        const webApiUrl = 'https://classroom.googleapis.com/v1/courses?courseStates=ACTIVE';
        const { accessToken } = await GoogleSignin.getTokens();
        axios.get(webApiUrl, { headers: { "Authorization": `Bearer ${accessToken}` } }).then(data => {
            dispatch(setCoursesList(data.data.courses))
            setRefresh(false)
        });
    }

    //Refresh Function
    const handleRefresh = () => {
        setRefresh(true)
        loadClass()
    }

    useEffect(() => {
        loadClass()
    }, [])

    //Main Function
    if (!courses)
        return (<>
            <View style={{ flex: 1 }}>
                <Header
                    barStyle={'dark-content'}
                    elevated
                    backgroundColor="white"
                    containerStyle={{ backgroundColor: "white" }}
                    centerComponent={{ text: 'CLASSES', style: { fontWeight: "600", color: 'black', fontSize: 24, letterSpacing: 1 } }}
                />
                <ActivityIndicator style={{ flex: 1 }} size="large" color="#00ff00" />
            </View>
        </>)
    else
        return (
            <View style={{ flex: 1 }}>
                <Header
                    barStyle={'dark-content'}
                    elevated
                    backgroundColor="white"
                    containerStyle={{ backgroundColor: "white" }}
                    centerComponent={{ text: 'CLASSES', style: { fontWeight: "600", color: 'black', fontSize: 24, letterSpacing: 1 } }}
                />
                <View style={styles.classroom}>
                    {error || errorAuth ? <Text style={styles.successText}>Something Went Wrong</Text> : null}
                    {
                        courses ?
                            <FlatList
                                refreshing={refresh}
                                onRefresh={handleRefresh}
                                data={courses}
                                renderItem={
                                    ({ item, index }) => {
                                        item = { ...item, index }
                                        return <ClassroomBox key={index} courseItem={item} />
                                    }
                                }
                                ListFooterComponent={<View style={{ paddingBottom: 70, backgroundColor: "transparent" }}></View>}
                            /> : null
                    }
                </View>

            </View>
        )
}

//Styles
const styles = StyleSheet.create({
    classroom: {
        flex: 1,
        alignItems: 'center',
    },
    successText: {
        fontSize: 20,
        fontFamily: "sans-serif",
        fontWeight: "bold",
        marginTop: 10
    },
    space: {
        margin: 10
    }
})
