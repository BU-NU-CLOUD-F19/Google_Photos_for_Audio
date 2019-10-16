import { LOGIN_ACTION, LOGOUT_ACTION } from "../constants/action-types"

export function logInUser(payload) {
    return { type: LOGIN_ACTION, payload };
}

export function logOutUser(payload) {
    return { type: LOGOUT_ACTION, payload };
}