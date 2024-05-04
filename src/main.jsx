import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Login from './Login.jsx'
import Dashboard from './Dashboard.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/dashboard/users/:user',
    element: <Dashboard />,
  },
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
