import axios from "axios"
import { useEffect, useState } from "react"

export default function Dashboard(){

const [balance,setBalance]=useState(0)

useEffect(()=>{

const token = localStorage.getItem("token")

axios.get(
"http://localhost:3490/api/account/balance",
{
headers:{
Authorization:`Bearer ${token}`
}
}
)
.then(res=>setBalance(res.data.balance))

},[])

return(

<div>

<h1>Dashboard</h1>

<h2>Balance : ₹{balance}</h2>

</div>

)
}