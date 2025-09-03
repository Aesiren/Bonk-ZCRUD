const backend = 'http://localhost:3000';

//GET functions
export async function getAllItems() {
  return fetch(`${backend}/item`).then((res) => res.json());
}

export async function getUser(userId) {
  return fetch(`${backend}/user/${userId}`).then((res) => res.json());
}

export async function getOneItem(itemId) {
  return fetch(`${backend}/item/${itemId}`).then((res) => res.json());
}

export async function getItemsByUser(userId) {
  return fetch(`${backend}/user/${userId}/items`).then((res) => res.json());
}

export async function checkUserByName(username) {
  let data = await fetch(`${backend}/user/username/${username}`).then((res) => res.json());
  let check = data > 0 ? false : true;
  return check;
}

//LOGIN function
export async function userLogin(username, password) {
  return fetch(`${backend}/login`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      userName: username,
      password: password
    })
  })
    .then((res) => res.json());
}

//POST functions
export async function addItem(data) {
  return fetch(`${backend}/item/new`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      data
    })
  })
    .then((res) => res.json());
}

export async function addUser(data) {
  return fetch(`${backend}/user/new`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      first_name: data.first_name,
      last_name: data.last_name,
      username: data.username,
      password: data.password
    })
  })
    .then((res) => res.json());
}

//DELETE functions
export async function deleteItem(itemId) {
  return fetch(`${backend}/item/${itemId}/delete`, {
    method: "DELETE",
    headers: { "Content-type": "application/json" }
  })
    .then((res) => res.json());
}

//PATCH functions
export async function editItem(itemId, data) {
  return fetch(`${backend}/item/${itemId}/patch`, {
    method: "PATCH",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      data
    })
  })
    .then((res) => res.json());
}

export async function editUser(userId, data) {
  return fetch(`${backend}/user/${userId}/patch`, {
    method: "PATCH",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      first_name: data.first_name,
      last_name: data.last_name,
      username: data.username,
      password: data.password
    })
  })
    .then((res) => res.json());
}