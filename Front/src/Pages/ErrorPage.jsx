import logo from '../Assets/argentBankLogo.png';
import { Link } from 'react-router-dom';

export default function ErrorPage(){
    return(
        <div className="errorPage">
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
            <h2 className='error'>404 Not Found <br /> <span className='errorText'>Page introuvable</span> </h2>
         
            <Link className="homeBack" to='/'>
                    Retour à l'accueil
                </Link>
        </div>
    )
}