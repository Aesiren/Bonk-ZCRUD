import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { getOneItem } from '../api/api.js';


function ViewItem() {
  const { itemId } = useParams();
  const [item, setItem] = useState(null)

  useEffect(() => {
    const getItem = async () => {
      let temp = await getOneItem(itemId);
      setItem(temp);
    }
    getItem();

    console.log(itemId);
    console.log(item);
  }, [])


  return (
    <div className="view-item">
      <h1>Item Details</h1>

      <label>Item ID:</label>
      <span>{item.item_id}</span>

      <label>Owning User:</label>
      <span>{item.user}</span>

      <label>Item Name:</label>
      <span>{item.item_name}</span>

      <label>Description:</label>
      <span>{item.description}</span>

      <label>Quantity:</label>
      <span>{item.quantity}</span>

    </div>
  )
}

export default ViewItem
