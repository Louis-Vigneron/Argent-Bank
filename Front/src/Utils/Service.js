import { getUserProfile, loginSuccess, loginFailed } from '../Utils/Redux';
import axios from 'axios';

export function recoveryProfileUser(token, dispatch) {
    axios.post('http://localhost:3001/api/v1/user/profile', token, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then((response) => {
            const users = {
                firstName: response.data.body.firstName,
                lastName: response.data.body.lastName,
            }
            dispatch(getUserProfile(users));
        })
        .catch(error => {
            console.log(error.response.data)
        });
}

export function upadteProfileUser(token, updateUser) {
    axios.put('http://localhost:3001/api/v1/user/profile', updateUser, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .catch(error => {
            console.log(error.response.data)
        });
}


export function Login(e, user, dispatch, navigate) {
    e.preventDefault()

    axios.post('http://localhost:3001/api/v1/user/login', user)
        .then((response) => {
            let token = response.data.body.token
            dispatch(loginSuccess(token));
            recoveryProfileUser(token, dispatch)
            navigate('/user');
        })
        .catch(error => {
            console.log(error.response.data)
            dispatch(loginFailed());
        });

}