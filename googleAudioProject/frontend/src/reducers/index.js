import { LOGIN_ACTION, LOGOUT_ACTION } from "../constants/action-types"

const initialState = {
    isLoggedIn: false
};

function rootReducer(state = initialState, action) {
    if (action.type == LOGIN_ACTION) {
        state.isLoggedIn = true;
    }
    if (action.type = LOGOUT_ACTION) {
        state.isLoggedIn = false;
    }
    return state;
};

export default rootReducer;