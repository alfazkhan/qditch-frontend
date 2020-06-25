import * as actionTypes from '../Action/Action'

const initialState = {
    user_id: null,
    business_id: null,
    token: null,
    userLoggedIn: false,
    businessUser: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_USER_ID:
            return {
                ...state,
                user_id: action.user_id,
                userLoggedIn: true
            }
        case actionTypes.UPDATE_BUSINESS_ID:
            return {
                ...state,
                business_id: action.business_id,
                businessUser: true
            }
        case actionTypes.UPDATE_TOKEN:
            return {
                ...state,
                token: action.token,
                userLoggedIn: true
            }
        case actionTypes.USER_LOGOUT:
            console.log("Logged Out")
            return {
                ...state,
                token: null,
                user_id: null,
                businessUser: false,
                business_id: null,
                userLoggedIn: false
            }
    }
}

export default reducer