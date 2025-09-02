import { useState } from 'react'
import { Routes, Route, Link } from "react-router-dom";
import '../css/App.css'
import Login from "./Login";
import ItemView from "./ItemView";
import ViewItem from "./ViewItem";
import Signup from "./Signup";
import Home from "./Home";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">


      <Header />
      <Sidebar />

      <div id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/items" element={<ItemView />} />
          <Route path="/items/:itemId" element={<ViewItem />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>

    </div>
  )
}

function Header() {

  return (
    <div className="header">
      <h1>CRUD App</h1>
    </div>
  )
}

function Sidebar() {
  return (
    <div className="sidebar">
      <h1>Sidebar</h1>
      <Link to="/"><button>Home</button></Link><br />
      <Link to="/login"><button>Login</button></Link><br />
      <Link to="/items"><button>All Items</button></Link>

    </div>
  )
}
export default App
