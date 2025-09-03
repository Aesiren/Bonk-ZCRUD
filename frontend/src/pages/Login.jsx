import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext.js";
import { Link, useNavigate } from "react-router-dom";
import { userLogin, getUser } from "../api/api.js";

function Login() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  async function checkLogin(formData) {
    let userName = formData.get('username');
    let password = formData.get('password');

    let userId = await userLogin(userName, password);
    console.log(userId);
    if (userId.user_id > 0) {
      let currentUser = await getUser(userId.user_id);
      console.log(currentUser);
      setUser(currentUser[0]);
      navigate(`/items`);
    }
  }


  return (
    <div className="login">
      <h1>Login</h1>
      <form className="login-form" action={checkLogin}>
        <label>Username:</label>
        <input type="text" name="username" required="true" />
        <label>Password:</label>
        <input type="text" name="password" required="true" />
        <button className="submitLogin" type="submit">Login</button>
      </form>
    </div>
  )
}
export default Login
