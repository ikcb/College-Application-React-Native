import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const COLORS = ["rgb(83,171,232)", "forestgreen", "rgb(137,122,239)", "navy", "blue"]
const COLORS2 = ["red", "#FF6701", "green", "#C449C2", "cyan", "#28FFBF",]
const classbg = [
    require('../assets/classBg1.webp'),
    require('../assets/classBg2.webp'),
    require('../assets/classBg3.webp'),
    require('../assets/classBg4.webp'),
    require('../assets/classBg5.webp'),
    require('../assets/classBg6.webp'),
    require('../assets/classBg7.webp'),
    require('../assets/classBg8.webp'),
]
const filterData = [
    {
        name: "ALL",
        text: ""
    },
    {
        name: "MAT",
        text: "MAT"
    },
    {
        name: "ECT",
        text: "ECT"
    },
    {
        name: "CST",
        text: "CST"
    },
    {
        name: "HST",
        text: "HST"
    },
    {
        name: "MAT101",
        text: "MAT101"
    },
    {
        name: "ECT101",
        text: "ECT101"
    },
    {
        name: "ECT103",
        text: "ECT103"
    },
    {
        name: "CST101",
        text: "CST101"
    },
    {
        name: "HST101",
        text: "HST101"
    },
    {
        name: "CSP111",
        text: "CSP111"
    },
    {
        name: "MAT102",
        text: "MAT102"
    },
    {
        name: "ECT102",
        text: "ECT102"
    },
    {
        name: "CST102",
        text: "CST102"
    },
    {
        name: "CST104",
        text: "CST104"
    },
    {
        name: "HST102",
        text: "HST102"
    },
    {
        name: "HST104",
        text: "HST104"
    },
    {
        name: "CSP112",
        text: "CSP112"
    },
    {
        name: "MAT201",
        text: "MAT201"
    },
    {
        name: "ECT201",
        text: "ECT201"
    },
    {
        name: "ECT209",
        text: "ECT209"
    },
    {
        name: "CST201",
        text: "CST201"
    },
    {
        name: "BMT201",
        text: "BMT201"
    },
    {
        name: "CST202",
        text: "CST202"
    },
    {
        name: "CST204",
        text: "CST204"
    },
    {
        name: "CST206",
        text: "CST206"
    },
    {
        name: "CST208",
        text: "CST208"
    },
    {
        name: "CST210",
        text: "CST210"
    },
    {
        name: "HST202",
        text: "HST202"
    },
    {
        name: "CST301",
        text: "CST301"
    },
    {
        name: "CST303",
        text: "CST303"
    },
    {
        name: "CST307",
        text: "CST307"
    },
    {
        name: "Extras",
        text: "Extras"
    },
]

export { windowWidth, COLORS2, windowHeight, COLORS, classbg, filterData }
