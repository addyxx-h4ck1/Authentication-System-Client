import { useRef, useState } from 'react'
import './App.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import EmptyValues from './popups/EmptyValues'
import Loader from './loaders/Loader'

function App() {
  //hooks
  const [loading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState([])
  const navigate = useNavigate()
  //values references
  let userRef = useRef('')
  let pwdRef = useRef('')
  let confirmPwdRef = useRef('')
  //handle sign-up
  const handleSignUp = async (e) => {
    e.preventDefault()
    if (
      !userRef.current.value ||
      !pwdRef.current.value ||
      !confirmPwdRef.current.value
    ) {
      setMessage(['Cannot submit empty values', 'red'])
      setError(true)
      setTimeout(() => {
        setError(false)
      }, 2000)
      return
    }
    //check if values match
    if (pwdRef.current.value !== confirmPwdRef.current.value) {
      setMessage(['Passwords did not match', 'red'])
      setError(true)
      setTimeout(() => {
        setError(false)
      }, 2000)
      return
    }
    //create form object
    const newUserData = new FormData(e.currentTarget)
    const formData = Object.fromEntries(newUserData.entries())
    //send data to server for validation (AXIOS LIB)
    try {
      setIsLoading(true)
      let API_ENDPOINT =
        'https://authentication-system-server.onrender.com/api/v1/signup'
      let req = await axios.post(API_ENDPOINT, formData)
      //check if the ops was successful
      console.log(req.data)
      if (req.data.ok) {
        setMessage(['Account created successfully', 'green'])
        userRef.current.value = ''
        pwdRef.current.value = ''
        confirmPwdRef.current.value = ''
        setError(true)
        setIsLoading(false)
        setTimeout(() => {
          navigate('/login')
          setError(false)
        }, 2000)
        return
      }
    } catch (error) {
      if (error.response.data.msg === 'User already exist') {
        setMessage(['User already exist', 'red'])
        setError(true)
        setIsLoading(false)
        setTimeout(() => {
          setError(false)
        }, 1000)
        return
      }
      setMessage(['There was an unexpected error', 'red'])
      setError(true)
      setIsLoading(false)
      setTimeout(() => {
        setError(false)
      }, 1000)
      console.log(error)
    }
  }

  //navigate to login
  const goToLogin = () => {
    navigate('/login')
  }
  return (
    <section className="signup-page">
      <h2>Signup</h2>
      <form onSubmit={(e) => handleSignUp(e)}>
        <input
          type="text"
          name="user"
          id="username"
          placeholder="Username"
          ref={userRef}
        />
        <input
          type="password"
          name="password"
          id="create-password"
          placeholder="Create password"
          ref={pwdRef}
        />
        <input
          type="text"
          name="con-password"
          id="con-password"
          placeholder="Confirm password"
          ref={confirmPwdRef}
        />
        {loading ? <Loader /> : <button className="submit-form">Signup</button>}
      </form>
      <div className="signup-alt">
        <p>Already have an account?</p>
        <button onClick={goToLogin}>Login</button>
      </div>
      {error ? <EmptyValues message={message} /> : null}
    </section>
  )
}

export default App
