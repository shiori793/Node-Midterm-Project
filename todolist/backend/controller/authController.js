import User from "../model/User.js";
import { hashPassword, comparePassword } from "../util/passwordUtil.js";
import { generateToken } from "../util/jwtUtil.js";

const registerController = (req, res) => {
  try {
    const { username, email, password } = req.body;

    User.findOne({
      $or: [
              { email : email },
              { username: username }
          ]
    }, function(err, foundUser) {
      if(foundUser){
        res.render(
          "error",
          {
            status: 400,
            message: "Username or Email already exists!",
          }
        );
      } else {
        const hashedPassword = hashPassword(password);
        hashedPassword.then((hashedPassword) => {
          const newUser = new User({
            username: username, 
            email: email, 
            password: hashedPassword
          });
    
          newUser.save();    
          res.redirect("/auth/login");
        });
      }
    })
  } catch (error) {
    res.render(
      "error",
      {
        status: 500,
        message: "Internal server error!",
      }
    );
  }
};

const loginController = (req, res) => {
  try {
    const { email, password } = req.body;

    User.findOne({ email : email }, function(err, foundUser) {
      if (!foundUser){
        res.render(
          "error",
          {
            status: 401,
            message: "Invalid email! Not user exists.",
          }
        );
      } else {
        const compareResult = comparePassword(password, foundUser.password);

        compareResult.then((compared) => {
          if (!compared) {
            return res.render(
              "error",
              {
                status: 401,
                message: "Invalid password!",
              }
            );
          }

          const token = generateToken({
            username: foundUser.username,
            email: foundUser.email,
          });

          res.cookie("token", token, { maxAge: process.env.EXPIRES_IN * 1000 })
          res.redirect(`/list/${foundUser.username}`);
        })
      }
    })
  } catch (error) {
    res.render(
      "error",
      {
        status: 500,
        message: "Internal server error!"
      }
    );
  }
};

export { registerController, loginController };
