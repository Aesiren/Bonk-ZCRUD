import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllItems, getItemsByUser, deleteItem } from "../api/api.js";
import { UserContext } from "../context/UserContext";
import ConfirmDialog from "../components/Dialog.jsx";
import Alert from '@mui/material/Alert';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import '../css/ItemView.css'

function ItemView() {
  const [items, setItems] = useState([]);
  const [userItems, setUserItems] = useState([]);
  const { user } = useContext(UserContext);
  const [userView, setUserView] = useState(false);
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [alert, setAlert] = useState(false);

  const PaperSX = {
    elevation: 0,
    backgroundColor: '#0f0f0f',
    backgroundImage: `
      linear-gradient(#222 1px, transparent 1px),
      linear-gradient(90deg, #222 1px, transparent 1px)
    `,
    backgroundSize: '20px 20px',
    borderRadius: 3,
    boxShadow: '0 0 10px #00ff99',
    padding: 3,
    width: .95
  }

  const TableSX = {
    width: 1
  }
  const CellSX = {
    color: '#00ff99',
    fontFamily: 'Orbitron, monospace'
  }

  const RowSX = {
    '&:hover': {
      backgroundColor: '#111',
      color: '#00ff99',
      cursor: 'pointer',
      transition: 'all 0.2s ease-in-out'
    },
    boxShadow: '0 0 10px #00ff99',
    textShadow: '0 0 2px #00ff99, 0 0 5px #00ff99'
  }
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
        <br /><br />
        <div className="itemTable">
          <TableContainer component={Paper}
            sx={PaperSX}
          >
            <Table sx={TableSX}>
              <TableHead>
                <TableRow sx={RowSX}>
                  <TableCell align='center' sx={CellSX}>ID</TableCell>
                  <TableCell align='center' sx={CellSX}>Owner</TableCell>
                  <TableCell align='center' sx={CellSX}>Name</TableCell>
                  <TableCell align='center' sx={CellSX}>Description</TableCell>
                  <TableCell align='center' sx={CellSX}>Quantity</TableCell>
                  <TableCell align='center' sx={CellSX}>Options</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userItems.map((item, key) => {
                  return (

                    <TableRow key={key} sx={RowSX}>

                      <TableCell align='center' sx={CellSX}>{item.item_id}</TableCell>
                      <TableCell align='center' sx={CellSX}>{item.user}</TableCell>
                      <TableCell align='center' sx={CellSX}>{item.item_name}</TableCell>
                      <TableCell align='center' className='truncated' sx={CellSX}>{item.description}</TableCell>
                      <TableCell align='center' sx={CellSX}>{item.quantity}</TableCell>
                      <TableCell align='center' sx={CellSX}>
                        <Link to={`/items/${item.item_id}`}><button>View</button></Link>
                        <button onClick={() => deleteItemClick(item.item_id, item.user)}>Delete</button>
                      </TableCell>
                    </TableRow>

                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>

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
        <br /><br />
        <div className="itemTable">
          <TableContainer component={Paper}
            sx={PaperSX}>
            <Table sx={TableSX}>
              <TableHead>
                <TableRow sx={RowSX}>
                  <TableCell align='center' sx={CellSX}>ID</TableCell>
                  <TableCell align='center' sx={CellSX}>Owner</TableCell>
                  <TableCell align='center' sx={CellSX}>Name</TableCell>
                  <TableCell align='center' sx={CellSX}>Description</TableCell>
                  <TableCell align='center' sx={CellSX}>Quantity</TableCell>
                  <TableCell align='center' sx={CellSX}>Options</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((item, key) => {
                  return (

                    <TableRow key={key} sx={RowSX}>
                      <TableCell align='center' sx={CellSX}>{item.item_id}</TableCell>
                      <TableCell align='center' sx={CellSX}>{item.user}</TableCell>
                      <TableCell align='center' sx={CellSX}>{item.item_name}</TableCell>
                      <TableCell align='center' className='truncated' sx={CellSX}>{item.description}</TableCell>
                      <TableCell align='center' sx={CellSX}>{item.quantity}</TableCell>
                      <TableCell align='center' sx={CellSX}>
                        <Link to={`/items/${item.item_id}`}><button>View</button></Link>
                        <button onClick={() => deleteItemClick(item.item_id, item.user)}>Delete</button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>

        </div>
      </div >
    )
  }

}
export default ItemView
