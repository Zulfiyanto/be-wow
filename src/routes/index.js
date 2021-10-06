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

module.exports = router;
