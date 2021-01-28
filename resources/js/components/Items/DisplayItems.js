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
import { BASE_URL } from "./../../services";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    HashRouter,
} from "react-router-dom";

import Header from "../../components/Header/Header";
import SideNavbar from "../Navigation/SideNavbar";

export default class DisplayItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            newItemModal: false,
            newItemData: {
                name: "",
                price: "",
            },
            editItemModal: false,
            editItemData: {
                name: "",
                price: "",
            },
        };
    }

    loadItems() {
        axios
            .get(BASE_URL + "/api/items")
            .then((response) => {
                this.setState({
                    items: response.data,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidMount() {
        this.loadItems();
    }

    toggleNewItemModal() {
        this.setState({
            newItemModal: !this.state.newItemModal,
        });
    }

    toggleEditItemModal() {
        this.setState({
            editItemModal: !this.state.editItemModal,
        });
    }

    editItem(id, name, price) {
        this.setState({
            editItemData: {
                id,
                name,
                price,
            },
            editItemModal: !this.state.editItemModal,
        });
    }

    addItem() {
        axios
            .post(BASE_URL + "/api/item", this.state.newItemData)
            .then((response) => {
                let { items } = this.state;
                this.loadItems();

                this.setState({
                    items: [],
                    newItemModal: false,
                    newItemData: {
                        name: "",
                        price: "",
                    },
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    updateItem() {
        let { name, price } = this.state.editItemData;
        axios
            .put(BASE_URL + "/api/item/" + this.state.editItemData.id, {
                name,
                price,
            })
            .then((response) => {
                this.loadItems();
                this.setState({
                    editItemModal: false,
                    editItemData: {
                        id: "",
                        name: "",
                        price: "",
                    },
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    deleteItem(id) {
        axios
            .delete(BASE_URL + "/api/item/" + id)
            .then((response) => {
                this.loadItems();
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    render() {
        let itemsList = this.state.items.map((item) => {
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>
                        <Button
                            color="success"
                            size="sm"
                            className="mr-2"
                            onClick={this.editItem.bind(
                                this,
                                item.id,
                                item.name,
                                item.price
                            )}
                        >
                            {" "}
                            Edit{" "}
                        </Button>
                        <Button
                            color="danger"
                            size="sm"
                            onClick={this.deleteItem.bind(this, item.id)}
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
                <div className="content"  >
                    <h1> Items List </h1>
                    <Button
                        color="primary"
                        onClick={this.toggleNewItemModal.bind(this)}
                        className="my-3"
                    >
                        {" "}
                        Add Item{" "}
                    </Button>
                    <Modal
                        isOpen={this.state.newItemModal}
                        toggle={this.toggleNewItemModal.bind(this)}
                    >
                        <ModalHeader
                            toggle={this.toggleNewItemModal.bind(this)}
                        >
                            Add Item
                        </ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <Label for="name"> Name </Label>
                                <Input
                                    type="text"
                                    id="name"
                                    value={this.state.newItemData.name}
                                    onChange={(e) => {
                                        let { newItemData } = this.state;
                                        newItemData.name = e.target.value;
                                        this.setState({ newItemData });
                                    }}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="price"> Price </Label>
                                <Input
                                    type="number"
                                    id="price"
                                    value={this.state.newItemData.price}
                                    onChange={(e) => {
                                        let { newItemData } = this.state;
                                        newItemData.price = e.target.value;
                                        this.setState({ newItemData });
                                    }}
                                />
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color="primary"
                                onClick={this.addItem.bind(this)}
                            >
                                Add Item
                            </Button>{" "}
                            <Button
                                color="secondary"
                                onClick={this.toggleNewItemModal.bind(this)}
                            >
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Modal>

                    <Modal
                        isOpen={this.state.editItemModal}
                        toggle={this.toggleEditItemModal.bind(this)}
                    >
                        <ModalHeader
                            toggle={this.toggleEditItemModal.bind(this)}
                        >
                            Edit Item
                        </ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <Label for="name"> Name </Label>
                                <Input
                                    id="name"
                                    value={this.state.editItemData.name}
                                    onChange={(e) => {
                                        let { editItemData } = this.state;
                                        editItemData.name = e.target.value;
                                        this.setState({ editItemData });
                                    }}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="price"> Price </Label>
                                <Input
                                    id="price"
                                    value={this.state.editItemData.price}
                                    onChange={(e) => {
                                        let { editItemData } = this.state;
                                        editItemData.price = e.target.value;
                                        this.setState({ editItemData });
                                    }}
                                />
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color="primary"
                                onClick={this.updateItem.bind(this)}
                            >
                                Edit Item
                            </Button>{" "}
                            <Button
                                color="secondary"
                                onClick={this.toggleEditItemModal.bind(this)}
                            >
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Modal>

                    <Table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>{itemsList}</tbody>
                    </Table>
                </div>
            </div>
        );
    }
}
