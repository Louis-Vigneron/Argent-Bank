import React from 'react';
import ReactDOM from 'react-dom/client';
import './Styles/normalize.css';
import './Styles/main.css';
import Home from './Pages/Home.jsx';
import SignIn from './Pages/SignIn.jsx';
import User from './Pages/User.jsx';
import reportWebVitals from './reportWebVitals';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { Provider } from 'react-redux'
import { store } from './Utils/Reducer'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/user",
    element: <User />,
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
