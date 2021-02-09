import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
} from "reactstrap"
import { ErrorMessage } from '@hookform/error-message';
import ItemsService from "../../services/items.service";

export default function AddEditItem(props) {
    const [isOpen, setIsOpen] = useState(false)
    const { register, handleSubmit, errors, setValue } = useForm(); // initialize the hook
    const [successful, setSuccessful] = useState(false);
    const [item, setItem] = useState({});
    const toggle = () => {
        setIsOpen(!isOpen)
    }
    const closeBtn = <button className="close" onClick={toggle}>&times;</button>
    const label = props.buttonLabel
    let title = (label === 'Edit') ? "Edit Item" : "Add Item"
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
        let isMounted = true
        if (props.item) {
            // get item and set form fields
            ItemsService.getItemById(props.item.id).then(
                (response) => {
                    if (isMounted) {
                        if (response.status === 200) {
                            const item = response.data
                            const fields = ['name', 'price']
                            fields.forEach(
                                field => setValue(field, item[field])
                            )
                            setItem(item)
                        } else {

                        }
                    }
                }
            ).catch(e => {
                console.log(e);
            });
        }
        return () => { isMounted = false };
    }, [isOpen]);

    const handleFormSubmit = (data) => {
        if (props.item) {
            url = ItemsService.updateItem(data, item['id'])
        } else {
            url = ItemsService.addItem(data)
        }
        url.then(
            (response) => {
                console.log(response)
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
                            <label className="lable" htmlFor="name">Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter Item Name"
                                className={`form-control ${errors.name ? "is-invalid" : ""
                                    }`}
                                ref={register({
                                    required: "Item Name is required",
                                })}
                            />
                            <ErrorMessage className="invalid-feedback" name="name" as="div" errors={errors} />
                        </div>

                        <div className="form-group">
                            <label className="lable" htmlFor="price">Price</label>
                            <input
                                type="number"
                                name="price"
                                placeholder="Enter price"
                                className={`form-control ${errors.price ? "is-invalid" : ""
                                    }`}
                                ref={register({
                                    required: "Price is required",
                                })}
                            />
                            <ErrorMessage className="invalid-feedback" name="phone" as="div" errors={errors} />
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