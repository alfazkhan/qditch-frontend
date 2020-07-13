import * as actionTypes from '../Action/Action'

const initialState = {
    user_id: null,
    business_id: null,
    token: null,
    userLoggedIn: false,
    businessUser: false,
    user_details_id : null,
    user_coordinates: {
        latitude: null,
        longitude: null
    }
}

let updatedState

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_USER_ID:
            updatedState = {
                ...state,
                user_id: action.user_id,
                userLoggedIn: true
            }
            localStorage.setItem('state',JSON.stringify(updatedState))
            return updatedState
            
        case actionTypes.UPDATE_BUSINESS_ID:
            updatedState = {
                ...state,
                business_id: action.business_id,
                businessUser: true
            }
            localStorage.setItem('state',JSON.stringify(updatedState))
            return updatedState

        case actionTypes.UPDATE_TOKEN:
             updatedState = {
                ...state,
                token: action.token,
                userLoggedIn: true
            }
            localStorage.setItem('state',JSON.stringify(updatedState))
            return updatedState

        case actionTypes.USER_LOGOUT:
            console.log("Logged Out")
            updatedState = {
                ...state,
                token: null,
                user_id: null,
                businessUser: false,
                business_id: null,
                userLoggedIn: false
            }
            localStorage.setItem('state',JSON.stringify(updatedState))
            return updatedState

        case actionTypes.USER_DETAIL_ID:
            // console.log(action.user_details_id)
            updatedState = {
                ...state,
                user_details_id : action.user_details_id
            }
            localStorage.setItem('state',JSON.stringify(updatedState))
            return updatedState

        case actionTypes.LOCAL_STORAGE_FETCH:
            updatedState = {
                ...action.fetchedState
            }
            return updatedState
            

        case actionTypes.UPDATE_USER_COORDINATES:
            updatedState = {
                ...state,
                user_coordinates : action.user_coordinates
            }
            localStorage.setItem('state',JSON.stringify(updatedState))
            return updatedState
            
        }

    }


export default reducer