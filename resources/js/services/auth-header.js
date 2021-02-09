export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('userData'));
    const accessToken = localStorage.getItem('accessToken')
  
    if (user && accessToken) {
        return { 'Authorization': accessToken }
    } else {
      return {};
    }
  }