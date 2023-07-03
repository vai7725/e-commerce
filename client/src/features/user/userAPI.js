// A mock function to mimic making an async request for data
export function fetchLoggedInUser(userId) {
  return new Promise(async (resolve) => {
    const res = await fetch(`http://localhost:4000/users/${userId}`);
    const data = await res.json();
    resolve({ data });
  });
}

export function fetchLoggedInUserOrders(id) {
  return new Promise(async (resolve) => {
    const res = await fetch(`http://localhost:4000/orders/?user.id=${id}`);
    const data = await res.json();
    resolve({ data });
  });
}

export function updateUser(update) {
  return new Promise(async (resolve) => {
    const res = await fetch(`http://localhost:4000/users/${update.id}`, {
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: { 'content-type': 'application/json' },
    });
    const data = await res.json();
    // TODO: on server it will return only the relevent information
    resolve({ data });
  });
}
