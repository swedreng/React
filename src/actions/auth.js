
import { SET_AUTH_LOGIN, RESET_AUTH } from "../constants"

export function setAuth(payload) {
  return { type: SET_AUTH_LOGIN, payload }
}

export function resetLogin() {
  return { type: RESET_AUTH }
}