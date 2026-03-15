import { Route,Routes } from "react-router-dom"

import Signup from "./pages/signup.jsx"
import Login from "./pages/Login.jsx"
import Account from "./pages/account.jsx"
import SendMoney from "./pages/sendmoney.jsx"
import Statement from "./pages/Statement.jsx"

import ProtectedRoute from "../components/Protectedroutes.jsx"

function App() {

  return (
    <Routes>

      <Route path="/" element={<Signup/>} />

      <Route path="/login" element={<Login/>} />

      <Route path="/signup" element={<Signup/>} />

      <Route
        path="/account"
        element={
          <ProtectedRoute>
            <Account/>
          </ProtectedRoute>
        }
      />

      <Route
        path="/send"
        element={
          <ProtectedRoute>
            <SendMoney/>
          </ProtectedRoute>
        }
      />

      <Route
        path="/statement"
        element={
          <ProtectedRoute>
            <Statement/>
          </ProtectedRoute>
        }
      />

    </Routes>
  )
}

export default App