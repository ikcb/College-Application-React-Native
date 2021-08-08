import React, { useState } from 'react'
import { View, UIManager, LayoutAnimation, StyleSheet, TouchableWithoutFeedback, Linking, Image } from 'react-native'
import { ListItem } from 'react-native-elements'

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

export default function courseWorkMaterials({ courseworkmaterial }) {
    const [current, setcurrent] = useState(100)
    if (!courseworkmaterial)
        return (<View style={{ flex: 1, justifyContent: 'center', alignItems: "center", backgroundColor: "white", paddingTop: 100 }}>
            <Image source={require("../../assets/load2.gif")} style={{ width: 100, height: 100 }} />
        </View>)
    return <>
        {
            courseworkmaterial.map((item, index) => {
                const { materials } = item
                return (<TouchableWithoutFeedback
                    key={index}
                    onPress={() => {
                        current != index ? setcurrent(index) : setcurrent(-1)
                        LayoutAnimation.configureNext(LayoutAnimation.create(100, 'easeInEaseOut', 'opacity'));
                    }}>
                    <View>
                        <ListItem key={index} bottomDivider >
                            <ListItem.Content>
                                <ListItem.Title style={styles.date}>{item.CourseMaterialMessage || `Date : ${item.creationTime.toLocaleString().slice(0, 10)}`}</ListItem.Title>
                                <ListItem.Title style={styles.text}>{item.title}</ListItem.Title>
                                {materials ? <ListItem.Title style={styles.textMore}>
                                    Links Down
                                </ListItem.Title> : null}
                                {
                                    current === index
                                        ?
                                        <>
                                            {materials ? materials.map((item, index) => {
                                                let link = item.driveFile.driveFile.alternateLink
                                                return (
                                                    <View key={index}>
                                                        <ListItem.Title style={styles.textForm}>
                                                            {item.driveFile.driveFile.title || null}
                                                        </ListItem.Title>
                                                        <ListItem.Subtitle
                                                            style={styles.paraStyle}
                                                            onPress={() => Linking.openURL(link)}
                                                        >{link}
                                                        </ListItem.Subtitle>
                                                    </View>
                                                )
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
        fontSize: 16,
        fontFamily: "sans-serif",
        letterSpacing: 0.5,
        marginTop: 2
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
        fontFamily: "sans-serif",
        letterSpacing: 1,
        marginTop: 5,
        marginBottom: 10,
        textTransform: 'capitalize'
    },
    textForm: {
        marginTop: 5,
        fontWeight: '600',
        fontSize: 16,
        fontFamily: "sans-serif",
        letterSpacing: 0.5,
        textTransform: 'capitalize'
    },
    textMore: {
        fontWeight: '600',
        fontSize: 16,
        fontFamily: "sans-serif",
        letterSpacing: 1,
        textTransform: 'capitalize',
        color: "blue",
        marginVertical: 5
    }
})

