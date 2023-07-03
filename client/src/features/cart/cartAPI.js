// A mock function to mimic making an async request for data
export function addToCart(item) {
  return new Promise(async (resolve) => {
    const res = await fetch('http://localhost:4000/cart', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: { 'content-type': 'application/json' },
    });
    const data = await res.json();
    resolve({ data });
  });
}

export function fetchCartItemsByUserId(userId) {
  return new Promise(async (resolve) => {
    const res = await fetch(`http://localhost:4000/cart?user=${userId}`);
    const data = await res.json();
    resolve({ data });
  });
}

export function updateCart(update) {
  return new Promise(async (resolve) => {
    const res = await fetch(`http://localhost:4000/cart/${update.id}`, {
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: { 'content-type': 'application/json' },
    });
    const data = await res.json();
    resolve({ data });
  });
}

export function removeItemFromCart(itemId) {
  return new Promise(async (resolve) => {
    const res = await fetch(`http://localhost:4000/cart/${itemId}`, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
    });
    const data = await res.json();
    resolve({ data: { id: itemId } });
  });
}

export function resetCart(userId) {
  return new Promise(async (resolve) => {
    const res = await fetchCartItemsByUserId(userId);
    const items = res.data;
    console.log(items);

    for (let item of items) {
      console.log(item.id);
      await removeItemFromCart(item.id);
    }

    resolve({ status: 'Success' });
  });
}
