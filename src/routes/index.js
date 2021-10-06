//instantiate express module here
const express = require("express");
// Init express router here..
const router = express.Router();
const { Register, Login } = require("../controllers/Auth");
const { AddBook, GetBooks, GetBook, UpdateBook, DeleteBook } = require("../controllers/Book");
const {
  AddTransaction,
  UpdateTransaction,
  GetTransaction,
  GetTransactions,
} = require("../controllers/Transaction");
const { GetUsers, DeleteUsers } = require("../controllers/User");
const { auth } = require("../middlewares/auth");
const { uploadFile } = require("../middlewares/UploadFiles");

// Auth Router
router.post("/register", Register);
router.get("/login", Login);

// User Router
router.get("/users", GetUsers);
router.delete("/user/:id", DeleteUsers);

// Book Router
router.post("/book", auth, uploadFile("book_file"), AddBook);
router.get("/books", GetBooks);
router.get("/book/:id", GetBook);
router.patch("/book/:id", auth, uploadFile("book_file"), UpdateBook);
router.delete("/book/:id", auth, DeleteBook);

module.exports = router;
