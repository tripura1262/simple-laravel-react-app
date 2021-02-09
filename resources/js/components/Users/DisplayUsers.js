import React, { useState, useEffect } from "react";
import {
    Table,
    Button,
} from "reactstrap";

import SideNavbar from "../Navigation/SideNavbar";
import UserService from "../../services/user.service";
import AddEditUser from './AddEditUser'

export default function DisplayUsers() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    useEffect(() => {
        retrieveUsersList();
    }, []);

    const retrieveUsersList = () => {
        let isMounted = true;
        UserService.getUsers()
            .then(response => {
                if (isMounted) {
                    if (response.status === 200) {
                        setUsers(response.data)
                    } else {
                        setMessage("Failed to Load Users")
                    }
                }
            })
            .catch(e => {
                console.log(e);
            })
        return () => { isMounted = false }
    }

    const refreshList = () => {
        retrieveUsersList();
    };

    const deleteUser = (id) => {
        UserService.deleteUser(id)
            .then(response => {
                if (response) {
                    retrieveUsersList();
                } else {
                    setMessage("Failed to delete User")
                }
            })
            .catch(e => {
                console.log(e);
            });
    }

    return (
        <div className="container-fluid p-0">
            <div className="row">
                <SideNavbar />
                <div className="col-md-8 col-md-offset-0">
                    <h1> Users List </h1>
                    <AddEditUser buttonLabel="Add User" parentMethod={refreshList} />
                    {message && (
                        <div className="form-group">
                            <div className={successful ? "success-message" : "error-message"}>
                                {message}
                            </div>
                        </div>
                    )}
                    <Table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users && users.map((user, i) =>
                                <tr key={user.id}>
                                    {/* <td>{user.id}</td> */}
                                    <td>{++i}</td>
                                    <td>{user.first_name}</td>
                                    <td>{user.last_name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>
                                        <div className="row">
                                            <div className="col-sm-4 col-sm-offset-0">
                                                <AddEditUser buttonLabel="Edit" user={user} parentMethod={refreshList} />
                                            </div>
                                            <div className="col-sm-3 col-sm-offset-1">
                                                <Button size="sm" className="mr-2" color="danger" onClick={() => deleteUser(user.id)}>Delete</Button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                            {!users &&
                                <tr>
                                    <td colSpan="4" className="text-center">
                                        <div className="spinner-border spinner-border-lg align-center"></div>
                                    </td>
                                </tr>
                            }
                            {users && !users.length &&
                                <tr>
                                    <td colSpan="4" className="text-center">
                                        <div className="p-2">No Users To Display</div>
                                    </td>
                                </tr>
                            }
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}