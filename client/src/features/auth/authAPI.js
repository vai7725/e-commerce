// A mock function to mimic making an async request for data
export function createUser(userData) {
  return new Promise(async (resolve) => {
    const res = await fetch('http://localhost:4000/users', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: { 'content-type': 'application/json' },
    });
    const data = await res.json();
    // TODO: on server it will return only the relevent information
    resolve({ data });
  });
}

export function checkUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    const email = loginInfo.email;
    const password = loginInfo.password;
    const res = await fetch(`http://localhost:4000/users?email=${email}`);
    const data = await res.json();

    console.log(data);

    if (data.length) {
      if (password === data[0].password) {
        resolve({ data: data[0] });
      } else {
        reject({ msg: "Password didn't match" });
      }
    } else {
      reject({ msg: 'User not found' });
    }
  });
}

export function signOutUser(userId) {
  return new Promise(async (resolve) => {
    resolve({ data: `${userId} signed out successfully.` });
  });
}
