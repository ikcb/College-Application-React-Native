//Import
import React, { useState } from "react";
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    Linking,
} from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { ListItem, Icon } from 'react-native-elements'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { signOutWithGoogle } from "../reduxConfig/actions"
import { ToastAndroid } from "react-native";

//Export Function
export default function AboutTeam({ navigation }) {

    const { userInfo } = useSelector((state) => state);
    const dispatch = useDispatch();

    const [theme, settheme] = useState(false)
    const [notification, setnotification] = useState(true)

    //SignOut
    const signOut = async () => {
        console.log("Sign Out");
        try {
            await GoogleSignin.signOut();
            dispatch(signOutWithGoogle())
            navigation.navigate('Login')
        } catch (e) {
            console.log(`Failed to revoke token: ${e.message}`);
            dispatch(signOutWithGoogle())
            navigation.navigate('Login')
        }
    };

    //Main Function
    if (!userInfo)
        return null

    return (
        <ScrollView>
            <View style={{
                paddingTop: 20,
                flex: 1,
                backgroundColor: "transparent",
                justifyContent: "center",
                paddingHorizontal: 20
            }}>
                <Text style={styles.textStart}>Account</Text>
                <View style={styles.containerBox}>
                    <ListItem >
                        <Icon
                            name='user-circle-o'
                            type='font-awesome'
                            color='#f50'
                        />
                        <ListItem.Content>
                            <ListItem.Title style={styles.title}>{userInfo.name}</ListItem.Title>
                            <ListItem.Subtitle style={styles.subtitle}>{userInfo.email}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                </View>
                <View style={styles.spacer} />
                <Text style={styles.textStart}>App Settings</Text>
                <View style={styles.containerBox}>
                    <ListItem bottomDivider onPress={() => {
                        ToastAndroid.showWithGravityAndOffset(
                            "Work is Going on Notifications!",
                            ToastAndroid.SHORT,
                            ToastAndroid.BOTTOM,
                            0,
                            100
                        );
                        setnotification(!notification)
                    }}>
                        <Icon
                            name='bell'
                            type='font-awesome'
                            color='#f50'
                        />
                        <ListItem.Content >
                            <ListItem.Title style={styles.title}>Notifications</ListItem.Title>
                            <ListItem.Subtitle style={styles.subtitle}>{notification ? "ON" : "OFF"}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                    <ListItem onPress={() => {
                        ToastAndroid.showWithGravityAndOffset(
                            "Work is Going on Dark Theme!",
                            ToastAndroid.SHORT,
                            ToastAndroid.BOTTOM,
                            0,
                            100
                        );
                        settheme(!theme)
                    }}>
                        <Icon
                            name='moon-o'
                            type='font-awesome'
                            color='#f50'
                        />
                        <ListItem.Content >
                            <ListItem.Title style={styles.title}>Dark Theme</ListItem.Title>
                            <ListItem.Subtitle style={styles.subtitle}>{theme ? "ON" : "OFF"}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                </View>
                <View style={styles.spacer} />
                <Text style={styles.textStart}>About</Text>
                <View style={styles.containerBox}>
                    <ListItem
                        bottomDivider
                        onPress={() => navigation.navigate("Team")}
                        onLongPress={() => navigation.navigate("Admin")}
                        style={styles.listItem}
                    >
                        <Icon
                            name='users'
                            type='font-awesome'
                            color='#f50'
                        />
                        <ListItem.Content >
                            <ListItem.Title style={styles.title}>About Team</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                    <ListItem onPress={() => navigation.navigate("Author")}>
                        <Icon
                            name='user'
                            type='font-awesome'
                            color='#f50'
                        />
                        <ListItem.Content >
                            <ListItem.Title style={styles.title}>About Author</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                </View>
                <View style={styles.spacer} />
                <Text style={styles.textStart}>Support</Text>
                <View style={styles.containerBox}>
                    <ListItem bottomDivider onPress={() => Linking.openURL("https://acadhere.vercel.app/acadhere/faq")}>
                        <Icon
                            name='question-circle'
                            type='font-awesome'
                            color='#f50'
                        />
                        <ListItem.Content >
                            <ListItem.Title style={styles.title}>FAQ</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                    <ListItem bottomDivider onPress={() => Linking.openURL("mailto:2020kucp1138@iiitkota.ac.in")}>
                        <Icon
                            name='envelope-o'
                            type='font-awesome'
                            color='#f50'
                        />
                        <ListItem.Content >
                            <ListItem.Title style={styles.title}>Contact Us</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                    <ListItem onPress={signOut}>
                        <Icon
                            name='sign-out'
                            type='font-awesome'
                            color='#f50'
                        />
                        <ListItem.Content >
                            <ListItem.Title style={styles.title}>Sign Out</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                </View>
                <View style={styles.spacer} />
            </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    listItem: {
        width: '100%',
        borderRadius: 10,

    },
    containerBox: {
        borderWidth: 2,
        backgroundColor: "white",
        elevation: 4,
        borderColor: "white",
        marginBottom: 10,
        borderRadius: 15,
        overflow: "hidden"
    },
    textStart: {
        fontSize: 16,
        fontFamily: "sans-serif",
        fontWeight: "600",
        letterSpacing: 0.2,
        marginBottom: 5,
        color: "black"
    },
    title: {
        fontSize: 16,
        fontFamily: "sans-serif",
        fontWeight: "600",
        letterSpacing: 0.2,
        color: "black"
    },
    spacer: {
        marginVertical: 5
    },
    subtitles: {
        fontSize: 15,
        fontFamily: "sans-serif",
        fontWeight: "600",
        letterSpacing: 0.2,
        color: "grey"
    },
});