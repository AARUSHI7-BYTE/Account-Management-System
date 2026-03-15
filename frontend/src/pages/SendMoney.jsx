import axios from "axios"
import { useState } from "react"

export default function SendMoney(){

const [email,setEmail]=useState("")
const [amount,setAmount]=useState("")

const send = async()=>{

const token = localStorage.getItem("token")

await axios.post(
"http://localhost:3490/api/account/transfer",
{receiverEmail:email,amount:Number(amount)},
{
headers:{Authorization:`Bearer ${token}`}
}
)

alert("Transfer successful")

}

return(

<div>

<h2>Send Money</h2>

<input placeholder="Receiver Email"
onChange={e=>setEmail(e.target.value)}
/>

<input placeholder="Amount"
onChange={e=>setAmount(e.target.value)}
/>

<button onClick={send}>
Send
</button>

</div>

)
}