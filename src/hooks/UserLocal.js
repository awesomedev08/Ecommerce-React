

function UserLocal() {
  let user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  } else {
    return null;
  }
}

export default UserLocal;
