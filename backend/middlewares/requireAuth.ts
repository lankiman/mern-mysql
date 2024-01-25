import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { pool } from "../model/database";

const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  //verfity authentication
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }
  const token = authorization.split(" ")[1];

  try {
    const { id } = jwt.verify(token, process.env.SECRET!) as JwtPayload;

    (req as any).user_id = id;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not Authorized" });
  }
};
export default requireAuth;
