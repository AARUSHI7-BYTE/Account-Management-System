import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function Signup(){

  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState("")

  const navigate = useNavigate()

  const handleSignup = async () => {

    try{

      setLoading(true)
      setError("")

      await axios.post(
        "http://localhost:5000/api/auth/signup",
        {
          name,
          email,
          password
        }
      )

      alert("Account created successfully")

      navigate("/login")

    }catch(err){

      setError(err.response?.data?.message || "Signup failed")

    }finally{
      setLoading(false)
    }
  }

  return (

    <div style={{width:"300px",margin:"100px auto"}}>

      <h2>Signup</h2>

      {error && <p style={{color:"red"}}>{error}</p>}

      <input
        placeholder="Name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
      />

      <br/><br/>

      <input
        placeholder="Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />

      <br/><br/>

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />

      <br/><br/>

      <button onClick={handleSignup} disabled={loading}>

        {loading ? "Creating..." : "Signup"}

      </button>

    </div>

  )
}