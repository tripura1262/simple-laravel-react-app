import React from "react";
import { Redirect, Route, withRouter } from "react-router-dom";
// 3.1
let isLoggedIn = localStorage.getItem("isLoggedIn")

// 3.3
const PrivateRouter = ({ component: Component, path, ...rest }) => (
    <Route
        path={path}
        {...rest}
        render={(props) =>
            isLoggedIn ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/sign-in",
                        state: {
                            prevLocation: path,
                            error: "You need to login first!",
                        },
                    }}
                />
            )
        }
    />
);
export default withRouter(PrivateRouter);
