export const signInWithGoogle = (data) => {
    return { type: 'signInWithGoogleAsync', payload: data };
};

export const signInWithGoogleError = () => {
    return { type: 'signInWithGoogleAsyncError' };
};

export const signOutWithGoogle = () => {
    return { type: 'signOutWithGoogleAsync', payload: null };
};

export const signOutWithGoogleError = () => {
    return { type: 'signOutWithGoogleAsyncError' };
};

export const setCoursesList = (data) => {
    return { type: 'setCoursesListAsync', payload: data };
};

export const setContestList = (data) => {
    return { type: 'setContestListAsync', payload: data };
};
export const setHackathonsList = (data) => {
    return { type: 'sethackathonsListAsync', payload: data };
};

export const setUserInfo = (data) => {
    return { type: 'setUserInfoAsync', payload: data };
};

export const setSubmissionData = (data) => {
    return { type: 'setSubmissionAsync', payload: data };
};

export const setCourseSubmissionData = (data) => {
    return { type: 'setCourseSubmissionAsync', payload: data };
};

export const setNotice = (data) => {
    return { type: 'setNoticeAsync', payload: data };
};

export const setEbook = (data) => {
    return { type: 'setEbookAsync', payload: data };
};

export const setUdemyCourses = (data) => {
    return { type: 'setUdemyCoursesAsync', payload: data };
};

export const setNotes = (data) => {
    return { type: 'setNotesAsync', payload: data };
};

export const setExtra = (data) => {
    return { type: 'setExtraAsync', payload: data };
};

export const setRecordings = (data) => {
    return { type: 'setRecordingsAsync', payload: data };
};

export const setBatch = (data) => {
    return { type: 'setBatchAsync', payload: data };
};
export const setBatchData = (data) => {
    return { type: 'setBatchDataAsync', payload: data };
};

export const setAdmin = (data) => {
    return { type: 'setAdminAsync', payload: data };
};
