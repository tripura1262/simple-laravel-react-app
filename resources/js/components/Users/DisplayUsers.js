import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
    Table,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    FormGroup,
    Label,
} from "reactstrap";
import axios from "axios";
import { BASE_URL } from "../../services";
import SideNavbar from "../Navigation/SideNavbar";

export default class DisplayUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            newUserModal: false,
            newUserData: {
                first_name: "",
                last_name: "",
                email: "",
                phone: "",
            },
            editUserModal: false,
            editUserData: {
                first_name: "",
                last_name: "",
                email: "",
                phone: "",
            },
        };
    }

    loadUsers() {
        axios
            .get(BASE_URL + "/api/user")
            .then((response) => {
                this.setState({
                    users: response.data,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidMount() {
        this.loadUsers();
    }

    toggleNewUserModal() {
        this.setState({
            newUserModal: !this.state.newUserModal,
        });
    }

    toggleeditUserModal() {
        this.setState({
            editUserModal: !this.state.editUserModal,
        });
    }

    editUser(id, first_name, last_name, email, phone) {
        this.setState({
            editUserData: {
                id,
                first_name,
                last_name,
                email,
                phone,
            },
            editUserModal: !this.state.editUserModal,
        });
    }

    addUser() {
        axios
            .post(BASE_URL + "/api/user", this.state.newUserData)
            .then((response) => {
                let { users } = this.state;
                this.loadUsers();

                this.setState({
                    users: [],
                    newUserModal: false,
                    newUserData: {
                        first_name: "",
                        last_name: "",
                        email: "",
                        phone: "",
                    },
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    updateUser() {
        let {
            id,
            first_name,
            last_name,
            email,
            phone,
        } = this.state.editUserData;
        axios
            .put(BASE_URL + "/api/user/" + this.state.editUserData.id, {
                first_name,
                last_name,
                email,
                phone,
            })
            .then((response) => {
                this.loadUsers();
                this.setState({
                    editUserModal: false,
                    editUserData: {
                        id: "",
                        first_name: "",
                        last_name: "",
                        email: "",
                        phone: "",
                    },
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    deleteuser(id) {
        axios
            .delete(BASE_URL + "/api/user/" + id)
            .then((response) => {
                this.loadUsers();
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    render() {
        let usersList = this.state.users.map((user) => {
            return (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>
                        <Button
                            color="success"
                            size="sm"
                            className="mr-2"
                            onClick={this.editUser.bind(
                                this,
                                user.id,
                                user.first_name,
                                user.last_name,
                                user.email,
                                user.phone
                            )}
                        >
                            {" "}
                            Edit{" "}
                        </Button>
                        <Button
                            color="danger"
                            size="sm"
                            onClick={this.deleteuser.bind(this, user.id)}
                        >
                            {" "}
                            Delete{" "}
                        </Button>
                    </td>
                </tr>
            );
        });

        return (
            <div>
                <SideNavbar />
                <div className="content">
                    <h1> users List </h1>
                    <Button
                        color="primary"
                        onClick={this.toggleNewUserModal.bind(this)}
                        className="my-3"
                    >
                        {" "}
                        Add user{" "}
                    </Button>
                    <Modal
                        isOpen={this.state.newUserModal}
                        toggle={this.toggleNewUserModal.bind(this)}
                    >
                        <ModalHeader
                            toggle={this.toggleNewUserModal.bind(this)}
                        >
                            Add user
                        </ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <Label for="first_name"> First Name </Label>
                                <Input
                                    type="text"
                                    id="first_name"
                                    name="first_name"
                                    placeholder="Enter First Name"
                                    value={this.state.newUserData.first_name}
                                    onChange={(e) => {
                                        let { newUserData } = this.state;
                                        newUserData.first_name = e.target.value;
                                        this.setState({ newUserData });
                                    }}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="last_name"> Last Name </Label>
                                <Input
                                    type="text"
                                    id="last_name"
                                    name="last_name"
                                    placeholder="Enter Last Name"
                                    value={this.state.newUserData.last_name}
                                    onChange={(e) => {
                                        let { newUserData } = this.state;
                                        newUserData.last_name = e.target.value;
                                        this.setState({ newUserData });
                                    }}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="email"> Email </Label>
                                <Input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Enter Email"
                                    value={this.state.newUserData.email}
                                    onChange={(e) => {
                                        let { newUserData } = this.state;
                                        newUserData.email = e.target.value;
                                        this.setState({ newUserData });
                                    }}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="phone">Phone Number</Label>
                                <Input
                                    type="phone"
                                    name="phone"
                                    placeholder="Enter phone number"
                                    value={this.state.newUserData.phone}
                                    onChange={(e) => {
                                        let { newUserData } = this.state;
                                        newUserData.phone = e.target.value;
                                        this.setState({ newUserData });
                                    }}
                                />
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color="primary"
                                onClick={this.addUser.bind(this)}
                            >
                                Add user
                            </Button>{" "}
                            <Button
                                color="secondary"
                                onClick={this.toggleNewUserModal.bind(this)}
                            >
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Modal>

                    <Modal
                        isOpen={this.state.editUserModal}
                        toggle={this.toggleeditUserModal.bind(this)}
                    >
                        <ModalHeader
                            toggle={this.toggleeditUserModal.bind(this)}
                        >
                            Edit user
                        </ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <Label for="first_name"> First Name </Label>
                                <Input
                                    id="first_name"
                                    name="first_name"
                                    placeholder="Enter First Name"
                                    value={this.state.editUserData.first_name}
                                    onChange={(e) => {
                                        let { editUserData } = this.state;
                                        editUserData.first_name =
                                            e.target.value;
                                        this.setState({ editUserData });
                                    }}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="last_name"> Last Name </Label>
                                <Input
                                    id="last_name"
                                    name="last_name"
                                    placeholder="Enter Last Name"
                                    value={this.state.editUserData.last_name}
                                    onChange={(e) => {
                                        let { editUserData } = this.state;
                                        editUserData.last_name = e.target.value;
                                        this.setState({ editUserData });
                                    }}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="email"> Email </Label>
                                <Input
                                    id="email"
                                    name="email"
                                    placeholder="Enter Email"
                                    value={this.state.editUserData.email}
                                    onChange={(e) => {
                                        let { editUserData } = this.state;
                                        editUserData.email = e.target.value;
                                        this.setState({ editUserData });
                                    }}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="phone">Phone Number</Label>
                                <Input
                                    type="phone"
                                    name="phone"
                                    placeholder="Enter phone number"
                                    value={this.state.editUserData.phone}
                                    onChange={(e) => {
                                        let { editUserData } = this.state;
                                        editUserData.phone = e.target.value;
                                        this.setState({ editUserData });
                                    }}
                                />
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color="primary"
                                onClick={this.updateUser.bind(this)}
                            >
                                Edit user
                            </Button>{" "}
                            <Button
                                color="secondary"
                                onClick={this.toggleeditUserModal.bind(this)}
                            >
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Modal>

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
                        <tbody>{usersList}</tbody>
                    </Table>
                </div>
            </div>
        );
    }
}
