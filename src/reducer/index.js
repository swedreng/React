import { combineReducers } from "redux"

import auth from "./auth" 
import signup from "./signup" 
import description from "./description" 
import users from "./users" 
import fileupload from "./fileupload"
import posts from "./posts"



const appReducer = combineReducers({  
    auth,
    signup,
    description,
    users,
    fileupload,
    posts,

})

export default appReducer