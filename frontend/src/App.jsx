import './App.css'
import { Link } from 'react-router-dom'

function App() {

  return (
    <>
      <h1>Hello world</h1>
      <Link to="/login">Login</Link>
      <Link to="/signup">Sign Up</Link>
    </>
  )
}

export default App
