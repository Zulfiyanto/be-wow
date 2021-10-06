const { book } = require("../../models");

const Joi = require("joi");

exports.AddBook = async (req, res) => {
  const data = req.body;
  const schema = Joi.object({
    title: Joi.string().min(1).required(),
    date: Joi.string().required(),
    pages: Joi.number().required(),
    author: Joi.string().min(1).required(),
    isbn: Joi.number().required(),
    about: Joi.string().min(10).required(),
  });

  const { error } = schema.validate(data);

  if (error) {
    return res.status(400).send({ status: "error", message: error.details[0].message });
  }

  console.log(req.file.filename);
  try {
    const books = await book.create({
      ...data,
      book_file: req.file.filename,
    });

    const dataBook = await book.findOne({
      where: {
        id: books.id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "user_id"],
      },
    });

    res.status(200).send({
      status: "success",
      data: {
        book: { ...dataBook.dataValues, book_file: process.env.FILE_PATH + dataBook.book_file },
      },
    });
  } catch (err) {
    console.log(err);
    res.send({ status: "failed", message: "Server Error" });
  }
};

exports.GetBooks = async (req, res) => {
  try {
    let books = await book.findAll({
      attributes: {
        exclude: ["user_id", "createdAt", "updatedAt"],
      },
    });

    books = JSON.parse(JSON.stringify(books));

    books = books.map((item) => {
      return {
        ...item,
        book_file: process.env.FILE_PATH + item.book_file,
      };
    });

    res.send({
      status: "success",
      data: {
        ...books,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.GetBook = async (req, res) => {
  try {
    const { id } = req.params;
    const books = await book.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["user_id", "password", "createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      data: {
        ...books.dataValues,
        book_file: process.env.FILE_PATH + books.book_file,
      },
    });
  } catch (err) {
    console.log(err);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.UpdateBook = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const schema = Joi.object({
    title: Joi.string().min(1),
    date: Joi.string(),
    pages: Joi.number(),
    author: Joi.string().min(1),
    isbn: Joi.number(),
    about: Joi.string().min(10),
  });

  const { error } = schema.validate(data);

  if (error) {
    return res.status(400).send({ status: "error", message: error.details[0].message });
  }
  try {
    const dataBook = {
      ...data,
      book_file: req.file.filename,
    };
    await book.update(dataBook, {
      where: {
        id,
      },
    });

    const books = await book.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "user_id"],
      },
    });

    res.send({
      status: "success",
      data: { ...books.dataValues, book_file: process.env.FILE_PATH + books.book_file },
    });
  } catch (err) {
    console.log(err);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.DeleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    await book.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      data: {
        id,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
