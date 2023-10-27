import logo from '../Assets/argentBankLogo.png'
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { logOut } from '../Utils/Redux';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { recoveryProfileUser, upadteProfileUser } from '../Utils/Service';

function User() {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const firstName = useSelector((state) => state.users.firstName)
    const lastName = useSelector((state) => state.users.lastName)

    const openEdit = () => {
        const form = document.getElementById('editProfile');
        const title = document.getElementById('editClose');
        form.style.display = 'block';
        title.style.display = 'none';
    }

    const save = () => {
        const firstNameInput = document.getElementById('firstName');
        const lastNameInput = document.getElementById('lastName');
        let updateUser = {
            firstName: '',
            lastName: ''
        }
        if (firstNameInput.value.length === 0) {
            updateUser.firstName = firstName
        } else {
            updateUser.firstName = firstNameInput.value
        }
        if (lastNameInput.value.length === 0) {
            updateUser.lastName = lastName
        } else {
            updateUser.lastName = lastNameInput.value
        }
        upadteProfileUser(token, updateUser)
        recoveryProfileUser(token, dispatch)
        cancel()
    }

    const cancel = () => {
        const form = document.getElementById('editProfile');
        const title = document.getElementById('editClose');
        const inputs = document.querySelectorAll('.editInput')
        title.style.display = 'block';
        form.style.display = 'none';
        inputs.forEach(el => {
            el.value = ''
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
                        {firstName}
                    </Link>
                    <Link className="main-nav-item" onClick={() => dispatch(logOut())} to='/' >
                        <i className="fa fa-sign-out"></i>
                        Sign Out
                    </Link>
                </div>
            </nav>
            <main className="main bg-dark">
                <div className="header">

                    <div className='editClose' id='editClose'>
                        <h1>Welcome back<br />{firstName} {lastName} !</h1>
                        <button onClick={openEdit} className="edit-button">Edit Name</button>
                    </div>

                    <div className='editProfile' id='editProfile'>
                        <h1>Welcome back</h1>

                        <div className='inputs'>
                            <input className='editInput' id='firstName' type="text" placeholder={firstName} />
                            <input className='editInput' id='lastName' type="text" placeholder={lastName} />
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