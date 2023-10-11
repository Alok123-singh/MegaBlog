import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Home from './pages/Home.jsx'
import { AuthLayout, Login } from './components/index.js'

import AddPost from "./pages/AddPost";
import Signup from './pages/Signup'
import EditPost from "./pages/EditPost";
import MyAccount from './pages/MyAccount.jsx'
import UpdateEmail from './pages/UpdateEmail.jsx'
import UpdatePassword from './pages/UpdatePassword.jsx'
import UpdateUsername from './pages/UpdateUsername.jsx'

import Post from "./pages/Post";

import AllPosts from "./pages/AllPosts";

// const router = createBrowserRouter(
//     createRoutesFromElements(
//       <Route path='/' element={<AuthLayout authentication={false}> <App /> </AuthLayout> } >
//         <Route path='' element={<AuthLayout authentication={false}> <Home /> </AuthLayout>} />
//         <Route path='login' element={<AuthLayout authentication={false}> <Login /> </AuthLayout>} />
//         <Route path='signup' element={<AuthLayout authentication={false}> <Signup /> </AuthLayout>} />
//         <Route path='all-posts' element={<AuthLayout authentication> <AllPosts /> </AuthLayout>} />
//         <Route path='add-post' element={<AuthLayout authentication> <AddPost /> </AuthLayout>} />
//         <Route path='edit-post/:slug' element={<AuthLayout authentication> <EditPost/> </AuthLayout>} />
//         <Route path='my-account' element={<AuthLayout authentication> <MyAccount /> </AuthLayout>} />
//         <Route path='update-email' element={<AuthLayout authentication> <UpdateEmail /> </AuthLayout>} />
//         <Route path='update-password' element={<AuthLayout authentication> <UpdatePassword /> </AuthLayout>} />
//         <Route path='update-username' element={<AuthLayout authentication> <UpdateUsername /> </AuthLayout>} />
//         <Route path='post/:slug' element={<AuthLayout authentication={false}> <Post /> </AuthLayout>} />
//       </Route>
//     )
//   )

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: (
                <AuthLayout authentication={false}>
                    <Login />
                </AuthLayout>
            ),
        },
        {
            path: "/signup",
            element: (
                <AuthLayout authentication={false}>
                    <Signup />
                </AuthLayout>
            ),
        },
        {
            path: "/all-posts",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AllPosts />
                </AuthLayout>
            ),
        },
        {
            path: "/add-post",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AddPost />
                </AuthLayout>
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <EditPost />
                </AuthLayout>
            ),
        },
        {
            path: "/my-account",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <MyAccount />
                </AuthLayout>
            )
        },
        {
        path: "/update-email",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <UpdateEmail />
                </AuthLayout>
            )
        },
        {
        path: "/update-username",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <UpdateUsername />
                </AuthLayout>
            )
        },
        {
        path: "/update-password",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <UpdatePassword />
                </AuthLayout>
            )
        },
        {
            path: "/post/:slug",
            element: <Post />,
        },
    ],
},
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)