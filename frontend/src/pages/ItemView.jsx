import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllItems, getItemsByUser, deleteItem } from "../api/api.js";
import { UserContext } from "../context/UserContext";
import ConfirmDialog from "../components/Dialog.jsx";
import Alert from '@mui/material/Alert';

function ItemView() {
  const [items, setItems] = useState([]);
  const [userItems, setUserItems] = useState([]);
  const { user } = useContext(UserContext);
  const [userView, setUserView] = useState(false);
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    const temp = async () => {
      let data = await getAllItems();
      console.log(data);
      setItems(data);
    }
    temp();

    if (user.user_id > 0) {
      const temp = async () => {
        let data = await getItemsByUser(user.user_id);
        setUserItems(data);
      }
      temp();
      setUserView(true);
    } else {
      setUserView(false);
    }
  }, []);

  async function deleteItemClick(itemId, itemOwner) {
    if (itemOwner === user.user_id) {
      setItemToDelete(itemId);
      setDialogOpen(true);

    } else {
      setAlert(true)
    }
  }

  async function onConfirm(itemId) {
    console.log("Deleting item ", itemId);
    await deleteItem(itemId);
    let temp = await getItemsByUser(user.user_id);
    setUserItems(temp);
    setDialogOpen(false);
  }

  function onDeny() {
    setDialogOpen(false);
  }

  function turnOffAlert() {
    setAlert(false);
  }
  function switchView() {
    setUserView(!userView)
  }


  if (userView) {
    return (
      <div className="itemview">
        <h1>My Items</h1>
        {dialogOpen && (
          <ConfirmDialog confirm={onConfirm} deny={onDeny} itemId={itemToDelete} />
        )}
        {alert && (
          <Alert severity="error" onClose={() => turnOffAlert()}>
            Only the owner can delete an item.
          </Alert>
        )}
        <button onClick={() => switchView()}>All Items</button>
        <button onClick={() => { navigate('/items/new') }}>Add Item</button>

        <div className="itemTable">
          <table>
            <tr>
              <th>Id</th>
              <th>Owner</th>
              <th>Name</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Options</th>
            </tr>
            {userItems.map((item, key) => {
              return (<tr>
                <td>{item.item_id}</td>
                <td>{item.user}</td>
                <td>{item.item_name}</td>
                <td>{item.description}</td>
                <td>{item.quantity}</td>
                <td>
                  <Link to={`/items/${item.item_id}`}><button>View</button></Link>
                  <button onClick={() => deleteItemClick(item.item_id, item.user)}>Delete</button>
                </td>

              </tr>)
            })}
          </table>

        </div>
      </div>
    )

  } else {
    return (
      <div className="itemview">
        <h1>All Items</h1>
        {dialogOpen && (
          <ConfirmDialog confirm={onConfirm} deny={onDeny} itemId={itemToDelete} />
        )}
        {alert && (
          <Alert severity="error" onClose={() => turnOffAlert()}>
            Only the owner can delete an item.
          </Alert>
        )}
        <button onClick={() => switchView()}>My Items</button>
        <button onClick={() => { navigate('/items/new') }}>Add Item</button>

        <div className="itemTable">
          <table>
            <tr>
              <th>Id</th>
              <th>Owner</th>
              <th>Name</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Options</th>
            </tr>
            {items.map((item, key) => {
              return (<tr>
                <td>{item.item_id}</td>
                <td>{item.user}</td>
                <td>{item.item_name}</td>
                <td>{item.description}</td>
                <td>{item.quantity}</td>
                <td>
                  <Link to={`/items/${item.item_id}`}><button>View</button></Link>
                  <button onClick={() => deleteItemClick(item.item_id, item.user)}>Delete</button>
                </td>

              </tr>)
            })}
          </table>

        </div>
      </div>
    )
  }

}
export default ItemView
