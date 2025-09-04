import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext.js";
import { Link, useNavigate } from "react-router-dom";
import { userLogin, getUser } from "../api/api.js";
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';

function Login() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [snack, setSnack] = useState(false);


  const action = (
    <>
      <Button color="secondary" size="small" onClick={CloseSnackbar}>
        OK
      </Button>
    </>
  )
  async function checkLogin(formData) {
    let userName = formData.get('username');
    let password = formData.get('password');

    let userId = await userLogin(userName, password);
    console.log(userId);

    if (userId.user_id > 0) {
      let currentUser = await getUser(userId.user_id);
      console.log(currentUser);
      setUser(currentUser[0]);
      LaunchSnackbar();

    }
  }

  function LaunchSnackbar() {
    setSnack(true);
  }

  function CloseSnackbar() {
    navigate(`/items`);
  }


  return (
    <div className="login">
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: 'center' }}
        open={snack}
        onClose={CloseSnackbar}
        message="You have been logged in!"
        autoHideDuration={2000}
        action={action}
      />
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
