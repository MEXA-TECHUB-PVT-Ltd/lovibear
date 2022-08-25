import { SET_FROM_CATEGORY,SET_FROM_GENDER } from "./actions";

const initialState = {
    fromgender: false,
    fromcategory: false
}

function userReducer(state = initialState,action) {
    switch(action.type){
        case SET_FROM_CATEGORY:
            return{ ...state,fromcategory: action.payload};
            case SET_FROM_GENDER:
                return{ ...state,fromgender: action.payload};
                default:
                    return state;
    }
} 

export default userReducer