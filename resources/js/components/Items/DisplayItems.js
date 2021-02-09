import React, { useState, useEffect } from "react";
import {
    Table,
    Button,
} from "reactstrap";

import SideNavbar from "../Navigation/SideNavbar";
import ItemsService from "../../services/items.service";
import AddEditItem from './AddEditItem'

export default function DisplayItems() {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    useEffect(() => {
        retrieveItemsList();
    }, []);

    const retrieveItemsList = () => {
        let isMounted = true
        ItemsService.getItems()
            .then(response => {
                if (isMounted) {
                    if (response.status === 200) {
                        setItems(response.data)
                    } else {
                        setMessage("Failed to Load Items")
                    }
                }

            })
            .catch(e => {
                console.log(e);
            })
        return () => { isMounted = false };
    };

    const refreshList = () => {
        retrieveItemsList();
    };

    const deleteItem = (id) => {
        ItemsService.deleteItem(id)
            .then(response => {
                if (response) {
                    retrieveItemsList();
                } else {
                    setMessage("Failed to delete Item")
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
                    <h1> Items List </h1>
                    <AddEditItem buttonLabel="Add Item" parentMethod={refreshList} />
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
                                <th>Name</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items && items.map((item, i) =>
                                <tr key={item.id}>
                                    {/* <td>{item.id}</td> */}
                                    <td>{++i}</td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>
                                        <div className="row">
                                            <div className="col-sm-4 col-sm-offset-0">
                                                <AddEditItem buttonLabel="Edit" item={item} parentMethod={refreshList} />
                                            </div>
                                            <div className="col-sm-3 col-sm-offset-1">
                                                <Button size="sm" className="mr-2" color="danger" onClick={() => deleteItem(item.id)}>Delete</Button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                            {!items &&
                                <tr>
                                    <td colSpan="4" className="text-center">
                                        <div className="spinner-border spinner-border-lg align-center"></div>
                                    </td>
                                </tr>
                            }
                            {items && !items.length &&
                                <tr>
                                    <td colSpan="4" className="text-center">
                                        <div className="p-2">No items To Display</div>
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