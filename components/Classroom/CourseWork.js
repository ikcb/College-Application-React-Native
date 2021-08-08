import React, { useState } from 'react'
import { Text, View, UIManager, LayoutAnimation, StyleSheet, TouchableWithoutFeedback, Linking, Image } from 'react-native'
import { ListItem } from 'react-native-elements'

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

export default function CourseWork({ coursework, courseWorkSub }) {
    const [current, setcurrent] = useState(100)
    if (!coursework && !courseWorkSub)
        return (<View style={{ flex: 1, justifyContent: 'center', alignItems: "center", backgroundColor: "white", paddingTop: 100 }}>
            <Image source={require("../../assets/load2.gif")} style={{ width: 100, height: 100 }} />
        </View>)
    return <>
        {
            coursework.map((item, index) => {
                const { materials } = item
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

                return (
                    <TouchableWithoutFeedback
                        key={index}
                        onPress={() => {
                            current != index ? setcurrent(index) : setcurrent(-1)
                            LayoutAnimation.configureNext(LayoutAnimation.create(100, 'easeInEaseOut', 'opacity'));
                        }}>
                        <View>
                            <ListItem key={index} bottomDivider>
                                <ListItem.Content>
                                    <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between', alignItems: "center" }}>
                                        <ListItem.Title style={styles.date}>{item.announceMessage || `Date : ${item.creationTime.toLocaleString().slice(0, 10)}`}</ListItem.Title>
                                        <ListItem.Title style={styles.date}>{item.course}</ListItem.Title>
                                        <ListItem.Title onPress={() => Linking.openURL(item.alternateLink)} style={styles.assign}>{item.workType || null}</ListItem.Title>
                                    </View>

                                    <ListItem.Title style={styles.text}>{item.title}</ListItem.Title>

                                    {item.maxPoints ? <ListItem.Title style={styles.textPoint}>{`Max Points : ${item.maxPoints || 0}`}</ListItem.Title> : null}

                                    {
                                        item.dueTime && item.dueDate ? <>
                                            <ListItem.Title style={styles.textPoint}>{`Submission Day : ${subDate.date}`}
                                            </ListItem.Title>
                                            <ListItem.Title style={styles.textPoint}>{`Submission Time : ${subDate.time}`}
                                            </ListItem.Title>
                                        </> : null}

                                    {courseWorkSub[index].state ? <ListItem.Title style={styles.submissionTxt}>Status : <ListItem.Title style={[styles.submission, courseWorkSub[index].state === "TURNED_IN" || courseWorkSub[index].state === "RETURNED" ? { color: "#4BB543" } : { color: "red" }]}>{courseWorkSub[index].state}</ListItem.Title></ListItem.Title> : null}
                                    {materials ? <ListItem.Title style={styles.textMore}>
                                        Links Down
                                    </ListItem.Title> : null}
                                    {
                                        current === index
                                            ?
                                            <>
                                                {item.description ? <ListItem.Title selectable style={styles.textIns}>{item.description.replace(/(\r?\n)\s*\1+/g, '$1\n')}</ListItem.Title> : null}
                                                {materials ? materials.map((item, index) => {
                                                    if (item.driveFile) {
                                                        let link = item.driveFile.driveFile.alternateLink
                                                        return (
                                                            <View key={index}>
                                                                <ListItem.Subtitle
                                                                    selectable
                                                                    style={styles.paraStyle}
                                                                    onPress={() => Linking.openURL(link)}
                                                                >{link}
                                                                </ListItem.Subtitle>
                                                            </View>
                                                        )
                                                    }
                                                    if (item.form) {
                                                        let link = item.form.formUrl
                                                        return (
                                                            <View key={index}>
                                                                <ListItem.Title
                                                                    selectable style={styles.textForm}>
                                                                    {item.form.title || null}
                                                                </ListItem.Title>
                                                                <ListItem.Subtitle
                                                                    selectable
                                                                    style={styles.paraStyle}
                                                                    onPress={() => Linking.openURL(link)}
                                                                >{link}
                                                                </ListItem.Subtitle>
                                                            </View>
                                                        )
                                                    }
                                                    return null
                                                }) : null}
                                            </>
                                            : null
                                    }
                                </ListItem.Content>
                            </ListItem>
                        </View>
                    </TouchableWithoutFeedback>
                )
            })
        }
    </>



}

const styles = StyleSheet.create({
    paraStyle: {
        color: "blue",
        fontSize: 14,
        fontFamily: "sans-serif",
        letterSpacing: 1,
        marginTop: 10
    },
    date: {
        color: "red",
        fontSize: 18,
        fontFamily: "sans-serif",
        letterSpacing: 1,
        fontWeight: '700'
    },
    assign: {
        color: "blue",
        fontSize: 12,
        fontFamily: "sans-serif",
        fontWeight: '700'
    },
    text: {
        fontWeight: '600',
        fontSize: 16,
        fontFamily: "sans-serif",
        letterSpacing: 1,
        marginTop: 5,
    },
    submission: {
        fontWeight: '700',
        fontSize: 18,
        textTransform: "capitalize",
        fontFamily: "sans-serif",
        letterSpacing: 1,
        marginTop: 5,
    },
    submissionTxt: {
        fontWeight: '600',
        fontSize: 18,
        textTransform: "capitalize",
        fontFamily: "sans-serif",
        letterSpacing: 1,
        marginTop: 5,
    },
    textPoint: {
        fontWeight: '600',
        fontSize: 16,
        fontFamily: "sans-serif",
        letterSpacing: 1,
    },
    textIns: {
        marginTop: 20,
        fontWeight: '600',
        fontSize: 16,
        fontFamily: "sans-serif",
        letterSpacing: 1,
    },
    textForm: {
        marginTop: 5,
        fontWeight: '600',
        fontSize: 16,
        fontFamily: "sans-serif",
        letterSpacing: 1,
    },
    textMore: {
        fontWeight: '600',
        fontSize: 16,
        fontFamily: "sans-serif",
        letterSpacing: 1,
        textTransform: 'capitalize',
        color: "blue",
        marginTop: 5
    }
})

