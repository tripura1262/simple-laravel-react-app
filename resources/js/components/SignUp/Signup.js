import React, { Component, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import Header from "../Header/Header";
import { ErrorMessage } from '@hookform/error-message';
import AuthService from "../../services/auth.service";
import { Button } from "reactstrap"

export default function Signup() {
  const { register, handleSubmit, errors, watch, reset } = useForm(); // initialize the hook
  const [loading, setLoading] = useState(false);
  const [registerMessage, setRegisterMessage] = useState("");
  const [successful, setSuccessful] = useState(false);
  const password = useRef({});
  password.current = watch("password", "");

  const handleRegisterSubmit = (data) => {
    setRegisterMessage("")
    setLoading(true)
    let isMounted = true
    AuthService.register(data).then(
      (response) => {
        if (isMounted) {
          if (response.data.status === 200) {
            setRegisterMessage(response.data.message);
            setSuccessful(true);
            reset()
          } else {
            setRegisterMessage(response.data.message);
            setSuccessful(false);
          }
        }
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setSuccessful(false);
        setRegisterMessage(resMessage);
      }
    );
    return () => { isMounted = false };
  }
  const login = localStorage.getItem("isLoggedIn");
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
                  {registerMessage && (
                    <div className="form-group">
                      <div className={successful ? "success-message" : "error-message"}>
                        {registerMessage}
                      </div>
                    </div>
                  )}
                  <form onSubmit={handleSubmit(handleRegisterSubmit)}>
                    <div className="form-group">
                      <label className="lable" htmlFor="first_name">First Name</label>
                      <input
                        type="text"
                        name="first_name"
                        placeholder="Enter First Name"
                        className={`form-control ${errors.first_name ? "is-invalid" : ""
                          }`}
                        ref={register({
                          required: "First Name is required",
                        })}
                      />
                      <ErrorMessage className="invalid-feedback" name="first_name" as="div" errors={errors} />
                    </div>
                    <div className="form-group">
                      <label className="lable" htmlFor="last_name">Last Name</label>
                      <input
                        type="text"
                        name="last_name"
                        placeholder="Enter Last Name"
                        className={`form-control ${errors.last_name ? "is-invalid" : ""
                          }`}
                        ref={register({
                          required: "Last Name is required",
                        })}
                      />
                      <ErrorMessage className="invalid-feedback" name="last_name" as="div" errors={errors} />
                    </div>
                    <div className="form-group">
                      <label className="lable" htmlFor="phone">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Enter Phone Number"
                        className={`form-control ${errors.phone ? "is-invalid" : ""
                          }`}
                        ref={register({
                          required: "Phone Number is required",
                          // maxLength: 12,
                          pattern: {
                            value: /^[+]?(\d{1,2})?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
                            message: "Invalid phone number format"
                          }
                        })}
                      />
                      <ErrorMessage className="invalid-feedback" name="phone" as="div" errors={errors} />
                    </div>
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
                      <label className="lable" htmlFor="confirm_password">Confirm Password</label>
                      <input
                        type="password"
                        name="confirm_password"
                        placeholder="Enter Confirm password"
                        className={`form-control ${errors.confirm_password ? "is-invalid" : ""
                          }`}
                        ref={register({
                          required: "Confirm Password is required",
                          validate: value =>
                            value === password.current || "The passwords do not match"
                        })}
                      />
                      <ErrorMessage className="invalid-feedback" name="confirm_password" as="div" errors={errors} />
                    </div>
                    <div className="form-group">
                      <div className="row">
                        <div className="col-sm-6 col-sm-offset-3" style={{marginLeft : '35%'}}>
                          <Button color="primary" size="lg"> Register </Button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}