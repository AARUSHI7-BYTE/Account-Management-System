import axios from "axios"
import { useState, useContext } from "react"
import { AuthContext } from "../../context/authcontext"
import { useNavigate } from "react-router-dom"

export default function Login() {

  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const { login } = useContext(AuthContext)

  const navigate = useNavigate()

  const submit = async () => {

    const res = await axios.post(
      "http://localhost:3490/api/auth/login",
      { email, password }
    )

    login(res.data.token)

    navigate("/account")
  }

  return (
    <div>

      <h2>Login</h2>

      <input
        placeholder="email"
        onChange={e=>setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="password"
        onChange={e=>setPassword(e.target.value)}
      />

      <button onClick={submit}>
        Login
      </button>

    </div>
  )
}