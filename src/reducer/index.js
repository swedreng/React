import { combineReducers } from "redux"
import { routerReducer as routing } from 'react-router-redux'
import auth from "./auth" 
import signup from "./signup" 
import description from "./description" 
import users from "./users" 
import fileupload from "./fileupload"
import posts from "./posts"
import sharewrite from "./sharewrite"
import sharelink from './sharelink'
import persons from "./persons"
import viewperson from "./viewperson"
import password_token from "./password_token"
import searchdata from "./searchdata"
import categories from "./categories"
import bestposts from "./bestpost"
import contents from "./content"
import share_youtube_link from './share_youtube_link'
const appReducer = combineReducers({  
    routing,
    auth,
    signup,
    description,
    users,
    fileupload,
    posts,
    sharewrite,
    sharelink,
    persons,
    viewperson,
    password_token, // bu silinip kaldırılacak..
    searchdata,
    categories,
    bestposts,
    contents,
    share_youtube_link
})

export default appReducer