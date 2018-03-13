import { combineReducers } from "redux"

import auth from "./auth" 
import signup from "./signup" 
import description from "./description" 
import users from "./users" 
import fileupload from "./fileupload"
import posts from "./posts"
import sharewrite from "./sharewrite"
import persons from "./persons"
import viewperson from "./viewperson"

const appReducer = combineReducers({  
    auth,
    signup,
    description,
    users,
    fileupload,
    posts,
    sharewrite,
    persons,
    viewperson

})

export default appReducer