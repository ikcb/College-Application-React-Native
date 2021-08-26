import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, ScrollView, FlatList } from 'react-native'
import { Header, Icon, ListItem, SearchBar, Overlay } from 'react-native-elements'
import { useSelector, useDispatch } from 'react-redux';
import { EbooksTab, ExtraTab, NotesTab, RecordingTab, CoursesTab } from "../components/Resources"
import axios from "axios"
import { windowWidth, windowHeight, filterData } from "../constants/Constants"
import { setEbook, setUdemyCourses, setNotes, setExtra, setRecordings } from '../reduxConfig/actions';
import { tempData } from '../reduxConfig/reducers';

export default function ResourcesScreen() {
    const { ebooks, notes, recordings, extras, udemyCourses } = useSelector((state) => state);
    const dispatch = useDispatch();

    //Local States
    const [index, setIndex] = useState(0)
    const [text, setText] = useState('')
    const [search, setSearch] = useState(false)
    const [filter, setFilter] = useState(false)

    const renderTab = () => {
        switch (index) {
            case 0: return <NotesTab data={notes} text={text} search={search} filter={filter} />;
            case 1: return <EbooksTab data={ebooks} text={text} search={search} filter={filter} />;
            case 2: return <RecordingTab data={recordings} text={text} search={search} filter={filter} />;
            case 3: return <CoursesTab data={udemyCourses} text={text} search={search} filter={filter} />;
            case 4: return <ExtraTab data={extras} text={text} search={search} filter={filter} />;
        }
    }

    const getBooks = async () => {
        console.log("Get Resources");
        await axios.get('https://backend-clg-app.herokuapp.com/resources/ebooks/')
            .then(response => response.data.length >= 1 ? dispatch(setEbook(response.data)) : dispatch(setEbook(tempData)));
        await axios.get('https://backend-clg-app.herokuapp.com/resources/videos/')
            .then(response => response.data.length >= 1 ? dispatch(setRecordings(response.data)) : dispatch(setRecordings(tempData)));
        await axios.get('https://backend-clg-app.herokuapp.com/resources/notes/')
            .then(response => response.data.length >= 1 ? dispatch(setNotes(response.data)) : dispatch(setNotes(tempData)));
        await axios.get('https://backend-clg-app.herokuapp.com/resources/courses/')
            .then(response => response.data.length >= 1 ? dispatch(setUdemyCourses(response.data)) : dispatch(setUdemyCourses(tempData)));
        // await axios.get('https://backend-clg-app.herokuapp.com/resources/extras/')
        //     .then(response => response.data.length >= 1 ? dispatch(setExtra(response.data)) : dispatch(setExtra(tempData)));
    }

    useEffect(() => {
        getBooks()
    }, [])

    return (
        <>
            <View>
                <Overlay overlayStyle={{ justifyContent: "center", marginVertical: 140 }} isVisible={filter} onBackdropPress={() => setFilter(false)}>
                    <FlatList
                        style={{
                            width: windowWidth / 1.5,
                            height: windowHeight / 2,
                        }}
                        data={filterData}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {
                            return <ListItem
                                bottomDivider={filterData.length - 1 === index ? false : true}
                                topDivider={0 === index ? false : true}
                                onPress={() => {
                                    setText(item.text)
                                    setFilter(false)
                                }}>
                                <ListItem.Content>
                                    <ListItem.Title style={styles.filterText}>
                                        {item.name}
                                    </ListItem.Title>
                                </ListItem.Content>
                            </ListItem>
                        }}
                    />
                </Overlay>
                <Header
                    barStyle={'dark-content'}
                    backgroundColor="white"
                    containerStyle={{ backgroundColor: "white", borderBottomColor: "white" }}
                    rightContainerStyle={{ paddingRight: 5, paddingTop: 5 }}
                    rightComponent={!search ? <Icon
                        name='filter'
                        type='font-awesome'
                        color='black'
                        size={26}
                        onPress={() => setFilter(!filter)} /> : null}
                    leftContainerStyle={{ paddingLeft: 5, paddingTop: 5 }}
                    leftComponent={!filter ? <Icon
                        name='search'
                        type='font-awesome'
                        color='black'
                        size={26}
                        onPress={() => { setSearch(!search), setText('') }} /> : null}

                    centerComponent={{ text: 'RESOURCES', style: { fontWeight: "600", color: 'black', fontSize: 24, letterSpacing: 1 } }}
                />
                {search ? <SearchBar
                    placeholder="Type Here..."
                    onChangeText={setText}
                    value={text}
                    round
                    containerStyle={{ backgroundColor: "white", paddingHorizontal: 10, paddingVertical: 0 }}
                    inputContainerStyle={{ backgroundColor: "white" }}
                    placeholderTextColor="black"
                    inputStyle={{ color: "black" }}
                    onClear={() => setSearch(false)}
                    cancelIcon
                    lightTheme
                /> : null}

                <ScrollView showsHorizontalScrollIndicator={false} horizontal style={styles.tab}>
                    <Text style={[styles.tabElement, { borderBottomWidth: index == 0 ? 2.2 : 0 }]} onPress={() => setIndex(0)}>Notes</Text>
                    <Text style={[styles.tabElement, { borderBottomWidth: index == 1 ? 2.2 : 0 }]} onPress={() => setIndex(1)}>Ebooks</Text>
                    <Text style={[styles.tabElement, { borderBottomWidth: index == 2 ? 2.2 : 0 }]} onPress={() => setIndex(2)}>Recordings</Text>
                    <Text style={[styles.tabElement, { borderBottomWidth: index == 3 ? 2.2 : 0 }]} onPress={() => setIndex(3)}>Courses</Text>
                    <Text style={[styles.tabElement, { borderBottomWidth: index == 4 ? 2.2 : 0 }]} onPress={() => setIndex(4)}>Extras</Text>
                </ScrollView>
            </View>
            {
                renderTab()
            }
        </>
    )
}

const styles = StyleSheet.create({
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
    filterText: {
        fontSize: 20,
    }
})