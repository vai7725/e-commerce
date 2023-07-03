// A mock function to mimic making an async request for data
export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    // we'll change it.
    const res = await fetch('http://localhost:4000/products');
    const data = await res.json();
    resolve({ data });
  });
}

export function fetchAllProductsByFilters(filter, sort, pagination) {
  // filter = {'category':['smartphone','laptops']}
  // sort = {_sort:'price',_order='desc'}
  // TODO: we'll support mutiple checks for filter on server
  let queryString = '';
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length) {
      const lastCategoryValue = categoryValues[categoryValues.length - 1];
      queryString += `${key}=${lastCategoryValue}&`;
    }
  }

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  return new Promise(async (resolve) => {
    // we'll change it.
    const res = await fetch('http://localhost:4000/products?' + queryString);
    const data = await res.json();
    const totalItems = await res.headers.get('X-Total-Count');
    resolve({ data: { products: data, totalItems: +totalItems } });
  });
}

export function fetchCategories() {
  return new Promise(async (resolve) => {
    // we'll change it.
    const res = await fetch('http://localhost:4000/categories');
    const data = await res.json();
    resolve({ data });
  });
}

export function fetchBrands() {
  return new Promise(async (resolve) => {
    // we'll change it.
    const res = await fetch('http://localhost:4000/brands');
    const data = await res.json();
    resolve({ data });
  });
}

export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    // we'll change it.
    const res = await fetch(`http://localhost:4000/products/${id}`);
    const data = await res.json();
    resolve({ data });
  });
}

export function addProduct(product) {
  return new Promise(async (resolve) => {
    // we'll change it.
    const res = await fetch(`http://localhost:4000/products`, {
      method: 'POST',
      body: JSON.stringify(product),
      headers: { 'content-type': 'application/json' },
    });
    const data = await res.json();
    resolve({ data });
  });
}

export function updateProduct(update) {
  return new Promise(async (resolve) => {
    // we'll change it.
    const res = await fetch(`http://localhost:4000/products/${update.id}`, {
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: { 'content-type': 'application/json' },
    });
    const data = await res.json();
    resolve({ data });
  });
}
