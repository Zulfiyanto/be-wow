const { user } = require("../../models");

const Joi = require("joi");

// import package here
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.Login = async (req, res) => {
  try {
    const data = req.body;
    const schema = Joi.object({
      email: Joi.string().email().min(9).required(),
      password: Joi.string().min(0).required(),
    });

    const { error } = schema.validate(data);

    if (error) {
      return res.status(400).send({ status: "error", message: error.details[0].message });
    }

    const userExist = await user.findOne({
      where: {
        email: data.email,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    const isValid = await bcrypt.compare(req.body.password, userExist.password);

    if (!isValid) {
      return res.status(401).send({
        stasus: "failed",
        message: "Email and Password dont match",
      });
    }

    // Generate token
    const dataToken = {
      id: userExist.id,
    };
    const token = jwt.sign(dataToken, process.env.SECRET_KEY);

    res.status(200).send({
      status: "success",
      data: {
        user: { email: userExist.email, token },
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({ status: "failed", message: "Server Error" });
  }
};
