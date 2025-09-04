import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { getOneItem, editItem } from '../api/api.js';
import { UserContext } from '../context/UserContext';
import Alert from '@mui/material/Alert'


function ViewItem() {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [edit, setEdit] = useState(false);
  const { user } = useContext(UserContext);
  const [addAlert, setAddAlert] = useState(false);
  const [ownAlert, setOwnAlert] = useState(false)
  const navigate = useNavigate();


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
    if (user.user_id > 0) {
      const data = {
        user: user.user_id,
        item_name: formData.get('item_name'),
        description: formData.get('description'),
        quantity: formData.get('quantity')
      }

      await editItem(itemId, data);

      let temp = await getOneItem(itemId);
      setItem(temp);

      switchView();
      navigate('/items');
    }
    else {
      //alert('You must be logged in to add an item')
      setAddAlert(true);
    }
  }

  function switchView() {
    if (user.user_id === item[0].user) {
      setEdit(!edit);
    } else {
      //alert('Only the owning user can edit an item')
      setOwnAlert(true);
    }

  }

  function turnOffAlert() {
    setAddAlert(false);
    setOwnAlert(false);
  }

  if (!item) {
    return (<>Loading</>)
  }

  return (
    <div className="view-item">
      <h1>Item Details</h1>
      {addAlert && (
        <Alert severity="error" onClose={() => turnOffAlert()}>
          <h3>You must be logged in to add an item</h3>
        </Alert>
      )}

      {ownAlert && (
        <Alert severity="error" onClose={() => turnOffAlert()}>
          <h3>Only the owning user can edit an item</h3>
        </Alert>
      )}
      <button onClick={() => { navigate('/items') }}>Return</button>
      <button onClick={() => switchView()} disabled={edit}>Edit Item</button><br />
      <form className="view-form" action={updateItem}>
        <label>Item ID:</label><br />
        <input type="number" disabled={true} name="item_id" defaultValue={item[0].item_id} />
        <br />
        <label>Owning User:</label><br />
        <input type="number" disabled={true} name="user_id" defaultValue={item[0].user} />
        <br />
        <label>Item Name:</label><br />
        <input type="text" disabled={!edit} name="item_name" defaultValue={item[0].item_name} />
        <br />
        <label>Description:</label><br />
        <input type="text" disabled={!edit} name="description" defaultValue={item[0].description} />
        <br />
        <label>Quantity:</label><br />
        <input type="number" disabled={!edit} name="quantity" defaultValue={item[0].quantity} />
        <br />
        <button type="submit" disabled={!edit}>Save</button>
      </form>


    </div>
  )
}

export default ViewItem
