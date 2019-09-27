import ReactDOM from "react-dom";
import App from "./components/App";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";

const routing = (
    <Routing>
        <div>
            <Route exact path="/" component={App} />
            <Route path="userManagement/signIn" component={SignIn} />
            <Route path="userManagement/signUp" component={SignUp} />
        </div>
    </Routing>
)

ReactDOM.render(routing, document.getElementById('app'));
