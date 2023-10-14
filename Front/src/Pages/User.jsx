import logo from '../Assets/argentBankLogo.png'
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import axios from 'axios';
import { getUserProfile, logOut } from '../Utils/Reducer';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';

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

function put(token, updateUser){
    axios.put('http://localhost:3001/api/v1/user/profile', updateUser,  {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    } )        
        .catch(error => {
            console.log(error.response.data)
        });
}

function User() {
    const dispatch = useDispatch();   
    const token = useSelector((state) => state.token);

    const openEdit = () => {
        const form = document.getElementById('editProfile');
        const title = document.getElementById('editClose');
        form.style.display = 'block';
        title.style.display = 'none';
    }

    const save = () => {
        const firstName = document.getElementById('firstName');
        const lastName = document.getElementById('lastName');
        let updateUser = {
            firstName:'',
            lastName:''
        }
        if(firstName.value.length === 0){
            updateUser.firstName = firstName.placeholder
        } else {
            updateUser.firstName = firstName.value
        }
        if(lastName.value.length === 0){
            updateUser.lastName = lastName.placeholder
        } else {
            updateUser.lastName = lastName.value
        }
        put(token, updateUser)
        post(token, dispatch)
        cancel()
    }

    const cancel = () => {
        const form = document.getElementById('editProfile');
        const title = document.getElementById('editClose');
        const inputs = document.querySelectorAll('.editInput')
        title.style.display = 'block';
        form.style.display = 'none';
        inputs.forEach(el=>{
            el.value=''
        })
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
                    <Link className="main-nav-item" to='/user'>
                        <i className="fa fa-user-circle"></i>
                        {useSelector((state) => state.users.firstName)}
                    </Link>
                    <Link className="main-nav-item"  onClick={() => dispatch(logOut())} to='/' >
                        <i className="fa fa-sign-out"></i>
                        Sign Out
                    </Link>
                </div>
            </nav>
            <main className="main bg-dark">
                <div className="header">

                    <div className='editClose' id='editClose'>
                        <h1>Welcome back<br />{useSelector((state) => state.users.firstName)} {useSelector((state) => state.users.lastName)} !</h1>
                        <button onClick={openEdit} className="edit-button">Edit Name</button>
                    </div>



                    <div className='editProfile' id='editProfile'>
                        <h1>Welcome back</h1>

                        <div className='inputs'>
                            <input className='editInput' id='firstName' type="text" placeholder={useSelector((state) => state.users.firstName)} />
                            <input className='editInput' id='lastName' type="text" placeholder={useSelector((state) => state.users.lastName)} />
                        </div>
                        <div className='buttons'>
                            <button className='editButton' onClick={save}>Save</button>
                            <button className='editButton' onClick={cancel}>Cancel</button>
                        </div>

                    </div>
                </div>

                <h2 className="sr-only">Accounts</h2>
                <section className="account">
                    <div className="account-content-wrapper">
                        <h3 className="account-title">Argent Bank Checking (x8349)</h3>
                        <p className="account-amount">$2,082.79</p>
                        <p className="account-amount-description">Available Balance</p>
                    </div>
                    <div className="account-content-wrapper cta">
                        <button className="transaction-button">View transactions</button>
                    </div>
                </section>
                <section className="account">
                    <div className="account-content-wrapper">
                        <h3 className="account-title">Argent Bank Savings (x6712)</h3>
                        <p className="account-amount">$10,928.42</p>
                        <p className="account-amount-description">Available Balance</p>
                    </div>
                    <div className="account-content-wrapper cta">
                        <button className="transaction-button">View transactions</button>
                    </div>
                </section>
                <section className="account">
                    <div className="account-content-wrapper">
                        <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
                        <p className="account-amount">$184.30</p>
                        <p className="account-amount-description">Current Balance</p>
                    </div>
                    <div className="account-content-wrapper cta">
                        <button className="transaction-button">View transactions</button>
                    </div>
                </section>
            </main>
            <footer className="footer">
                <p className="footer-text">Copyright 2020 Argent Bank</p>
            </footer>

        </>
    )
}
 const mapStateToProps = (state) => ({
    user: state.users, 
  }); 

export default connect(mapStateToProps)(User)