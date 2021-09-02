import { SIGNIN_FAILURE, SIGNIN_PROGRESS, SIGNIN_SUCCESS } from "../actions/actionTypes";

const initialState = {
    user:{},
    name:false,
    otp:false,
    isSigned:false,
    isValid:false,
}

export default function auth(state = initialState, action){
    switch(action.type){
        case SIGNIN_PROGRESS:
            return{
                ...state,
                name:!action.isVerified,
                otp:true,
            }
        case SIGNIN_SUCCESS:
            return {
                ...state,
                user:action.payload,
                name:false,
                otp:false,
                isSigned:true,
                isValid:false,
            }
        case SIGNIN_FAILURE:
            return {
                ...state,
                isValid:true,
            }
        default:
            return state;
    }
}