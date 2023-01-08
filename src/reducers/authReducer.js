const types = {
    RETRIEVE_TOKEN: 'RETRIEVE_TOKEN',
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
    REGISTER: 'REGISTER',
};

export const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
};

export function loginReducer(prevState, action) {
    switch (action.type) {
        case types.RETRIEVE_TOKEN:
            return {
                ...prevState,
                userToken: action.token,
                isLoading: false,
            };
        case types.LOGIN:
            return {
                ...prevState,
                userName: action.id,
                userToken: action.token,
                isLoading: false,
            };
        case types.LOGOUT:
            return {
                ...prevState,
                userName: null,
                userToken: null,
                isLoading: false,
            };
        case types.REGISTER:
            return {
                ...prevState,
                userName: action.id,
                userToken: action.token,
                isLoading: false,
            };
    }
};
