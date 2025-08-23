import { history } from "../../utilities/_helpers";
import { userLoggedOut } from "../slices/authSlice";

const authInterceptor = ({dispatch}) => (next) => (action) => {
    if (action?.payload?.status === 401) {
        dispatch(userLoggedOut());
        history.navigate("login")
    }
    return next(action)
;};

export default authInterceptor;