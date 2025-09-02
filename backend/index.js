const express = require('express');
const cors = require('cors');
const app = express(); await
const port = 3000;
const knex = require('knex')(require('./knexfile.js')['development']);

app.use(cors());
app.use(express.json());

//the following function runs on start, checks for a table named item
//if the item table doesn't exist, it means the database has not been initialized.
//It will then initialize the database by running migrate and seed commands
//Then the server will start on the listed port
(async () => {
  try {
    const table = await knex.schema.hasTable('item');

    if (!table) {
      console.log('Setting up DB');
      await knex.migrate.latest();

      console.log('Seeding initial data');
      await knex.seed.run();
    } else {
      console.log('Database exists')
    }

    console.log('Database ready');

    app.listen(port, () => {
      console.log('Server Ready on port: ', port);
    })
  } catch (err) {
    console.error('Database setup failed: ', err);
  }
})();

//CRUD commands

//Create (POST)
app.post('/user/new', async (req, res) => {
  const data = req.body;
  try {
    await knex('user').insert(data);
    res.status(200).json({ message: 'User saved' })
  } catch (err) {
    console.error('ERROR ', err);
    res.status(500).json({ error: 'Failed to save user' });
  }
})

app.post('/item/new', async (req, res) => {
  const data = req.body;

  try {
    await knex('item').insert(data);
    res.status(200).json({ message: 'Item Saved' });
  } catch (err) {
    console.error('ERROR ', err);
    res.status(500).json({ error: 'Failed to save item' });
  }
})

//Read (GET)

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected to server' })
})

app.get('/item', (req, res) => {
  knex('item')
    .select('*')
    .from('item')
    .then(data => {
      res.status(200).json(data);
    })
})

app.get('/item/:id', (req, res) => {
  knex('item')
    .select('*')
    .from('item')
    .where('item_id', req.params.id)
    .then(data => {
      res.status(200).json(data);
    })
})

app.get('/:user', (req, res) => {
  knex('user')
    .select('*')
    .from('user')
    .where('user_id', req.params.user)
    .then(data => {
      res.status(200).json(data);
    })
})

app.get('/:user/items', (req, res) => {
  const id = req.params.user;
  knex('item')
    .select('*')
    .from('item')
    .where('user', id)
    .then(data => {
      res.status(200).json(data);
    })
})


//Update (PATCH)
app.patch('/item/:itemid/patch', async (req, res) => {
  const id = req.params.itemid;
  const data = req.body;

  try {
    await knex('item').where('item_id', id).update(data);
    res.status(200).json({ message: 'Item saved' });
  } catch (err) {
    console.error('ERROR ', err);
    res.status(500).json({ error: 'Failed to save item' });
  }
})

app.patch('user/:userid/patch', async (req, res) => {
  const id = req.params.userid;
  const data = req.body;

  try {
    await knex('user').where('user_id', id).update(data);
    res.status(200).json({ message: 'User saved' });
  } catch (err) {
    console.error('ERROR ', err);
    res.status(500).json({ error: 'Failed to save user' });
  }
})

//Delete
app.delete('/item/:itemid', async (req, res) => {
  const id = req.params.itemid;

  try {
    await knex('item').where('item_id', id).del();
    console.log('Item deleted');
    res.status(500).json({ message: 'Item deleted' });
  } catch (err) {
    console.error('ERROR ', err);
    res.status(500).json({ error: 'Item failed to delete' });
  }
})

app.delete('/user/:userid', async (req, res) => {
  const id = req.params.userid;

  try {
    await knex('user').where('user_id', id).del();
    console.log('User deleted');
    res.status(500).json({ message: 'User deleted' });
  } catch (err) {
    console.error('ERROR ', err);
    res.status(500).json({ error: 'User failed to delete' });
  }
})

