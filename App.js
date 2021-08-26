//Imports
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen, ClassroomScreen, AboutScreen, ContestScreen, LoginScreen, NoticeScreen, ResourcesScreen } from "./screens"
import CourseScreen from './components/Classroom/CourseScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import reduxStore from './reduxConfig/reduxStore';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { useSelector } from 'react-redux';
import NoticeDetailScreen from './components/Notice/NoticeDetailScreen';
import NoticeEditScreen from './components/Notice/NoticeEditScreen';
import AboutTeam from './components/About/AboutTeam';
import AboutAuthor from './components/About/AboutAuthor';
import Admin from './components/About/Admin';
import codePush from 'react-native-code-push';
import { windowWidth, windowHeight } from "./constants/Constants"
import LottieView from 'lottie-react-native';
import RNBootSplash from "react-native-bootsplash";
import PushNotification, { Importance } from 'react-native-push-notification';
import { StatusBar } from 'react-native';

//HomeStack
const HomeStack = createStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen name="Home" component={HomeScreen} />
    </HomeStack.Navigator>
  );
}

//NoticeStack
const NoticeStack = createStackNavigator();
function NoticeStackScreen() {
  return (
    <NoticeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <NoticeStack.Screen name="Notice" component={NoticeScreen} />
      <NoticeStack.Screen name="NoticeDetailScreen" component={NoticeDetailScreen} />
      <NoticeStack.Screen name="NoticeEditScreen" component={NoticeEditScreen} />
    </NoticeStack.Navigator>
  );
}

//ContestStack
const ContestStack = createStackNavigator();
function ContestStackScreen() {
  return (
    <ContestStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <ContestStack.Screen name="Contests" component={ContestScreen} />
    </ContestStack.Navigator>
  );
}

//ClassroomStack
const ClassroomStack = createStackNavigator();
function ClassroomStackScreen() {
  return (
    <ClassroomStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <ClassroomStack.Screen name="ClassroomScreen" component={ClassroomScreen} />
      <ClassroomStack.Screen name="CourseScreen" component={CourseScreen} />
    </ClassroomStack.Navigator>
  );
}

//ResourceStack
const ResourcesStack = createStackNavigator();
function ResourcesStackScreen() {
  return (
    <ResourcesStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <ResourcesStack.Screen name="Resources" component={ResourcesScreen} />
    </ResourcesStack.Navigator>
  );
}

//AboutStack
const AboutStack = createStackNavigator();
function AboutStackScreen() {
  return (
    <AboutStack.Navigator
      screenOptions={{
        headerStyle: {
          elevation: 20
        },
        headerTitleStyle: {
          fontWeight: "600",
          fontSize: 20
        }
      }}>
      <AboutStack.Screen options={{ title: "Settings", headerTitleAlign: "center", headerTitleStyle: { fontSize: 24 } }} name="Settings" component={AboutScreen} />
      <AboutStack.Screen options={{ title: "Team" }} name="Team" component={AboutTeam} />
      <AboutStack.Screen options={{ title: "Author" }} name="Author" component={AboutAuthor} />
      <AboutStack.Screen options={{ title: "Admin" }} name="Admin" component={Admin} />
    </AboutStack.Navigator>
  );
}

//Bottom Tab Navigator
const Tab = createBottomTabNavigator();
function MainTabScreen() {
  const [color, setcolor] = useState('white')
  return (
    <Tab.Navigator
      detachInactiveScreens={true}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
        showLabel: false,
        style: {
          backgroundColor: color,
          position: 'absolute',
          bottom: 10,
          marginHorizontal: 20,
          height: 60,
          borderRadius: 20,
          shadowColor: '#000',
          shadowOpacity: 0.06,
          shadowOffset: {
            width: 10,
            height: 10
          },
          paddingHorizontal: 15,
        }
      }}
    >
      <Tab.Screen options={{
        tabBarIcon: ({ focused, size }) => {
          // focused ? setcolor('red') : null
          return (
            <FontAwesome
              style={[{
                borderBottomWidth: 2, padding: 5,
                borderColor: focused ? 'red' : "white"
              }]}
              name="home"
              size={size}
              color={focused ? 'tomato' : '#C0C0C0'}
            />
          )
        }
      }} name="Home" component={HomeStackScreen} />
      <Tab.Screen options={{
        tabBarIcon: ({ focused, size }) => {
          // focused ? setcolor('pink') : null
          return (
            <FontAwesome
              style={[{
                borderBottomWidth: 2, padding: 5,
                borderColor: focused ? 'red' : "white"
              }]}
              name="bell"
              size={size}
              color={focused ? 'tomato' : '#C0C0C0'}
            />
          )
        }
      }} name="Notices" component={NoticeStackScreen} />
      <Tab.Screen options={{
        tabBarIcon: ({ focused, size }) => {
          // focused ? setcolor('yellow') : null
          return (
            <MaterialCommunityIcons
              style={[{
                borderBottomWidth: 2, padding: 5,
                borderColor: focused ? 'red' : "white"
              }]}
              name="google-classroom"
              size={size}
              color={focused ? 'tomato' : '#C0C0C0'}
            />
          )
        }
      }} name="Classroom" component={ClassroomStackScreen} />
      <Tab.Screen options={{
        tabBarIcon: ({ focused, size }) => {
          // focused ? setcolor('yellow') : null
          return (
            <FontAwesome
              style={[{
                borderBottomWidth: 2, padding: 5,
                borderColor: focused ? 'red' : "white"
              }]}
              name="calendar"
              size={size}
              color={focused ? 'tomato' : '#C0C0C0'}
            />
          )
        }
      }} name="Contest" component={ContestStackScreen} />
      <Tab.Screen options={{
        tabBarIcon: ({ focused, size }) => {
          // focused ? setcolor('yellow') : null
          return (
            <FontAwesome
              style={[{
                borderBottomWidth: 2, padding: 5,
                borderColor: focused ? 'red' : "white"
              }]}
              name="book"
              size={size}
              color={focused ? 'tomato' : '#C0C0C0'}
            />
          )
        }
      }} name="Resources" component={ResourcesStackScreen} />
    </Tab.Navigator>
  )
}

//LoginStack
const LoginStack = createStackNavigator();
function Navigation() {
  const [Load, setLoad] = useState(true)
  const { authData, courses, contests, courseSubData, submissionsData } = useSelector((state) => state);

  const LoaderScreen = () => {
    return <>
      <StatusBar hidden={true} />
      <LottieView
        style={{ flex: 1, width: windowWidth, height: windowHeight }}
        source={require('./assets/splash.json')}
        autoPlay
        loop={false}
        onAnimationFinish={() => setLoad(false)}
      />
    </>
  }

  return (<NavigationContainer>
    <LoginStack.Navigator
      detachInactiveScreens={true}
      initialRouteName={authData && courses && contests && submissionsData && courseSubData ? 'MainTab' : 'Login'}
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <LoginStack.Screen name="Login" component={Load ? LoaderScreen : LoginScreen} />
      <LoginStack.Screen name="MainTab" component={MainTabScreen} />
      <LoginStack.Screen name="About" component={AboutStackScreen} />
    </LoginStack.Navigator>
  </NavigationContainer>);
}

//App Function
function App() {
  const { store, persistor } = reduxStore();

  const createChannel = () => {
    PushNotification.createChannel(
      {
        channelId: "Notify",
        channelName: "Notify channel",
        importance: Importance.HIGH,
        vibrate: true,
        vibration: 300,
        soundName: 'sound.mp3',
      }
    ), (created) => console.log(`createChannel returned '${created}'`);
  }

  useEffect(() => {
    RNBootSplash.hide();
    createChannel();
  }, [])

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigation />
      </PersistGate>
    </Provider>
  );
}

//Default App Export
export default codePush(App);
// export default App;


// appcenter codepush release-react -a MrMischievousX/AcadHere