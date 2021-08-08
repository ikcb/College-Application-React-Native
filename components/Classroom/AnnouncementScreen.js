import React, { useState } from 'react'
import { View, UIManager, LayoutAnimation, StyleSheet, TouchableWithoutFeedback, Linking, Image } from 'react-native'
import { ListItem } from 'react-native-elements'
import Autolink from 'react-native-autolink';

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

export default function AnnouncementScreen({ announce }) {
    const [current, setcurrent] = useState(-1)

    if (!announce) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: "center", backgroundColor: "transparent", paddingTop: 100 }}>
                <Image source={require("../../assets/load2.gif")} style={{ width: 100, height: 100 }} />
            </View>
        )
    }
    return <>
        {
            announce.map((item, index) => {
                const { materials } = item

                return (
                    <TouchableWithoutFeedback
                        key={index}
                        onPress={() => {
                            current != index ? setcurrent(index) : setcurrent(-1)
                            LayoutAnimation.configureNext(LayoutAnimation.create(100, 'easeInEaseOut', 'opacity'));
                        }}>
                        <View>
                            <ListItem key={index} bottomDivider >
                                <ListItem.Content>
                                    <ListItem.Title style={styles.date}>{item.announceMessage || `Date : ${item.creationTime.toLocaleString().slice(0, 10)}`}</ListItem.Title>
                                    <ListItem.Title selectable style={styles.text}>
                                        <Autolink linkStyle={{ color: 'blue' }} text={item.text.replace(/(\r?\n)\s*\1+/g, '$1\n').replace(/^ +/gm, '')} />
                                    </ListItem.Title>
                                    {materials ? <ListItem.Title style={styles.textMore}>
                                        Links Down
                                    </ListItem.Title> : null}
                                    {
                                        current === index
                                            ? <>
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
                                                    if (item.link) {
                                                        let link = item.link.url
                                                        return (
                                                            <View key={index}>
                                                                <ListItem.Title
                                                                    selectable style={styles.textForm}>
                                                                    {item.link.title || null}
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
    },
    textForm: {
        color: "black",
        fontSize: 16,
        fontFamily: "sans-serif",
        letterSpacing: 1,
        marginTop: 5,
        textTransform: 'capitalize'
    },
    date: {
        color: "red",
        fontSize: 18,
        fontFamily: "sans-serif",
        letterSpacing: 1,
        fontWeight: '700'
    },
    text: {
        fontWeight: '600',
        fontSize: 16,
        height: "auto",
        fontFamily: "sans-serif",
        letterSpacing: 1,
        textTransform: 'capitalize',
    },
    textMore: {
        fontWeight: '600',
        fontSize: 16,
        height: "auto",
        fontFamily: "sans-serif",
        letterSpacing: 1,
        textTransform: 'capitalize',
        color: "blue",
        marginVertical: 5
    }
})

