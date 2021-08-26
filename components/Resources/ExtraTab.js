import React, { useEffect, useState } from 'react'
import { View, UIManager, LayoutAnimation, StyleSheet, TouchableWithoutFeedback, Image, Linking, FlatList } from 'react-native'
import { ListItem } from 'react-native-elements'
import { useDispatch } from 'react-redux';
import { setExtra } from '../../reduxConfig/actions';
import axios from "axios"

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

export default function RecordingTab({ data, text, search }) {
    const [current, setcurrent] = useState(-1)
    const [newData, setnewData] = useState(data)
    const [refresh, setRefresh] = useState(false)
    const dispatch = useDispatch();

    const setFilters = () => {
        const tempData = data.filter((item) => {
            return item.Subject_Code.toLowerCase().includes(text.toLowerCase())
        })
        setnewData(tempData)
    }
    const setSearch = () => {
        const tempData = data.filter((item) => {
            return item.Message.toLowerCase().includes(text.toLowerCase())
        })
        setnewData(tempData)
    }
    const getNotes = async () => {
        await axios.get('https://backend-clg-app.herokuapp.com/resources/extras/')
            .then(response => response.data.length > 0 ? dispatch(setExtra(response.data)) : null);
        setRefresh(false)
    }

    useEffect(() => {
        if (data && search)
            setSearch()
        else if (data)
            setFilters()
    }, [text, search])

    useEffect(() => {
        if (data)
            setnewData(data)
    }, [data])

    const handleRefresh = () => {
        setRefresh(true)
        // getNotes()
    }

    if (!newData) {
        return (
            <View style={{ justifyContent: 'center', alignItems: "center", backgroundColor: "transparent", paddingTop: 100 }}>
                <Image source={require("../../assets/load2.gif")} style={{ width: 150, height: 150 }} />
            </View>
        )
    }
    return <FlatList
        refreshing={refresh}
        onRefresh={handleRefresh}
        style={{ backgroundColor: "white" }}
        showsVerticalScrollIndicator={false}
        data={newData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
            const time = new Date(item.Post_Time).toDateString()
            return (
                <TouchableWithoutFeedback
                    key={index}
                    onPress={() => {
                        current != index ? setcurrent(index) : setcurrent(-1)
                        LayoutAnimation.configureNext(LayoutAnimation.create(100, 'easeInEaseOut', 'opacity'));
                    }}>
                    <View>
                        <ListItem key={index} bottomDivider >
                            <ListItem.Content >
                                <ListItem.Title style={styles.paraStyle}>
                                    {item.Subject_Code}
                                </ListItem.Title>
                                <ListItem.Title style={styles.date}>
                                    {time}
                                </ListItem.Title>
                                <ListItem.Title style={styles.text}>
                                    {item.Message}
                                </ListItem.Title>
                                {current == index
                                    ?
                                    <ListItem.Title
                                        onPress={() => Linking.openURL(item.Url)} style={styles.link}
                                    >
                                        {item.Url}
                                    </ListItem.Title>
                                    :
                                    null
                                }
                            </ListItem.Content>
                        </ListItem>
                    </View>
                </TouchableWithoutFeedback>
            )
        }
        }
        ListFooterComponent={<View style={{ paddingBottom: 70 }}></View>}
    />

}


const styles = StyleSheet.create({
    paraStyle: {
        color: "black",
        fontSize: 20,
        fontFamily: "sans-serif",
        letterSpacing: 1,
        fontWeight: '700'
    },
    date: {
        color: "black",
        fontSize: 18,
        fontFamily: "sans-serif",
        letterSpacing: 1,
        fontWeight: '600'
    },
    text: {
        fontWeight: '600',
        fontSize: 16,
        height: "auto",
        fontFamily: "sans-serif",
        letterSpacing: 1,
    },
    link: {
        fontWeight: '600',
        fontSize: 16,
        fontFamily: "sans-serif",
        letterSpacing: 1,
        color: "blue"
    },
})

