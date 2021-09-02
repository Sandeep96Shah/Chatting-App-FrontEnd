import { ADD_MESSAGE, PRIVATE_MESSAGE } from "../actions/actionTypes";

const initialState = {
    messages:[],
}

export default function messages(state=initialState, action){
    switch(action.type){
        case PRIVATE_MESSAGE:
            return {
                ...state,
                messages:action.payload,
            }
        case ADD_MESSAGE:
            return {
                ...state,
                messages : [...state.messages, action.payload ]
            }
        default:
            return state;
    }
}