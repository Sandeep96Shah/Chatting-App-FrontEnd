import { ADD_FRIEND, SHOW_FRIENDS, SHOW_USERS, FRIENDSHIP } from "../actions/actionTypes";

const initialState = {
    friends:[],
    users:[],
}

export default function friends(state=initialState, action){
    switch(action.type){
        case SHOW_FRIENDS:
            return {
                ...state,
                friends:action.payload,
            }
        case SHOW_USERS:
            return {
                ...state,
                users:action.payload,
            }
        case ADD_FRIEND:
            return {
                ...state,
                friends : [...state.friends , action.payload],
            }
        case FRIENDSHIP:
            return {
                ...state,
                friends:[...state.friends, action.payload],
            }
        default:
            return state;
    }
}