
import { SET_LOGIN_DESC} from "../constants"
export function alertMessage(payload) {
    return (dispatch, getState) => {    
        console.log(payload)
    dispatch({ type: SET_LOGIN_DESC,payload })
    setTimeout(() => {
        dispatch({ type: SET_LOGIN_DESC,payload:{message:null} })
    }, 3000);
    }
}