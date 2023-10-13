import { createStore } from 'redux'


//state
const initialState = {
    users: '',
    isAuthenticated: false,
    token: ''

}

//actions creators
export const loginSuccess = (token) => {
    return {
        type: "LOGIN__SUCCESS",
        payload: token,
    };
};

export const loginFailed = () => {
    return {
        type: "LOGIN__FAILED"
    };
};

export const getUserProfile = (user) => {
    return {
        type: "USER__GET__PROFILE",
        payload: user,
    };
}


function reducer(state = initialState, action) {
    switch (action.type) {
        case "LOGIN__SUCCESS":
            return {
                ...state,
                isAuthenticated: true,
                token: action.payload
            };
        case "LOGIN__FAILED":
            return {
                ...state,
                isAuthenticated: false
            };
        case "USER__GET__PROFILE":
            return {
                ...state,
                users: action.payload,
                isAuthenticated: false
            };

        default:
            return state;
    }
}

export const store = createStore(reducer);