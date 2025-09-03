import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { addItem } from "../api/api.js";
import Alert from '@mui/material/Alert';


export default function AddItem() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();


  async function addData(formData) {
    let data = {
      user: user.user_id,
      item_name: formData.get('item_name'),
      description: formData.get('description'),
      quantity: formData.get('quantity')
    }

    await addItem(data);

    navigate('/items');

  }

  if (!user) {
    return (
      <Alert variant="filled" severity="error">
        <h1>You can only add items as a registered user.</h1><br />
        <h1>Please <Link to="/login">Login</Link> or <Link to="/signup">Signup</Link> to continue.</h1>
      </Alert>
    )
  }
  return (
    <div className="addItem">
      <form className="addForm" action={addData}>
        <label>Item Name:</label><br />
        <input type="text" name="item_name" /><br />
        <label>Item Description:</label><br />
        <input type="text" name="description" /><br />
        <label>Quantity:</label><br />
        <input type="number" name="quantity" /><br />
        <button type="submit">Save</button>


      </form>

    </div>
  )
}