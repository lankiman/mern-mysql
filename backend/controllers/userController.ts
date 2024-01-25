import { Request, Response } from "express";
import { pool } from "../model/database";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const createToken = (id: string) => {
  return jwt.sign({ id }, process.env.SECRET!, { expiresIn: "3d" });
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw new Error("All Feilds Must be Filled");
    }

    const [result]: any = await pool.query(
      `SELECT password, user_id FROM users WHERE email = ?`,
      [email]
    );

    if (result.length < 1) {
      throw new Error("Incorrect Email");
    }

    const match = await bcrypt.compare(password, result[0].password);

    if (!match) {
      throw new Error(" Incorrect Password");
    }

    const token = createToken(result[0].user_id);

    await pool.query(
      `  UPDATE users
    SET last_logged_in = NOW()
    WHERE email = ?`,
      [email]
    );
    const [user]: any = await pool.query(
      `SELECT user_id, email, last_logged_in FROM users WHERE email=?`,
      [email]
    );
    res.status(200).json({ email, token });

    return user[0];
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message }); // Include the error message in the JSON response
    } else {
      // Fallback response for non-Error instances
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

const signupUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw new Error("All Feilds Must be Filled");
    }

    if (!validator.isEmail(email)) {
      throw new Error("Email is not Valid");
    }

    const [exists]: any = await pool.query(
      "SELECT email FROM users WHERE email=?",
      [email]
    );

    if (exists.length > 0) {
      throw Error("Email already in Use");
    }
    if (!validator.isStrongPassword(password)) {
      throw new Error(" Password not Strong enough");
    }

    const salt = await bcrypt.genSalt(10);

    const hash = await bcrypt.hash(password, salt);
    await pool.execute(
      "INSERT INTO users (email, password, user_id) VALUES (?, ?, UUID())",
      [email, hash]
    );
    const [user]: any = await pool.query(
      "SELECT user_id FROM users WHERE email=?",
      [email]
    );

    const token = createToken(user[0].user_id);
    res.status(200).json({ email, token });
    return user[0].user_id;
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message }); // Include the error message in the JSON response
    } else {
      // Fallback response for non-Error instances
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export { signupUser, loginUser };
