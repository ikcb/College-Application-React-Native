export const tempData = [{
    "Message": "Wait Till Data is Uploaded!!",
    "Post_Time": new Date().toLocaleString(),
    "Resource_Type": "Null",
    "Subject_Code": "Error 404",
    "Url": "https://acadhere.vercel.app/",
}];

const initialState =
{
    authData: null,
    userInfo: null,
    errorAuth: false,
    courses: null,
    contests: null,
    submissionsData: null,
    courseSubData: null,
    notice: null,
    hackathons: null,
    ebooks: tempData,
    udemyCourses: tempData,
    notes: tempData,
    extras: tempData,
    recordings: tempData,
    batch: null,
    batchData: null,
    Admin: false,
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'signInWithGoogleAsync':
            return { ...state, authData: action.payload, errorAuth: false };
        case 'signInWithGoogleAsyncError':
            return { ...state, errorAuth: true };
        case 'signOutWithGoogleAsync':
            return { initialState };
        case 'signOutWithGoogleAsyncError':
            return { ...state, errorAuth: true };
        case 'setCoursesListAsync':
            return { ...state, courses: action.payload };
        case 'setContestListAsync':
            return { ...state, contests: action.payload };
        case 'sethackathonsListAsync':
            return { ...state, hackathons: action.payload };
        case 'setUserInfoAsync':
            return { ...state, userInfo: action.payload };
        case 'setSubmissionAsync':
            return { ...state, submissionsData: action.payload };
        case 'setCourseSubmissionAsync':
            return { ...state, courseSubData: action.payload };
        case 'setNoticeAsync':
            return { ...state, notice: action.payload };
        case 'setEbookAsync':
            return { ...state, ebooks: action.payload };
        case 'setUdemyCoursesAsync':
            return { ...state, udemyCourses: action.payload };
        case 'setNotesAsync':
            return { ...state, notes: action.payload };
        case 'setExtraAsync':
            return { ...state, extras: action.payload };
        case 'setRecordingsAsync':
            return { ...state, recordings: action.payload };
        case 'setBatchAsync':
            return { ...state, batch: action.payload };
        case 'setBatchDataAsync':
            return { ...state, batchData: action.payload };
        case 'setAdminAsync':
            return { ...state, Admin: action.payload };
        default:
            return state;
    }
};