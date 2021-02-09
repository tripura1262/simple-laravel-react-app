import HTTP from './../Http'

const getItems = () => {
  return HTTP.get('api/items')
    .then((response) => {
      return response;
    }).catch(function (error) {
      return error;
    });
};

const getItemById = (id) => {
  return HTTP.get('api/item/'+id)
    .then((response) => {
      return response;
    }).catch(function (error) {
      return error;
    });
}

const addItem = (data) => {
  return HTTP
    .post("api/item", {
      name: data.name,
      price: data.price
    })
    .then((response) => {
      return response;
    }).catch(function (error) {
      return error;
    });
};

const updateItem = (data,id) => {
  return HTTP
    .put(`api/item/${id}`, {
      name: data.name,
      price: data.price
    })
    .then((response) => {
      return response;
    }).catch(function (error) {
      return error;
    });
};


const deleteItem = (id) => {
  return HTTP
    .delete(`api/item/${id}`,)
    .then((response) => {
      return response;
    }).catch(function (error) {
      return error;
    });
};

export default {
  getItems,
  getItemById,
  addItem,
  updateItem,
  deleteItem,
};