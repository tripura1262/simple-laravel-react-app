import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
} from "reactstrap"
import { ErrorMessage } from '@hookform/error-message';
import UserService from "../../services/user.service";

export default function AddEditUser(props) {
    const [isOpen, setIsOpen] = useState(false)
    const { register, handleSubmit, errors, setValue } = useForm(); // initialize the hook
    const [successful, setSuccessful] = useState(false);
    const [user, setUser] = useState({});
    const toggle = () => {
        setIsOpen(!isOpen)
    }
    const closeBtn = <button className="close" onClick={toggle}>&times;</button>
    const label = props.buttonLabel
    let title = (label === 'Edit') ? "Edit User" : "Add User"
    let url = ''
    let color = (label === 'Edit') ? "success" : "primary"
    let className = (label === 'Edit') ? "mr-2" : "my-3"
    let button = <Button
        color={color}
        size="sm"
        className={className}
        style={{ fontSize: '14px' }}
        onClick={toggle}>
        {label}
    </Button>

    useEffect(() => {
        let isMounted = true;
        if (props.user) {
            // get user and set form fields
            UserService.getUserById(props.user.id).then(
                (response) => {
                    if (isMounted) {
                        if (response.status === 200) {
                            const user = response.data
                            const fields = ['first_name', 'last_name', 'email', 'phone']
                            fields.forEach(
                                field => setValue(field, user[field])
                            )
                            setUser(user)
                        } else {

                        }
                    }
                }
            ).catch(e => {
                console.log(e);
            });
        }
        return () => { isMounted = false }
    }, [isOpen]);

    const handleFormSubmit = (data) => {
        if (props.user) {
            url = UserService.updateUser(data, user['id'])
        } else {
            url = UserService.addUser(data)
        }
        url.then(
            (response) => {
                if (response.status === 200) {
                    toggle()
                    setSuccessful(true);
                    props.parentMethod()
                } else {
                    setSuccessful(false);
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
            }
        )
    }
    return (
        <div>
            {button}
            <Modal isOpen={isOpen} toggle={toggle}>
                <ModalHeader toggle={toggle} close={closeBtn}>{title}</ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit(handleFormSubmit)}>
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
                            <div className="row">
                                <div className="col-sm-3 col-sm-offset-1">
                                    <Button color="primary" > {title} </Button>
                                </div>
                                <div className="col-sm-3 col-sm-offset-1">
                                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                                </div>
                            </div>
                        </div>
                    </form>
                </ModalBody>
            </Modal>
        </div>
    )
}