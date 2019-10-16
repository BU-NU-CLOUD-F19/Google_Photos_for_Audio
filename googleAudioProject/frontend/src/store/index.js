import { createStore } from "redux";
import rootReducer from "../reducers/index";
import { logInUser, logOutUser} from "../actions/index"

const store = createStore(rootReducer);

store.dispatch(logInUser(0));
store.dispatch(logOutUser(0));


export default store;