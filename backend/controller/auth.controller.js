import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateVerificationToken } from "../utils/generateVerificationToken.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
export const signup = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const userExistsAlready = await User.findOne({ email });
    if (userExistsAlready) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const verificationToken = generateVerificationToken();
    const user = new User({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // is equals to 24 hrs
    });

    await user.save();

    // JWT token generate:-
    generateTokenAndSetCookie(res, user._id);

    res.status(201).json({
      success: true,
      message: {
        user: {
          ...user._doc,
          password: undefined,
        },
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  res.send("SignUp route");
};

export const logout = async (req, res) => {
  res.send("SignUp route");
};
