import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { addUser, checkUserByName, userLogin, getUser } from "../api/api.js"
import { UserContext } from "../context/UserContext";
import Alert from '@mui/material/Alert';

function Signup() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [userAlert, setUserAlert] = useState(false);
  const [passAlert, setPassAlert] = useState(false);

  async function addData(formData) {
    const first_name = formData.get("first_name");
    const last_name = formData.get("last_name");
    const username = formData.get("username");
    const pass1 = formData.get("password1");
    const pass2 = formData.get("password2");

    let usernameCheck = await checkUserByName(username);
    let passCheck = await checkPassword(pass1, pass2)

    let userID;
    let currentUser;

    if (!usernameCheck) {
      //('Username already exists. Please choose a different username')
      setUserAlert(true);
    }
    if (!passCheck) {
      //alert('Passwords do not match')
      setPassAlert(true);
    }

    if (usernameCheck && passCheck) {
      let data = {
        first_name: first_name,
        last_name: last_name,
        username: username,
        password: pass1
      }

      addUser(data);
      //add check to see if in system

      let newData = await checkUserByName(username);

      console.log(newData);

      if (newData) {
        userID = await userLogin(username, pass1);
        if (userID.user_id > 0) {
          const setData = async () => {
            currentUser = await getUser(userID.user_id);
            setUser(currentUser);
            alert('Creation successful! You have been logged in');
            navigate('/items');
          }
          setData();
        }
      }
    }
    else {
      //reset form
    }
  }

  function resetAlert() {
    setUserAlert(false);
    setPassAlert(false);
  }

  function checkPassword(pass1, pass2) {
    if (pass1 === pass2) {
      return true;
    } else {
      return false;
    }
  }


  return (
    <div className="signup">
      <h1>Signup</h1>
      <form className="signup-form" action={addData}>
        <label>First Name:</label><br />
        <input type="text" name="first_name" /><br />
        <label>Last Name:</label><br />
        <input type="text" name="last_name" /><br />
        <label>Username:</label><br />
        <input type="text" name="username" /><br />
        <label>Password:</label><br />
        <input type="password" name="password1" /><br />
        <label>Re-Enter Password:</label><br />
        <input type="password" name="password2" /><br />
        <button type="submit">Create Account</button>
      </form>
      {userAlert && (
        <Alert severity="error" onClose={() => resetAlert()}>
          Username already exists
        </Alert>
      )}
      {passAlert && (
        <Alert severity="error" onClose={() => resetAlert()}>
          Passwords do not match
        </Alert>
      )}
    </div>
  )
}
export default Signup
