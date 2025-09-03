import { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { editUser, getUser } from "../api/api.js";

export default function EditProfile() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  async function editData(formData) {
    const firstname = formData.get("first_name") != "" ? formData.get("first_name") : user.first_name;
    const lastname = formData.get("last_name") != "" ? formData.get("last_name") : user.last_name;
    const username = formData.get("username") != "" ? formData.get("username") : user.username;
    const password = formData.get("password") != "" ? formData.get("password") : user.password;



    const data = {
      first_name: firstname,
      last_name: lastname,
      username: username,
      password: password
    }

    const submitEdit = async () => {
      await editUser(user.user_id, data);
    }
    submitEdit();

    const newData = await getUser(user.user_id);
    setUser(newData[0]);
    navigate(`/`);

  }

  return (
    <div className="editProfile">
      <form className="profile" action={editData}>
        <label>User Id: {user.user_id}</label>
        <label>First Name:</label>
        <input type="text" name="first_name" default={user.first_name} />
        <label>Last Name:</label>
        <input type="text" name="last_name" default={user.last_name} />
        <label>Username: </label>
        <input type="text" name="username" default={user.username} />
        <label>Password: </label>
        <input type="password" name="password" />
        <button type="submit">Save</button>

      </form>

    </div>
  )

}