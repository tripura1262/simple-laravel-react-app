import HTTP from './../Http'

const login = (data) => {
    return HTTP
        .post("api/login", {
            email: data.email,
            password: data.password
        })
        .then((response) => {
            return response;
        });
};

const socialLogin = (data) => {
    return HTTP
        .post(`api/login/${data.social}/callback${data.params}`)
        .then((response) => {
            console.log('social login')
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem(
                "userData",
                JSON.stringify(response.data)
            );
            return response;
        })
}

const register = (data) => {
    return HTTP.post("api/register", {
        first_name: data.first_name,
        last_name: data.last_name,
        phone: data.phone,
        email: data.email,
        password: data.password
    });
};



const logout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("userData"));
};

export default {
    register,
    login,
    socialLogin,
    logout,
    getCurrentUser,
};