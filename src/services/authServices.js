import api from '../config/api'; 

export async function loginUser(userInfo){
    const response = await api.post('/auth/login', userInfo);
    console.log("got user back from server: ", response);
    return response.data
}
export async function logoutUser(){
    return api.get('/auth/logout');
}

export async function registerUser(userInfo) {
    const response = await api.post('auth/register', userInfo);
    return response.data
}