
import { SET_LOGIN_DESC,SEARCH_DATA} from "../constants"
import {getlocalStore} from "../helper"
export function alertMessage(payload) {
    return (dispatch, getState) => {    
    dispatch({ type: SET_LOGIN_DESC,payload })
    setTimeout(() => {
       dispatch({ type: SET_LOGIN_DESC,payload:{message:null} })
    }, 3000);
    }
}

export function getSearchItem(){
    
    return (dispatch, getState) => { 
        const { search } = getlocalStore('search')
        if(search){
            const data = search.reverse().slice(0,8)
            localStorage.setItem('search',JSON.stringify(data))
            dispatch({ type: SEARCH_DATA,payload:data})
        }else{
            var data = []
            localStorage.setItem('search',JSON.stringify(data))
        }
       
    }
}