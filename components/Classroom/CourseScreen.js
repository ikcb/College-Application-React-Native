import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native';
import { View, ImageBackground, Animated, Linking, StyleSheet, Image, RefreshControl } from 'react-native';
import axios from "axios"
import { Avatar, Tab, Text, Icon, Header } from 'react-native-elements';
import AnnouncementScreen from './AnnouncementScreen';
import CourseWorkMaterialScreen from './CourseWorkMaterials';
import CourseWork from './CourseWork';
import { windowWidth } from "../../constants/Constants";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useSelector } from 'react-redux';

const tempData = [{
    announceMessage: "No Announcements here",
    CourseMessage: "No Work here",
    CourseMaterialMessage: "No Work Material here",
    text: "",
}]

export default function CourseScreen({ navigation }) {
    const route = useRoute()
    const { id, image, name, section, alternateLink } = route.params

    const { userInfo } = useSelector((state) => state);

    //Local State
    const [announcements, setannouncements] = useState(null)
    const [courseWork, setcourseWork] = useState(null)
    const [courseWorkSubmission, setcourseWorkSubmission] = useState(null)
    const [courseWorkMaterial, setcourseWorkMaterial] = useState(null)
    const [teacher, setTeacher] = useState(null)
    const [index, setIndex] = useState(0)
    const [refresh, setRefresh] = useState(false)
    const [token, setToken] = useState(null)

    //Load Class Announcements
    const loadAnnouncements = async (source) => {
        try {
            const webApiUrl = `https://classroom.googleapis.com/v1/courses/${id}/announcements?announcementStates=PUBLISHED`;
            axios.get(webApiUrl, { cancelToken: source.token, headers: { "Authorization": `Bearer ${token}` } }).then(data => {
                data.data.announcements ? setannouncements(data.data.announcements) : setannouncements(tempData)
            });
        } catch (e) { }
    }

    //Load Class Work
    const loadCourseWork = async (source) => {
        console.log("Load CourseWork")
        try {
            const webApiUrl = `https://classroom.googleapis.com/v1/courses/${id}/courseWork`;
            axios.get(webApiUrl, { cancelToken: source.token, headers: { "Authorization": `Bearer ${token}` } }).then(data => {
                data.data.courseWork ? setcourseWork(data.data.courseWork) : setcourseWork(tempData)
            });
        } catch (e) { }
    }

    //Load Class Work Submissions
    const loadCourseWorkSubmissions = async (source) => {
        console.log('Load CourseWork Submissions')
        try {
            const webApiUrl = `https://classroom.googleapis.com/v1/courses/${id}/courseWork/-/studentSubmissions`;
            axios.get(webApiUrl, { cancelToken: source.token, headers: { "Authorization": `Bearer ${token}` } }).then(data => {
                data.data.studentSubmissions ? setcourseWorkSubmission(data.data.studentSubmissions) : setcourseWorkSubmission(tempData)
            });
        } catch (e) { }
    }

    //Load Class Work Material
    const loadCourseWorkMaterial = async (source) => {
        console.log("Load Coursework Material")
        try {
            const webApiUrl = `https://classroom.googleapis.com/v1/courses/${id}/courseWorkMaterials?courseWorkMaterialStates=PUBLISHED`;
            axios.get(webApiUrl, { cancelToken: source.token, headers: { "Authorization": `Bearer ${token}` } }).then(data => {
                data.data.courseWorkMaterial ? setcourseWorkMaterial(data.data.courseWorkMaterial) : setcourseWorkMaterial(tempData)
            });
        } catch (e) { }
    }

    //Load Class Teachers
    const loadTeachers = async (source) => {
        console.log("Load Teachers")
        try {
            const webApiUrl = `https://classroom.googleapis.com/v1/courses/${id}/teachers`;
            axios.get(webApiUrl, { cancelToken: source.token, headers: { "Authorization": `Bearer ${token}` } }).then(data => {
                setTimeout(() => {
                    data.data.teachers ? setTeacher(data.data.teachers[0].profile) : setTeacher(tempData)
                    setRefresh(false)
                }, 500);
            });
        } catch (e) { }
    }

    useEffect(() => {
        const source = axios.CancelToken.source()
        if (token) {
            loadAnnouncements(source)
            loadCourseWork(source)
            loadCourseWorkMaterial(source)
            loadTeachers(source)
            loadCourseWorkSubmissions(source)
        }
        return () => {
            source.cancel()
        }
    }, [token])

    useEffect(() => {
        const getTokens = async () => {
            const { accessToken } = await GoogleSignin.getTokens();
            setToken(accessToken)
        }
        getTokens()
    }, [])


    const handleRefresh = () => {
        setRefresh(true)
        const source = axios.CancelToken.source()
        loadAnnouncements(source)
        loadCourseWork(source)
        loadCourseWorkMaterial(source)
        loadTeachers(source)
        loadCourseWorkSubmissions(source)
    }

    const renderTab = () => {
        switch (index) {
            case 0: return <AnnouncementScreen announce={announcements} />;
            case 1: return <CourseWork coursework={courseWork} courseWorkSub={courseWorkSubmission} />;
            case 2: return <CourseWorkMaterialScreen courseworkmaterial={courseWorkMaterial} />;
        }
    }

    if (!teacher)
        return (<>
            <Header
                elevated
                barStyle={'dark-content'}
                backgroundColor="white"
                containerStyle={{ backgroundColor: "white" }}
                centerComponent={{ text: 'CLASSROOM', style: { fontWeight: "600", color: 'black', fontSize: 24, letterSpacing: 1 } }}
                leftComponent={<Icon
                    containerStyle={{ marginLeft: 5 }}
                    name='angle-left'
                    color="black"
                    type="font-awesome"
                    size={30}
                    iconStyle={{ padding: 5 }}
                    onPress={() => navigation.goBack()}
                />}
            /><View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
                <Image source={require("../../assets/load2.gif")} style={{ width: 120, height: 120, marginTop: -100 }} />
                <Text style={styles.classLoadTitle}>{`Loading ${name.replace(/\([^()]*\)/g, "")}`}</Text>
            </View></>)

    return (<>
        <Header
            elevated
            barStyle={'dark-content'}
            backgroundColor="white"
            containerStyle={{ backgroundColor: "white" }}
            centerComponent={{ text: 'CLASSROOM', style: { fontWeight: "600", color: 'black', fontSize: 24, letterSpacing: 1 } }}
            leftComponent={<Icon
                containerStyle={{ marginLeft: 5 }}
                name='angle-left'
                color="black"
                type="font-awesome"
                size={30}
                iconStyle={{ padding: 5 }}
                onPress={() => navigation.goBack()}
            />}
        />
        <Animated.ScrollView
            refreshControl={<RefreshControl refreshing={refresh}
                onRefresh={handleRefresh} />}
            style={{ flex: 1, position: "relative" }}
        >
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                <View style={[styles.banner, { backgroundColor: "transparent", alignItems: "center", justifyContent: 'center' }]}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: "center", width: "100%" }}>
                        <Text style={styles.classTitle}>{name.replace(/\([^()]*\)/g, "")}</Text>
                        <Text style={styles.classSection}>{section ? `Section : ${section}` : null}</Text>
                        <View style={{ flexDirection: "row", justifyContent: "center", alignItemsL: 'center' }}>
                            <Avatar
                                rounded
                                size={100}
                                icon={{ name: 'account', type: 'material-community', size: 60 }}
                                avatarStyle={{ borderWidth: 1, borderColor: 'white' }}
                                containerStyle={{ marginTop: 5, borderWidth: 3, borderColor: 'white' }}
                            />
                            {alternateLink ? <Icon
                                raised
                                size={16}
                                name='google-classroom'
                                type='material-community'
                                onPress={() => Linking.openURL(alternateLink)}
                                containerStyle={{ fontSize: 20, borderRadius: 25, backgroundColor: "white", position: 'absolute', bottom: -18, left: 24 }}
                            /> : null}
                        </View>
                        <Text style={styles.classTeacherName}>{teacher.name.fullName}</Text>
                    </View>
                </View>
                <View style={styles.container}>
                    <Tab value={index} indicatorStyle={{ backgroundColor: 'white' }} onChange={setIndex}  >
                        <Tab.Item
                            containerStyle={[index == 0 ? styles.tabStyle1 : { ...styles.tabStyle2, backgroundColor: "transparent" }]}
                            buttonStyle={[index == 0 ? styles.tabStyle3 : { ...styles.tabStyle4, backgroundColor: "transparent" }]}
                            titleStyle={[index == 0 ? styles.tabTitle1 : styles.tabTitle2]}
                            title="Notice" />
                        <Tab.Item
                            containerStyle={[index == 1 ? styles.tabStyle1 : { ...styles.tabStyle2, backgroundColor: "transparent" }]}
                            buttonStyle={[index == 1 ? styles.tabStyle3 : { ...styles.tabStyle4, backgroundColor: "transparent" }]}
                            titleStyle={[index == 1 ? styles.tabTitle1 : styles.tabTitle2]}
                            title="Assignment" />
                        <Tab.Item
                            containerStyle={[index == 2 ? styles.tabStyle1 : { ...styles.tabStyle2, backgroundColor: "transparent" }]}
                            buttonStyle={[index == 2 ? styles.tabStyle3 : { ...styles.tabStyle4, backgroundColor: "transparent" }]}
                            titleStyle={[index == 2 ? styles.tabTitle1 : styles.tabTitle2]}
                            title="Resources" />
                    </Tab>
                </View>
            </ImageBackground>
            {
                renderTab()
            }
            <View style={{ paddingBottom: 70 }}></View>
        </Animated.ScrollView>
    </>
    )
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        justifyContent: "center",
    },
    classTitle: {
        width: windowWidth - 40,
        fontSize: windowWidth * 0.07,
        textAlign: "center",
        color: 'white',
        fontWeight: "bold",
        textTransform: "uppercase",
        fontFamily: "sans-serif",
        marginVertical: 5,
        letterSpacing: 0.5
    },
    classSection: {
        textAlign: "center",
        fontSize: 20,
        color: 'white',
        fontWeight: "700",
        textTransform: "uppercase",
        fontFamily: "sans-serif",
        marginVertical: 5,
        letterSpacing: 0.5,
    },
    classLoadTitle: {
        textAlign: "center",
        fontSize: 20,
        color: 'black',
        fontWeight: "500",
        textTransform: "capitalize",
        fontFamily: "sans-serif",
        marginVertical: 5,
        letterSpacing: 0.5,
    },
    classTeacherName: {
        textAlign: "center",
        fontWeight: "700",
        fontSize: 18,
        color: 'white',
        textTransform: "capitalize",
        fontFamily: "sans-serif",
        marginTop: 10,
    },
    tabTitle1: {
        letterSpacing: 0.2,
        fontSize: 14,
        fontWeight: "600",
        textTransform: "capitalize",
        color: "red"
    },
    tabTitle2: {
        letterSpacing: 0.2,
        fontSize: 14,
        fontWeight: "600",
        textTransform: "capitalize",
        color: "white"
    },
    tabStyle1: {
        padding: 0,
        backgroundColor: "white",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    tabStyle2: {
        paddingVertical: 5,
        paddingHorizontal: 0,
    },
    tabStyle3: {
        paddingVertical: 5,
        paddingHorizontal: -5,
        backgroundColor: "white",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    tabStyle4: {
        paddingVertical: 0,
        paddingHorizontal: 0,
    },
    container: {
        paddingHorizontal: windowWidth * 0.05,
        backgroundColor: "transparent"
    },
    banner: {
        width: windowWidth,
        height: "auto",
        paddingVertical: 15
    }
})

