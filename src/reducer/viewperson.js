import { PERSONS,VİEW_PERSON,VİEW_PERSON_SOCIAL_MEDIA,VİEW_PERSON_SHARE_INFO } from "../constants"
import { LOCATION_CHANGE } from 'react-router-redux'
const defaultState = {
  person: null,
  person_social_media:null,
  person_share_info:null
}

export default (state = defaultState, action) => {
 switch (action.type) {
    case VİEW_PERSON:
        return {...state, person:action.payload}
      break
    case VİEW_PERSON_SOCIAL_MEDIA:
      return {...state, person_social_media:action.payload}
    break  
    case VİEW_PERSON_SHARE_INFO:
      return {...state, person_share_info:action.payload}
    break 
    case LOCATION_CHANGE:
      return defaultState  
   default:
     return state
  }
}