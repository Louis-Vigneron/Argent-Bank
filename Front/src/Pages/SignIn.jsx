import { Link } from 'react-router-dom'
import logo from '../Assets/argentBankLogo.png'

export default function signIn() {
    return (
        <>
            <nav class="main-nav">
                <Link class="main-nav-logo" to='/'>
                    <img
                        class="main-nav-logo-image"
                        src={logo}
                        alt="Argent Bank Logo"
                    />
                    <h1 class="sr-only">Argent Bank</h1>
                </Link>
                <div>
                    <Link class="main-nav-item" to="/sign-in">
                        <i class="fa fa-user-circle"></i>
                        Sign In
                    </Link>
                </div>
            </nav>
            <main class="main bg-dark">
                <section class="sign-in-content">
                    <i class="fa fa-user-circle sign-in-icon"></i>
                    <h1>Sign In</h1>
                    <form>
                        <div class="input-wrapper">
                            <label for="username">Username</label
                            ><input type="text" id="username" />
                        </div>
                        <div class="input-wrapper">
                            <label for="password">Password</label
                            ><input type="password" id="password" />
                        </div>
                        <div class="input-remember">
                            <input type="checkbox" id="remember-me" /><label for="remember-me"
                            >Remember me</label
                            >
                        </div>
                        {/* PLACEHOLDER DUE TO STATIC SITE */}
                        <Link to="/user" class="sign-in-button">Sign In</Link>
                        {/* SHOULD BE THE BUTTON BELOW
                    <button class="sign-in-button">Sign In</button>  */}

                    </form>
                </section>
            </main>
            <footer class="footer">
                <p class="footer-text">Copyright 2020 Argent Bank</p>
            </footer>
        </>

    )
}