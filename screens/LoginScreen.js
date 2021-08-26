import React, { useEffect, useState } from 'react'
import {
    View,
    StyleSheet,
    ImageBackground,
    StatusBar,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native';
import { signInWithGoogle, setUserInfo, setHackathonsList, setCourseSubmissionData, setSubmissionData, setContestList, setCoursesList, setEbook, setUdemyCourses, setNotes, setExtra, setRecordings } from "../reduxConfig/actions"
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const scope = [
    'profile',
    'email',
    'openid',
    "https://www.googleapis.com/auth/classroom.announcements.readonly",
    "https://www.googleapis.com/auth/classroom.coursework.me.readonly",
    "https://www.googleapis.com/auth/classroom.courses.readonly",
    "https://www.googleapis.com/auth/classroom.coursework.students.readonly",
    "https://www.googleapis.com/auth/classroom.courseworkmaterials.readonly",
    "https://www.googleapis.com/auth/classroom.rosters.readonly"]

export default function LoginScreen({ navigation }) {
    //Redux
    const { authData, contests, userInfo, courses, courseSubData, submissionsData } = useSelector((state) => state);
    const dispatch = useDispatch();

    //Local State
    const [initializing, setInitializing] = useState(true);
    const [Load, setLoad] = useState(null)

    function onAuthStateChanged(user) {
        if (initializing) setInitializing(false);
    }

    //Sign IN
    async function onGoogleButtonPress() {
        console.log("Sign In")
        setLoad(true)
        try {
            await GoogleSignin.hasPlayServices();
            const currentUser = await GoogleSignin.signIn();
            dispatch(setUserInfo(currentUser.user));
        } catch (error) {
            console.log(error);
        }
    }

    //Load Class
    const loadClass = () => {
        console.log('Load Class')
        let webApiUrl = 'https://classroom.googleapis.com/v1/courses?courseStates=ACTIVE';
        axios.get(webApiUrl, { headers: { "Authorization": `Bearer ${authData}` } }).then(data => {
            dispatch(setCoursesList(data.data.courses))
        });
    }

    //Get Contest List
    const getList = () => {
        console.log('Load Contest');
        axios.get("https://backend-clg-app.herokuapp.com/cp_reminder?pg=1").
            then((data) => {
                dispatch(setContestList(data.data.contest));
            })
    }

    //Get Hackathons List
    const getHackathons = () => {
        console.log('Load Hackathons');
        axios.get(`https://backend-clg-app.herokuapp.com/hackathons?pg=1`).
            then((data) => {
                dispatch(setHackathonsList(data.data.contest))
            })
    }

    //Get Submission Data
    const getSubmissonData = () => {
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
            }).catch(err => console.log(err.message))
    }

    //Get Sub Data
    const getSubData = () => {
        console.log('Load course Submissions')
        const promises = []
        submissionsData.map(item => promises.push(axios.get(`https://classroom.googleapis.com/v1/courses/${item.courseId}/courseWork/${item.courseWorkId}`, { headers: { "Authorization": `Bearer ${authData}` } })))
        Promise.all(promises).then(data => {
            let arr = [];
            data.forEach(data => {
                arr = arr.concat(data.data)
            })
            dispatch(setCourseSubmissionData(arr))
        }).catch(err => console.log(err.message))
    }

    //Load resources
    const getBooks = async () => {
        console.log("Get Resources");
        await axios.get('https://backend-clg-app.herokuapp.com/resources/ebooks/')
            .then(response => response.data.length >= 1 ? dispatch(setEbook(response.data)) : null);
        await axios.get('https://backend-clg-app.herokuapp.com/resources/videos/')
            .then(response => response.data.length >= 1 ? dispatch(setRecordings(response.data)) : null);
        await axios.get('https://backend-clg-app.herokuapp.com/resources/notes/')
            .then(response => response.data.length >= 1 ? dispatch(setNotes(response.data)) : null);
        await axios.get('https://backend-clg-app.herokuapp.com/resources/courses/')
            .then(response => response.data.length >= 1 ? dispatch(setUdemyCourses(response.data)) : null);
        // await axios.get('https://backend-clg-app.herokuapp.com/resources/extras/')
        //     .then(response => response.data.length >= 1 ? dispatch(setExtra(response.data)) : null);
    }

    useEffect(() => {//3
        if (authData)
            loadClass()
    }, [authData])

    useEffect(() => {//4
        if (courses)
            getSubmissonData()
    }, [courses])

    useEffect(() => {//6
        if (submissionsData)
            getSubData()
    }, [submissionsData])

    useEffect(() => {//7
        if (authData && courses && contests && submissionsData && courseSubData) {
            navigation.navigate('MainTab')
            setLoad(false)
        }
    }, [courseSubData])

    useEffect(() => {//4
        if (submissionsData)
            getSubData()
    }, [submissionsData])

    useEffect(() => {//2
        if (userInfo) {
            //Get Access Token
            const getTokens = async () => {
                const { accessToken } = await GoogleSignin.getTokens();
                dispatch(signInWithGoogle(accessToken))
            }
            getTokens()
        }
    }, [userInfo])

    useEffect(() => {//1
        getList();
        getHackathons();
        getBooks();
        GoogleSignin.configure({
            scopes: scope,
            webClientId: '139665802954-sgtmunavh4r3kqd18eimggqriqdre6pd.apps.googleusercontent.com',
            offlineAccess: true,
        });
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);

    if (Load === true) {
        return (<View style={{ flex: 1, justifyContent: 'center', alignItems: "center", backgroundColor: "white" }}>
            <Image source={require("../assets/load2.gif")} style={{ width: 150, height: 150 }} />
            <Text style={{ textAlign: 'center', fontFamily: "sans-serif", fontSize: 24, fontWeight: "bold" }}>{userInfo ? 'Welcome,' : null}</Text>
            <Text style={{ textAlign: 'center', fontFamily: "sans-serif", fontSize: 24, fontWeight: "bold" }}>{userInfo ? userInfo.name : null}</Text>
        </View>)
    }
    else
        return (
            <View style={{ flex: 1 }}>
                <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
                <ImageBackground
                    style={{ flex: 1 }}
                    source={require('../assets/onboardImage.webp')}>
                    <View style={style.details}>
                        <Text style={{ color: 'white', fontSize: 35, fontWeight: 'bold', fontFamily: "sans-serif" }}>
                            Discover
                        </Text>
                        <Text style={{ color: 'white', fontSize: 35, fontWeight: 'bold', fontFamily: "sans-serif" }}>
                            world with us
                        </Text>
                        <Text style={{ color: 'white', lineHeight: 25, marginTop: 15, fontFamily: "sans-serif" }}>
                            Empowering students by creating solutions for tommorow's challenges. AcadHere provide an integrated place to manage all your classeswork, projects, and assignments so as to save your time from roaming on different platforms to get the information.
                        </Text>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={onGoogleButtonPress}>
                            <View style={style.btn}>
                                <Text style={{ fontWeight: 'bold' }}>Get Started</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        );
};

const style = StyleSheet.create({
    details: {
        height: '60%',
        bottom: 0,
        position: 'absolute',
        paddingHorizontal: 25,
    },
    btn: {
        height: 50,
        width: 120,
        backgroundColor: "white",
        marginTop: 20,
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
    },
});