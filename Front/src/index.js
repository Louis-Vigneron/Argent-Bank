import React from 'react';
import ReactDOM from 'react-dom/client';
import './Styles/normalize.css';
import './Styles/main.css';
import Home from './Pages/Home.jsx';
import SignIn from './Pages/SignIn.jsx';
import User from './Pages/User.jsx';
import ErrorPage from './Pages/ErrorPage.jsx';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";
import { useSelector } from 'react-redux';
import { Provider } from 'react-redux';
import { store } from './Utils/Redux';

const UserRoute = () => {
  const token = useSelector((state) => state.token);
  const isConnect = useSelector((state) => state.isAuthenticated);
  if (token === '' || isConnect === false) {
    return <Navigate to="/sign-in" replace />;
  } else {
    return <User />;
  }
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/user",
    element: <UserRoute />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
