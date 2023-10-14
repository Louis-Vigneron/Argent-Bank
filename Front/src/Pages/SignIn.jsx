import { Link } from 'react-router-dom'
import logo from '../Assets/argentBankLogo.png'
import { useState } from 'react'
import axios from 'axios';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailed, getUserProfile } from '../Utils/Reducer';
import { useNavigate } from 'react-router-dom';

function post(token, dispatch){
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

function SignIn() {
    const dispatch = useDispatch();
    const navigate  = useNavigate();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
   
    const user =
    {
        email: userName,
        password: password
    }
    
    const login = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/api/v1/user/login', user)
        .then((response) => {
            let token = response.data.body.token
            dispatch(loginSuccess(token));
            post(token, dispatch)
            navigate('/user');
        })
            .catch(error => {
                console.log(error.response.data)
                dispatch(loginFailed());
            });

    }

    return (
        <>
            <nav className="main-nav">
                <Link className="main-nav-logo" to='/'>
                    <img
                        className="main-nav-logo-image"
                        src={logo}
                        alt="Argent Bank Logo"
                    />
                    <h1 className="sr-only">Argent Bank</h1>
                </Link>
                <div>
                    <Link className="main-nav-item" to="/sign-in">
                        <i className="fa fa-user-circle"></i>
                        Sign In
                    </Link>
                </div>
            </nav>
            <main className="main bg-dark">
                <section className="sign-in-content">
                    <i className="fa fa-user-circle sign-in-icon"></i>
                    <h1>Sign In</h1>
                    <form>
                        <div className="input-wrapper">
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" value={userName} onChange={e => setUserName(e.target.value)} />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="password">Password</label><input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
                        </div>
                        <div className="input-remember">
                            <input type="checkbox" id="remember-me" /><label htmlFor="remember-me">Remember me</label>
                        </div>
                        <button onClick={login} className="sign-in-button">Sign In</button>
                    </form>
                </section>
            </main>
            <footer className="footer">
                <p className="footer-text">Copyright 2020 Argent Bank</p>
            </footer>
        </>
    )
}

export default connect()(SignIn)