import { useState } from 'react'
import { Routes, Route, Link } from "react-router-dom";
import '../css/App.css'
import Sidebar from "./Sidebar";
import Login from "./Login";
import ItemView from "./ItemView";
import ViewItem from "./ViewItem";
import Signup from "./Signup";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">


      <Header />
      <div className="sidebar">
        <Sidebar />
      </div>

      <div id="main">
        <Routes>
          <Route path="/" element={<Login />} />
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
export default App
