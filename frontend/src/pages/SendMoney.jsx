import axios from "axios"
import { useState } from "react"

export default function SendMoney(){

  const [email,setEmail] = useState("")
  const [amount,setAmount] = useState("")

  const send = async () => {

    try{

      const token = localStorage.getItem("token")

      const res = await axios.post(
        "http://localhost:3490/api/account/transfer",
        {
          receiverEmail: email,
          amount: Number(amount)
        },
        {
          headers:{
            Authorization: `Bearer ${token}`
          }
        }
      )

      alert("Transfer successful")

      console.log(res.data)

    }catch(err){

      console.log(err)

      alert(
        err.response?.data?.message ||
        "Transfer failed"
      )

    }
  }

  return(

    <div>

      <h2>Send Money</h2>

      <input
        placeholder="Receiver Email"
        onChange={e => setEmail(e.target.value)}
      />

      <br/><br/>

      <input
        placeholder="Amount"
        onChange={e => setAmount(e.target.value)}
      />

      <br/><br/>

      <button onClick={send}>
        Send
      </button>

    </div>

  )
}