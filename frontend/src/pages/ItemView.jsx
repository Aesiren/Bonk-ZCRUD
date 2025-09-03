import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllItems, getItemsByUser } from "../api/api.js";
import { UserContext } from "../context/UserContext";

function ItemView() {
  const [items, setItems] = useState([]);
  const [userItems, setUserItems] = useState([]);
  const { user } = useContext(UserContext);
  const [userView, setUserView] = useState(false);
  const navigate = useNavigate();

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

  function deleteItem(itemId) {
    console.log("delete button clicked")
  }

  function switchView() {
    setUserView(!userView)
  }


  if (userView) {
    return (
      <div className="itemview">
        <h1>Item View</h1>

        <button onClick={() => switchView()}>All Items</button>
        <button onClick={() => { navigate('/item/new') }}>Add Item</button>

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
                  <button onClick={() => deleteItem(item.item_id)}>Delete</button>
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
        <h1>Item View</h1>

        <button onClick={() => switchView()}>My Items</button>

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
                  <button onClick={() => deleteItem(item.item_id)}>Delete</button>
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
