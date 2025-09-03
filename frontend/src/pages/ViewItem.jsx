import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { getOneItem } from '../api/api.js';


function ViewItem() {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [edit, setEdit] = useState(false);


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

  async function updateItem(formData) {

  }

  function switchView() {
    setEdit(!edit);
  }

  if (!item) {
    return (<>Loading</>)
  }

  return (
    <div className="view-item">
      <h1>Item Details</h1>
      <button onClick={() => switchView()} disabled={edit}>Edit Item</button><br />
      <form className="view-form" action={updateItem}>
        <label>Item ID:</label><br />
        <input type="integer" disabled={true} name="item_id" defaultValue={item[0].item_id} />
        <br />
        <label>Owning User:</label><br />
        <input type="integer" disabled={true} name="user_id" defaultValue={item[0].user} />
        <br />
        <label>Item Name:</label><br />
        <input type="text" disabled={!edit} name="item_name" defaultValue={item[0].item_name} />
        <br />
        <label>Description:</label><br />
        <input type="text" disabled={!edit} name="description" defaultValue={item[0].description} />
        <br />
        <label>Quantity:</label><br />
        <input type="integer" disabled={!edit} name="quantity" defaultValue={item[0].quantity} />
        <button type="submit" disabled={!edit}>Save</button>
      </form>


    </div>
  )
}

export default ViewItem
