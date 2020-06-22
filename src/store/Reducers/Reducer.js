import * as actionTypes from '../Action/Action'

const initialState = {
    user_id: null,
    business_id: null,
    token: null
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.UPDATE_USER_ID:
        return{
            ...state,
            user_id : action.user_id
        }
    }
}

export default reducer