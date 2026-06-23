import { useState } from 'react'

import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import AppRoutes from './Routes/AppRoutes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AppRoutes/>
    </>
  )
}

export default App
