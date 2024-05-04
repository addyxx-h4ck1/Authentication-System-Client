import { useRef, useState, createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import EmptyValues from './popups/EmptyValues'
import Loader from './loaders/Loader'

function Login() {
  //hooks
  const [loading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState([])
  //value (entries) references
  let loginUser = useRef('')
  let loginPassword = useRef('')
  //handle login function
  const handleLogin = async (e) => {
    e.preventDefault()
    //check for empty entries
    if (!loginUser.current.value || !loginPassword.current.value) {
      setMessage(['Cannot submit empty values', 'red'])
      setError(true)
      setTimeout(() => {
        setError(false)
      }, 2000)
      return
    }
    //create Object to send to server
    const entryData = new FormData(e.currentTarget)
    const formData = Object.fromEntries(entryData.entries())
    //send data to the server (AXIOS LIB)
    try {
      setIsLoading(true)
      let API_ENDPOINT =
        'https://authentication-system-server.onrender.com/api/v1/login'
      const req = await axios.post(API_ENDPOINT, formData)
      //if successful
      loginUser.current.value = ''
      loginPassword.current.value = ''
      setMessage([`welcome back ${loginUser.current.value}`, 'green'])
      setError(true)
      setIsLoading(false)
      setTimeout(() => {
        navigate(`/dashboard/users/${req.data.ID}`, { state: req.data })
        setError(false)
      }, 2000)
      //if error
    } catch (error) {
      if (error.response.data.err === 'invalid credentials') {
        setMessage(['oops! wrong password', 'red'])
        setIsLoading(false)
        setError(true)
        setTimeout(() => {
          setError(false)
        }, 2000)
        return
      }
      if (error.response.data.err === 'user not found') {
        setMessage(['oops! user not found', 'red'])
        setIsLoading(false)
        setError(true)
        setTimeout(() => {
          setError(false)
        }, 2000)
        return
      }
      setMessage(['There was an unexpected error', 'red'])
      setIsLoading(false)
      setError(true)
      setTimeout(() => {
        setError(false)
      }, 2000)
      console.log(error.response)
    }
  }
  const navigate = useNavigate()
  const goToSignup = () => {
    navigate('/')
  }
  return (
    <section className="signup-page">
      <h2>Login</h2>
      <form onSubmit={(e) => handleLogin(e)}>
        <input
          type="text"
          name="user"
          id="user"
          placeholder="Username"
          ref={loginUser}
        />
        <input
          type="password"
          name="password"
          id="create-pwd"
          placeholder="password"
          ref={loginPassword}
        />
        {loading ? <Loader /> : <button className="submit-form">Login</button>}
      </form>
      <div className="signup-alt">
        <p>Don't have an account?</p>
        <button onClick={goToSignup}>Signup</button>
      </div>
      {error ? <EmptyValues message={message} /> : null}
    </section>
  )
}

export default Login
