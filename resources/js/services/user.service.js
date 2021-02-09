import HTTP from './../Http'

const getUsers = () => {
  return HTTP.get('api/users')
    .then((response) => {
      return response;
    }).catch(function (error) {
      return error;
    });
};

const getUserById = (id) => {
  return HTTP.get('api/user/'+id)
    .then((response) => {
      return response;
    }).catch(function (error) {
      return error;
    });
}

const addUser = (data) => {
  return HTTP
    .post("api/user", {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      phone: data.phone,
    })
    .then((response) => {
      return response;
    }).catch(function (error) {
      return error;
    });
};

const updateUser = (data,id) => {
  return HTTP
    .put(`api/user/${id}`, {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      phone: data.phone,
    })
    .then((response) => {
      return response;
    }).catch(function (error) {
      return error;
    });
};


const deleteUser = (id) => {
  return HTTP
    .delete(`api/user/${id}`,)
    .then((response) => {
      return response;
    }).catch(function (error) {
      return error;
    });
};

export default {
  getUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
};