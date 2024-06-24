const barberModel = require("../model/modelController");
const validator = require("@hapi/joi");

const createuser = async (req, res) => {
  try {
    const passwordRegex = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z0-9!@#$%^&*(),.?":{}|<>]{8,50}$'
    );
    const schema = validator.object({
      email: validator.string().email().min(7).required(),
      Name: validator
        .string()
        .min(3)
        .required()
        .regex(/^[A-Za-z]+(?: [A-Za-z]+)*$/)
        .messages({
          "string.pattern.base": "Name must only contain",
          "string.empty": "Name cannot be empty",
        }),
      password: validator
        .string()
        .required()
        .min(8)
        .max(50)
        .regex(passwordRegex),
      favouriteHC: validator.required().valid("low cut", "skin punk", "afro"),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: error.details[0].message,
        message:
          "Password must contain upper case, lower case, a number and a string",
      });
    }
    const { Name, email, password, favouriteHC } = req.body;
    const data = {
      Name: Name.trim(),
      email,
      password,
      favouriteHC,
    };
    const shop = await barberModel.create(data);
    res.status(201).json({
      message: "User successfully created",
      data: shop,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getAll = async (req, res) => {
  try {
    const getAll = await barberModel.find();
    res.status(200).json({
      message: `below are the customers in the database`,
      data: getAll,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getOne = async (req, res) => {
  try {
    let ID = req.params.ID;
    const getuser = await barberModel.findById(ID);
    res.status(200).json({
      message: `below is the user: ${getuser.Name}`,
      data: getuser,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const emailCheck = await barberModel.findOne({ email });
    if (!emailCheck) {
      return res.status(400).json("invalid Email");
    }
    if (emailCheck.password != password) {
      return res.status(400).json("invalid password");
    } else {
      res.status(200).json({
        message: "login successful",
        data: emailCheck,
      });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = { createuser, getAll, getOne, login };
