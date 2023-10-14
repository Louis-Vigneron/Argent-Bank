import chat from '../Assets/icon-chat.png'
import money from '../Assets/icon-money.png'
import security from '../Assets/icon-security.png'
import logo from '../Assets/argentBankLogo.png'
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { connect } from 'react-redux';
import { logOut, store } from '../Utils/Reducer';
import { useDispatch } from 'react-redux';

function Home() {

const dispatch = useDispatch();
  const isConnect = useSelector((state) => state.isAuthenticated);
  const firstName = useSelector((state) => state.users.firstName);
  console.log(store.getState())
  return (
    <>

      <nav className="main-nav">
        <Link className="main-nav-logo" to="/">
          <img
            className="main-nav-logo-image"
            src={logo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div>
          {isConnect === false ? <Link className="main-nav-item" to="/sign-in">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link> : <><Link className="main-nav-item" to='/user'>
            <i className="fa fa-user-circle"></i>
            {firstName}
          </Link><Link className="main-nav-item"  onClick={() => dispatch(logOut())} to='/' >
              <i className="fa fa-sign-out"></i>
              Sign Out
            </Link></>}
        </div>
      </nav>
      <main>
        <div className="hero">
          <section className="hero-content">
            <h2 className="sr-only">Promoted Content</h2>
            <p className="subtitle">No fees.</p>
            <p className="subtitle">No minimum deposit.</p>
            <p className="subtitle">High interest rates.</p>
            <p className="text">Open a savings account with Argent Bank today!</p>
          </section>
        </div>
        <section className="features">
          <h2 className="sr-only">Features</h2>
          <div className="feature-item">
            <img src={chat} alt="Chat Icon" className="feature-icon" />
            <h3 className="feature-item-title">You are our #1 priority</h3>
            <p>
              Need to talk to a representative? You can get in touch through our
              24/7 chat or through a phone call in less than 5 minutes.
            </p>
          </div>
          <div className="feature-item">
            <img
              src={money}
              alt="Chat Icon"
              className="feature-icon"
            />
            <h3 className="feature-item-title">More savings means higher rates</h3>
            <p>
              The more you save with us, the higher your interest rate will be!
            </p>
          </div>
          <div className="feature-item">
            <img
              src={security}
              alt="Chat Icon"
              className="feature-icon"
            />
            <h3 className="feature-item-title">Security you can trust</h3>
            <p>
              We use top of the line encryption to make sure your data and money
              is always safe.
            </p>
          </div>
        </section>
      </main>
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>

    </>
  );
}


export default connect()(Home)