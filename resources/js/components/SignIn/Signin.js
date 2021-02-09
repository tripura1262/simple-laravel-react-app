import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import Header from "../Header/Header";
import { ErrorMessage } from '@hookform/error-message';
import AuthService from "../../services/auth.service";
import { Button } from "reactstrap"

export default function Signin() {
    const { register, handleSubmit, errors } = useForm(); // initialize the hook
    const [loading, setLoading] = useState(false);
    const [isLoggedIn, setisLoggedIn] = useState(false);
    const [loginmessage, setLoginMessage] = useState("");
    const [redirect, setRedirect] = useState(false);

    const handleLoginSubmit = (data) => {
        setLoginMessage("")
        setLoading(true)
        AuthService.login(data).then(
            (response) => {
                if (response.data.status === 200) {
                    // console.log(response.data)
                    localStorage.setItem("isLoggedIn", true);
                    localStorage.setItem(
                        "userData", JSON.stringify(response.data)
                    );
                    localStorage.setItem(
                        "accessToken", (response.data.token_type + ' ' + response.data.access_token)
                    );
                    setLoginMessage(response.data.message);
                    setLoading(false);
                    setRedirect(true)
                    setisLoggedIn(true)
                    if (isLoggedIn) {
                        props.history.push("/home");
                        window.location.reload();
                    }
                } else {
                    setLoginMessage(response.data.message);
                    setLoading(false);
                }
                console.log(loginmessage)
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setLoading(false);
                setLoginMessage(resMessage);
            }
        );
    }
    console.log(localStorage)
    const login = localStorage.getItem("isLoggedIn");
    console.log(login)
    if (login) {
        return <Redirect to="/home" />;
    }
    return (
        <div className="container-fluid signin-layout">
            <div className="row justify-content-center align-items-center">
                <div className="col-md-6 col-md-offset-3">
                    <div className="panel panel-login">
                        <Header />
                        <div className="panel-body">
                            <div className="row">
                                <div className="col-lg-12">
                                    {loginmessage && (
                                        <div className="form-group">
                                            <div className="error-message">
                                                {loginmessage}
                                            </div>
                                        </div>
                                    )}
                                    <form onSubmit={handleSubmit(handleLoginSubmit)}>
                                        <div className="form-group">
                                            <label className="lable" htmlFor="email">Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="Enter email"
                                                className={`form-control ${errors.email ? "is-invalid" : ""
                                                    }`}
                                                ref={register({
                                                    required: "Email is required",
                                                    pattern: {
                                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                                        message: "Invalid email address format"
                                                    }
                                                })}
                                            />
                                            <ErrorMessage className="invalid-feedback" name="email" as="div" errors={errors} />
                                        </div>

                                        <div className="form-group">
                                            <label className="lable" htmlFor="password">Password</label>
                                            <input
                                                type="password"
                                                name="password"
                                                placeholder="Enter password"
                                                className={`form-control ${errors.password ? "is-invalid" : ""
                                                    }`}
                                                ref={register({
                                                    required: "Password is required",
                                                })}
                                            />
                                            <ErrorMessage className="invalid-feedback" name="password" as="div" errors={errors} />
                                        </div>
                                        <div className="form-group">
                                            <div className="row">
                                                <div className="col-sm-6 col-sm-offset-3" style={{ marginLeft: '40%' }}>
                                                    <Button color="primary" size="lg"> Log In </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    {/* <hr />
                                    <center><h4>OR</h4></center>
                                    <Button color="primary" size="lg" onClick={() => window.location.assign(`redirect/facebook`)} style={{ marginLeft: '33%' }}> Login via facebook </Button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}