import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { getOneItem } from '../api/api.js';


function ViewItem() {
  const { itemId } = useParams();
  const [item, setItem] = useState(null)

  useEffect(() => {
    const getItem = async () => {
      try {
        let temp = await getOneItem(itemId);
        setItem(temp);
      } catch (err) {
        console.error("Failed to fetch data")
      }

    }
    getItem();
  }, [itemId])

  useEffect(() => {
    if (item) {
      console.log("Item updated ", item, item[0].item_id);
    }
  }, [item])

  if (!item) {
    return (<>Loading</>)
  }

  return (
    <div className="view-item">
      <h1>Item Details</h1>

      <label>Item ID:</label>
      <label>{item[0].item_id}</label>
      <br />
      <label>Owning User:</label>
      <label>{item[0].user}</label>
      <br />
      <label>Item Name:</label>
      <label>{item[0].item_name}</label>
      <br />
      <label>Description:</label>
      <label>{item[0].description}</label>
      <br />
      <label>Quantity:</label>
      <label>{item[0].quantity}</label>

    </div>
  )
}

export default ViewItem
