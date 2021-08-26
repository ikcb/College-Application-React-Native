//Import
import React, { useEffect, useRef, useState } from 'react'
import { View, Image, Animated, ActivityIndicator, RefreshControl } from 'react-native'
import { Header, Icon } from 'react-native-elements'
import axios from "axios"
import { windowWidth } from "../constants/Constants"
import ContestBox from '../components/ContestBox'
import HackathonBox from '../components/HackathonBox'
import { setContestList, setHackathonsList } from "../reduxConfig/actions";
import { useSelector, useDispatch } from 'react-redux';

//Default Function
export default function ContestScreen() {

    //Redux
    const { contests, hackathons } = useSelector((state) => state);
    const dispatch = useDispatch();

    //Animate
    const scrollY = useRef(new Animated.Value(0)).current
    const [refresh, setRefresh] = useState(false)
    const [refresh1, setRefresh1] = useState(true)
    const [pgNum, setpgNum] = useState(2)
    const [change, setChange] = useState(true)

    //Api Contest
    const getList = async () => {
        axios.get(`https://backend-clg-app.herokuapp.com/cp_reminder?pg=1`).
            then((data) => {
                dispatch(setContestList(data.data.contest))
                setTimeout(() => {
                    setRefresh(false)
                }, 100);
            })
    }

    const getHackathons = async () => {
        axios.get(`https://backend-clg-app.herokuapp.com/hackathons?pg=1`).
            then((data) => {
                dispatch(setHackathonsList(data.data.contest))
                setTimeout(() => {
                    setRefresh(false)
                }, 100);
            })
    }

    //Api Contest
    const getExtraList = async () => {
        if (pgNum != -1)
            axios.get(`https://backend-clg-app.herokuapp.com/cp_reminder?pg=${pgNum}`).then((data) => {
                let arr = contests.concat(data.data.contest)
                dispatch(setContestList(arr))
                if (pgNum >= data.data.maxPages) setpgNum(-1)
                setRefresh1(false)
                setTimeout(() => {
                    setRefresh1(true)
                }, 100);
            })
        else
            setRefresh1(false)
    }

    const getExtraHackthonList = async () => {
        if (pgNum != -1)
            axios.get(`https://backend-clg-app.herokuapp.com/hackathons?pg=${pgNum}`).then((data) => {
                let arr = hackathons.concat(data.data.contest)
                dispatch(setHackathonsList(arr))
                if (pgNum >= data.data.maxPages) setpgNum(-1)
                setRefresh1(false)
                setTimeout(() => {
                    setRefresh1(true)
                }, 100);
            })
        else
            setRefresh1(false)
    }

    useEffect(() => {
        if (change)
            getExtraHackthonList()
        else
            getExtraList()
    }, [pgNum])

    useEffect(() => {
        getList()
        getHackathons()
    }, [])

    //Refresh Function
    const handleRefresh = () => {
        setRefresh(true)
        if (change)
            getHackathons()
        else
            getList()
    }

    const returnHackathon = () => {
        return <Animated.FlatList
            refreshControl={
                <RefreshControl
                    refreshing={refS}
                    onRefresh={handleRefresh} />}
            onScroll={
                Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
            data={hackathons}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={() => pgNum != -1 ? setpgNum(pgNum + 1) : setRefresh1(false)}
            onEndReachedThreshold={0.7}
            ListHeaderComponent={refresh && !refresh1 ? <View style={{ justifyContent: 'center', alignItems: "center" }}>
                <Image source={require("../assets/load2.gif")} style={{ width: 100, height: 100 }} />
            </View> : null}
            renderItem={({ item, index }) => {
                const inputRange = [
                    -1,
                    0,
                    index * (windowWidth / 2.3 + 10),
                    (index + 2) * (windowWidth / 2.3 + 10),
                ]
                const scale = scrollY.interpolate({
                    inputRange,
                    outputRange: [1, 1, 1, 0]
                })

                return (
                    <Animated.View
                        style={{
                            flex: 1, justifyContent: 'center',
                            alignItems: 'center',
                            transform: [{ scale }]
                        }}>
                        <HackathonBox
                            name={item.name}
                            site={item.site}
                            desc={item.desc}
                            reg_start={item.reg_start}
                            reg_end={item.reg_end}
                            host={item.host}
                            index={index}
                        />
                    </Animated.View>)
            }}
            ListFooterComponent={refresh1 && !refresh ? <View style={{ justifyContent: 'center', alignItems: "center", }}>
                <Image source={require("../assets/load2.gif")} style={{ width: 100, height: 100 }} />
                <View style={{ paddingBottom: 70, backgroundColor: "transparent" }}></View>
            </View> : <View style={{ paddingBottom: 70, backgroundColor: "transparent" }}></View>}
        />
    }

    const returnContest = () => {
        return <Animated.FlatList
            refreshControl={
                <RefreshControl
                    refreshing={refS}
                    onRefresh={handleRefresh} />}
            onScroll={
                Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
            data={contests}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={() => pgNum != -1 ? setpgNum(pgNum + 1) : setRefresh1(false)}
            onEndReachedThreshold={0.7}
            ListHeaderComponent={refresh && !refresh1 ? <View style={{ justifyContent: 'center', alignItems: "center" }}>
                <Image source={require("../assets/load2.gif")} style={{ width: 100, height: 100 }} />
            </View> : null}
            renderItem={({ item, index }) => {
                const inputRange = [
                    -1,
                    0,
                    index * (windowWidth / 2.3 + 10),
                    (index + 2) * (windowWidth / 2.3 + 10),
                ]
                const scale = scrollY.interpolate({
                    inputRange,
                    outputRange: [1, 1, 1, 0]
                })

                return (
                    <Animated.View
                        style={{
                            flex: 1, justifyContent: 'center',
                            alignItems: 'center',
                            transform: [{ scale }]
                        }}>
                        <ContestBox
                            name={item.event_name}
                            duration={item.duration}
                            time={item.start_time}
                            source={item.resource_website}
                            url={item.contest_url}
                            index={index}
                        />
                    </Animated.View>)
            }}
            ListFooterComponent={refresh1 && !refresh ? <View style={{ justifyContent: 'center', alignItems: "center", }}>
                <Image source={require("../assets/load2.gif")} style={{ width: 100, height: 100 }} />
                <View style={{ paddingBottom: 70, backgroundColor: "transparent" }}></View>
            </View> : <View style={{ paddingBottom: 70, backgroundColor: "transparent" }}></View>}
        />
    }

    const refS = false

    if (!contests)
        return (<>
            <View style={{ flex: 1 }}>
                <Header
                    barStyle={'dark-content'}
                    elevated
                    backgroundColor="white"
                    containerStyle={{ backgroundColor: "white" }}
                    centerComponent={{ text: 'CONTESTS', style: { fontWeight: "600", color: 'black', fontSize: 24, letterSpacing: 1 } }}
                />
                <ActivityIndicator style={{ flex: 1 }} size="large" color="#00ff00" />
            </View>
        </>)
    else
        return (
            <View style={{ flex: 1 }}>
                <Header
                    elevated
                    barStyle={'dark-content'}
                    backgroundColor="white"
                    containerStyle={{ backgroundColor: "white" }}
                    centerComponent={{ text: change ? 'CONTESTS' : 'HACKATHONS', style: { fontWeight: "600", color: 'black', fontSize: 24, letterSpacing: 1 } }}
                    rightContainerStyle={{ paddingRight: 5 }}
                    rightComponent={<Icon
                        name={change ? 'codesquareo' : 'codesquare'}
                        type='antdesign'
                        color='black'
                        size={30}
                        onPress={() => {
                            setChange(!change)
                            setpgNum(2)
                        }} />}
                />
                {change ? returnContest() : returnHackathon()}
            </View>
        )
}

