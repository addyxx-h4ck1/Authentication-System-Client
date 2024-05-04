import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import Loader from './loaders/Loader'

const Dashboard = () => {
  const loggedUser = useLocation()
  const navigate = useNavigate()
  const [userName, setUserName] = useState('Dashboard')
  const [loading, setIsLoading] = useState(false)

  //get logged User accessToken
  const { ID, accessToken } = loggedUser.state

  //send a request to the server to get the logged-in user data
  async function getUserData() {
    setIsLoading(true)
    let API_ENDPOINT =
      'https://authentication-system-server.onrender.com/dashboard'
    const req = await axios.request({
      url: 'https://authentication-system-server.onrender.com/dashboard',
      method: 'GET',
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    setUserName(req.data.userData.user)
    setIsLoading(false)
  }

  //call function on if logged user exist
  useEffect(() => {
    !loggedUser.state ? null : getUserData()
  }, [])

  //handle Logout
  const handleLogout = () => {
    setIsLoading(true)
    setTimeout(() => {
      navigate('/login', { state: null, replace: true })
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div>
      <div className="dashboard">
        <p>{format(new Date(), 'dd/MM/yyyy')}</p>
        <p>{userName}</p>
      </div>
      {!loading ? (
        <div>
          <p className="dashboard-msg">Welcome to Your Dashboard!!</p>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <Loader />
      )}
      {/* check if theres a logged in user is null restrict access */}
      {!loggedUser.state ? <Navigate to={'/login'} /> : null}
    </div>
  )
}

export default Dashboard
