import { supabase } from "../config/supabaseclient.js"

export const getBalance = async (req, res) => {

  const { data } = await supabase
    .from("users")
    .select("balance")
    .eq("id", req.user.id)
    .single()

  res.json(data)
}

export const transferMoney = async (req, res) => {

  const { receiverEmail, amount } = req.body

  const { data: sender } = await supabase
    .from("users")
    .select("*")
    .eq("id", req.user.id)
    .single()

  if (sender.balance < amount)
    return res.status(400).json({ message: "Insufficient balance" })

  const { data: receiver } = await supabase
    .from("users")
    .select("*")
    .eq("email", receiverEmail)
    .single()

  if (!receiver)
    return res.status(400).json({ message: "Receiver not found" })

  const senderNew = sender.balance - amount
  const receiverNew = receiver.balance + amount

  await supabase
    .from("users")
    .update({ balance: senderNew })
    .eq("id", sender.id)

  await supabase
    .from("users")
    .update({ balance: receiverNew })
    .eq("id", receiver.id)

  await supabase.from("transactions").insert([
    {
      sender_id: sender.id,
      receiver_id: receiver.id,
      amount,
      transaction_type: "debit"
    },
    {
      sender_id: sender.id,
      receiver_id: receiver.id,
      amount,
      transaction_type: "credit"
    }
  ])

  res.json({ message: "Transfer successful" })
}

export const getStatement = async (req, res) => {

  const { data } = await supabase
    .from("transactions")
    .select("*")
    .or(`sender_id.eq.${req.user.id},receiver_id.eq.${req.user.id}`)
    .order("created_at", { ascending: false })

  res.json(data)
}
