import axios from "axios"
import { useEffect,useState } from "react"

export default function Statement(){

const [data,setData]=useState([])

useEffect(()=>{

const token = localStorage.getItem("token")

axios.get(
"http://localhost:5000/api/account/statement",
{
headers:{Authorization:`Bearer ${token}`}
}
)
.then(res=>setData(res.data))

},[])

return(

<table>

<tr>
<th>Date</th>
<th>Type</th>
<th>Amount</th>
</tr>

{data.map((t,i)=>(
<tr key={i}
style={{
color: t.transaction_type==="credit"?"green":"red"
}}
>

<td>{t.created_at}</td>
<td>{t.transaction_type}</td>
<td>{t.amount}</td>

</tr>
))}

</table>

)
}