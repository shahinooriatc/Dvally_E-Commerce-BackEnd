import bcrypt from "bcryptjs";
let userData = [
  {
    name: "John",
    email: "john@example.com",
    password: bcrypt.hashSync("pass123"),
    isAdmin: true,
  },
  {
    name: "Chon",
    email: "Chon@example.com",
    password: bcrypt.hashSync("pas12345"),
    isAdmin: false,
  },
]
export default userData;
