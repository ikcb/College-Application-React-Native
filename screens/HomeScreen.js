import React, { useState, useEffect } from 'react'
import { StyleSheet, RefreshControl, View, Text, ScrollView, FlatList, Image } from 'react-native'
import { windowWidth, timeTable } from "../constants/Constants"
import { Avatar, Header } from 'react-native-elements'
import Deadline from "../components/HomeScreen/Deadline"
import UploadBox from "../components/HomeScreen/UploadBox"
import TimeTable from "../components/HomeScreen/TimeTable"
import { useSelector, useDispatch } from 'react-redux';
import { setCourseSubmissionData, signInWithGoogle, setSubmissionData } from '../reduxConfig/actions'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import axios from 'axios';

export default function HomeScreen({ navigation }) {
    //Redux
    const { userInfo, authData, courses, submissionsData, courseSubData, ebooks, udemyCourses, notes, recordings, extras } = useSelector((state) => state);
    const dispatch = useDispatch();

    // Local State

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
            }, 200)).catch(err => console.log(err.message))
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

    useEffect(() => {
        getTokens()
    }, [])

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
                        refreshing={false}
                    />}
                style={{ flex: 1, backgroundColor: "white" }}>
                <View style={styles.deadline}>
                    <Text style={styles.date}>{date}</Text>
                    <Text style={styles.deadlineText1}>
                        Today Classes (Sample Preview)
                    </Text>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={timeTable}
                        renderItem={({ item, index }) => {
                            return <TimeTable item={item} index={index} />
                        }}
                        keyExtractor={(item, index) => index.toString()}
                    />
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
                {ebooks && ebooks.length > 5 ?
                    <View style={styles.section}>
                        <Text style={styles.uploadText}>New Ebooks</Text>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={ebooks.subarray(-5)}
                            renderItem={({ item, index }) => {
                                return <UploadBox item={item} index={index} />
                            }}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View> :
                    <View style={styles.section}>
                        <Text style={styles.uploadText}>New Ebooks</Text>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={ebooks}
                            renderItem={({ item, index }) => {
                                return <UploadBox item={item} index={index} />
                            }}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                }
                {udemyCourses && udemyCourses.length > 5 ?
                    <View style={styles.section}>
                        <Text style={styles.uploadText}>New Courses</Text>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={udemyCourses.subarray(-5)}
                            renderItem={({ item, index }) => {
                                return <UploadBox item={item} index={index} />
                            }}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View> :
                    <View style={styles.section}>
                        <Text style={styles.uploadText}>New Courses</Text>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={udemyCourses}
                            renderItem={({ item, index }) => {
                                return <UploadBox item={item} index={index} />
                            }}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                }
                {notes && notes.length > 5 ?
                    <View style={styles.section}>
                        <Text style={styles.uploadText}>New Notes</Text>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={notes.subarray(-5)}
                            renderItem={({ item, index }) => {
                                return <UploadBox item={item} index={index} />
                            }}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View> :
                    <View style={styles.section}>
                        <Text style={styles.uploadText}>New Notes</Text>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={notes}
                            renderItem={({ item, index }) => {
                                return <UploadBox item={item} index={index} />
                            }}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                }
                {recordings && recordings.length > 5 ?
                    <View style={styles.section}>
                        <Text style={styles.uploadText}>New Recodings</Text>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={recordings.subarray(-5)}
                            renderItem={({ item, index }) => {
                                return <UploadBox item={item} index={index} />
                            }}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View> :
                    <View style={styles.section}>
                        <Text style={styles.uploadText}>New Recordings</Text>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={recordings}
                            renderItem={({ item, index }) => {
                                return <UploadBox item={item} index={index} />
                            }}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                }
                {extras && extras.length > 5 ?
                    <View style={styles.section}>
                        <Text style={styles.uploadText}>New Extras</Text>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={extras.subarray(-5)}
                            renderItem={({ item, index }) => {
                                return <UploadBox item={item} index={index} />
                            }}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View> :
                    <View style={styles.section}>
                        <Text style={styles.uploadText}>New Extras</Text>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={extras}
                            renderItem={({ item, index }) => {
                                return <UploadBox item={item} index={index} />
                            }}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
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