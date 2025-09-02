import { useState, useEffect } from "react";
import { getAllItems } from "../api/api.js";

function ItemView() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const temp = async () => {
      let data = await getAllItems();
      console.log(data);
      setItems(data);
    }
    temp();

  }, []);


  return (
    <div className="itemview">
      <h1>Item View</h1>

      <button>My Items</button>

      <div className="itemTable">
        <table>
          <tr>
            <th>Id</th>
            <th>Owner</th>
            <th>Name</th>
            <th>Description</th>
            <th>Quantity</th>
          </tr>
          {items.map((item, key) => {
            return (<tr>
              <td>{item.item_id}</td>
              <td>{item.user}</td>
              <td>{item.item_name}</td>
              <td>{item.description}</td>
              <td>{item.quantity}</td>
            </tr>)
          })}
        </table>

      </div>
    </div>
  )
}
export default ItemView
