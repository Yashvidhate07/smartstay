const express =
  require("express");

const router =
  express.Router();

const bcrypt =
  require("bcryptjs");

const jwt =
  require("jsonwebtoken");

const User =
  require("../models/User");

/* ===================================================
   🚀 SIGNUP
=================================================== */

router.post(
  "/signup",

  async (req, res) => {

    try {

      const {
        name,
        email,
        password,
        phone,
      } = req.body;

      const exists =
        await User.findOne({
          email,
        });

      if (exists) {

        return res.status(400)
          .json({
            message:
              "User already exists",
          });
      }

      const hashed =
        await bcrypt.hash(
          password,
          10
        );

      const user =
        await User.create({

          name,
          email,

          password: hashed,

          phone,
        });

      res.json({
        success: true,
        user,
      });

    } catch (err) {

      res.status(500).json({
        message:
          err.message,
      });
    }
  }
);

/* ===================================================
   🚀 LOGIN
=================================================== */

router.post(
  "/login",

  async (req, res) => {

    try {

      const {
        email,
        password,
      } = req.body;

      const user =
        await User.findOne({
          email,
        });

      if (!user) {

        return res.status(400)
          .json({
            message:
              "User not found",
          });
      }

      const match =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!match) {

        return res.status(400)
          .json({
            message:
              "Invalid password",
          });
      }

      user.lastLogin =
        new Date();

      await user.save();

      const token =
        jwt.sign(

          {
            id: user._id,
          },

          "SECRETKEY"
        );

      res.json({

        success: true,

        token,

        user,
      });

    } catch (err) {

      res.status(500).json({
        message:
          err.message,
      });
    }
  }
);

module.exports =
  router;