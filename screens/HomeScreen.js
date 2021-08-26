import React, { useState } from 'react'
import { StyleSheet, RefreshControl, View, Text, ScrollView, FlatList, Image } from 'react-native'
import { windowWidth } from "../constants/Constants"
import { Avatar, Header } from 'react-native-elements'
import Deadline from "../components/HomeScreen/Deadline"
import UploadBox from "../components/HomeScreen/UploadBox"
import TimeTableComp from "../components/HomeScreen/TimeTableComp"
import { useSelector, useDispatch } from 'react-redux';
import { setCourseSubmissionData, signInWithGoogle, setSubmissionData } from '../reduxConfig/actions'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import axios from 'axios';

export default function HomeScreen({ navigation }) {
    //Redux
    const { userInfo, batchData, authData, courses, submissionsData, courseSubData, ebooks, udemyCourses, notes, recordings, extras, batch } = useSelector((state) => state);
    const dispatch = useDispatch();

    // Local State
    const [refresh, setRefresh] = useState(false)
    const show = [{ data: ebooks, text: "Ebooks" },
    { data: udemyCourses, text: "Courses" },
    { data: notes, text: "Notes" },
    { data: recordings, text: "Recordings" },
    { data: extras, text: "Extras" }]

    //Console
    console.log("In home Screen")
    const date = new Date().toDateString()

    const getTokens = async () => {
        const { accessToken } = await GoogleSignin.getTokens();
        dispatch(signInWithGoogle(accessToken))
        setTimeout(() => {
            getSubmissonData()
        }, 200);
    }

    function clone(obj) {
        if (null == obj || "object" != typeof obj) return obj;
        const copy = obj.constructor();
        for (const attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
        }
        return copy;
    }

    Array.prototype.subarray = function (start, end) {
        if (!end) {
            end = this.length;
        }
        const newArray = clone(this);
        return newArray.slice(start, end);
    };

    const getSubmissonData = async () => {
        console.log('Load Submissions')
        const promises = []
        courses.map((item) => {
            promises.push(axios.get(`https://classroom.googleapis.com/v1/courses/${item.id}/courseWork/-/studentSubmissions?states=NEW&states=CREATED`, {
                headers: { "Authorization": `Bearer ${authData}` }
            }))
        })
        Promise.all(promises)
            .then(results => {
                let arr = [];
                results.forEach(data => {
                    if (data.data.studentSubmissions)
                        arr = arr.concat(data.data.studentSubmissions)
                })
                dispatch(setSubmissionData(arr))
            }).then(() => setTimeout(() => {
                getSubData()
                setRefresh(false)
            }, 200)).catch(err => setRefresh(false))
    }

    //Get Sub Data
    const getSubData = async () => {
        console.log('Load course Submissions')
        const promises = []
        submissionsData.map(item => promises.push(axios.get(`https://classroom.googleapis.com/v1/courses/${item.courseId}/courseWork/${item.courseWorkId}`, { headers: { "Authorization": `Bearer ${authData}` } })))

        Promise.all(promises).then(data => {
            let arr = [];
            data.forEach(data => {
                arr = arr.concat(data.data)
            })
            console.log(arr.length)
            dispatch(setCourseSubmissionData(arr))
        }).catch(err => console.log(err.message))
    }

    //Refresh Function
    const handleRefresh = () => {
        setRefresh(true);
        getTokens();
    }

    if (courseSubData && userInfo)
        return (<>
            <Header
                elevated
                barStyle={'dark-content'}
                backgroundColor="white"
                containerStyle={{ backgroundColor: "white" }}
                leftComponent={{ text: `Hello, ${userInfo.givenName}`, style: styles.userText }}
                rightComponent={<Avatar
                    size={50}
                    rounded
                    overlayContainerStyle={{ backgroundColor: 'white', borderColor: "grey", borderWidth: 0.5 }}
                    source={{
                        uri: userInfo.photo,
                    }}
                    onPress={() => navigation.navigate("About")}
                />}
            />
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refresh}
                        onRefresh={handleRefresh}
                    />}
                style={{ flex: 1, backgroundColor: "white" }}>

                <View style={styles.deadline}>
                    <Text style={styles.date}>{date}</Text>
                    {userInfo.email.includes("iiitkota.ac.in") && userInfo.email.includes("2020") ? <TimeTableComp batchData={batchData} batch={batch} dispatch={dispatch} /> : null}
                </View>

                <View style={styles.deadline1}>
                    <Text style={styles.deadlineText2}>
                        {`${userInfo.givenName} you have ${courseSubData.length} pending assignments`}
                    </Text>
                    {
                        courseSubData.map((item, index) => {
                            let subDate = { date: null, time: null };
                            if (item.dueTime && item.dueDate) {
                                const { day, year, month } = item.dueDate
                                const { hours, minutes } = item.dueTime
                                const min = minutes ? minutes : '00'
                                var theDate = new Date(Date.UTC(year, month, day, hours, min, 0))
                                let format = theDate.getHours() <= 12 ? "AM" : "PM"
                                theDate.setHours(theDate.getHours() % 12 || 12)
                                subDate.date = theDate.toLocaleDateString()
                                subDate.time = theDate.toLocaleTimeString() + " " + format
                            }
                            return <Deadline key={index.toString()} index={index} title={item.title} workType={item.workType} assignDate={item.creationTime} dueTime={item.dueTime ? subDate.time : "- - - - - -"} dueDate={item.dueDate ? subDate.date : "No Due Date"} link={item.alternateLink} />
                        })
                    }
                </View>
                {
                    show.map((item, index) => {
                        return (
                            item.data && item.data.length > 5 ?
                                <View style={styles.section} key={index}>
                                    <Text style={styles.uploadText}>{`New ${item.text}`}</Text>
                                    <FlatList
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        data={item.data.subarray(-5)}
                                        renderItem={({ item, index }) => {
                                            return <UploadBox item={item} index={index} />
                                        }}
                                        keyExtractor={(item, index) => index.toString()}
                                    />
                                </View> : item.data && item.data.length > 1 &&
                                <View style={styles.section} key={index}>
                                    <Text style={styles.uploadText}>{`New ${item.text}`}</Text>
                                    <FlatList
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        data={item.data}
                                        renderItem={({ item, index }) => {
                                            return <UploadBox item={item} index={index} />
                                        }}
                                        keyExtractor={(item, index) => index.toString()}
                                    />
                                </View>)
                    })

                }

                <View style={{ paddingBottom: 50 }}></View>
            </ScrollView>
        </>
        )
    else {
        return <View style={{ flex: 1, justifyContent: 'center', alignItems: "center", backgroundColor: "white" }}>
            <Image source={require("../assets/load2.gif")} style={{ width: 150, height: 150 }} />
        </View>
    }
}


const styles = StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: 'cover',
    },
    date: {
        color: "#737373",
        fontSize: 30,
        fontWeight: "bold",
        fontFamily: "sans-serif",
        paddingLeft: 10,
    },
    deadlineText1: {
        color: "#737373",
        fontSize: 18,
        letterSpacing: 0.5,
        fontWeight: "600",
        fontFamily: "sans-serif",
        paddingLeft: 10,
    },
    deadlineText2: {
        color: "#737373",
        fontSize: 18,
        letterSpacing: 0.5,
        fontWeight: "600",
        fontFamily: "sans-serif",
        paddingLeft: 0,
    },
    uploadText: {
        fontSize: 25,
        marginLeft: 10,
        fontWeight: "bold",
        fontFamily: "sans-serif",
    },
    deadline1: {
        width: windowWidth,
        height: "auto",
        padding: 10,
        paddingTop: 0,
        fontSize: 18,
        fontWeight: "700"
    },
    deadline: {
        width: windowWidth,
        height: "auto",
        paddingVertical: 10,
        fontSize: 18,
        fontWeight: "700"
    },
    userText: {
        fontSize: 30,
        fontFamily: "sans-serif",
        textTransform: "capitalize",
        color: "black",
        fontWeight: "bold",
        width: 300
    },
    section: {
        paddingBottom: 10,
    }
})

