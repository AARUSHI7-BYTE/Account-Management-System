import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function Account(){

  const [balance,setBalance] = useState(0)
  const [loading,setLoading] = useState(true)
  const [error,setError] = useState("")

  const navigate = useNavigate()

  useEffect(()=>{

    const fetchBalance = async ()=>{

      try{

        const token = localStorage.getItem("token")

        const res = await axios.get(
          "http://localhost:5000/api/account/balance",
          {
            headers:{
              Authorization:`Bearer ${token}`
            }
          }
        )

        setBalance(res.data.balance)

      }catch(err){

        setError("Failed to load balance")

      }finally{
        setLoading(false)
      }

    }

    fetchBalance()

  },[])


  if(loading){
    return <h3>Loading account...</h3>
  }

  return(

    <div style={{textAlign:"center",marginTop:"80px"}}>

      <h1>Account Dashboard</h1>

      {error && <p style={{color:"red"}}>{error}</p>}

      <h2>Current Balance</h2>

      <h1 style={{color:"green"}}>₹{balance}</h1>

      <br/>

      <button onClick={()=>navigate("/send")}>
        Send Money
      </button>

      <br/><br/>

      <button onClick={()=>navigate("/statement")}>
        View Statement
      </button>

    </div>
  )
}