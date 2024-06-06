import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcrypt";
import {
  userRegistration,
  userLogin,
  getUserByEmail,
  getUserByEmailWithPassword,
} from "../services/usersServices.js";
import HttpError from "../helpers/HttpError.js";
import User from "../db/models/userModel.js";


export const userSignup = async (req, res, next) => {
  try {
    const {name, email, password } = req.body;
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      throw HttpError(409, "Email in use");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      name,
      email,
      password: hashedPassword,
    };
    const newUser = await userRegistration(user);

    res.status(201).json({
      token: newUser.token,
      user: {
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (er) {
    next(er);
  }
};

export const userSignIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existingUser = await getUserByEmailWithPassword(email);

    if (!existingUser) {
      throw HttpError(401, "Email or password is wrong");
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      throw HttpError(401, "Email or password is wrong");
    }

    const user = await userLogin(existingUser);
    user.password = undefined;
    res.json({
      token: user.token,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (er) {
    next(er);
  }
};

export const userLogout = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      throw HttpError(401, "Not authorized");
    }

    user.token = "";
    await user.save();

    res.status(204).end();
  } catch (er) {
    next(er);
  }
};

export const currentUser = async (req, res) => {
  try {
    const { email, subscription } = req.user;
    res.json({ email, subscription });
  } catch (er) {
    console.error(er);
  }
};