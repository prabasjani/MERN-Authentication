import { Router } from "express";
import {
  currentUser,
  deleteUser,
  login,
  logout,
  register,
} from "../controllers/Auth.controller.js";
import { verifyToken } from "../utils/Auth.middleware.js";

const route = Router();

route.post("/register", register);

route.post("/login", login);

// VerifyToken gives permission for verified users only
route.get("/current-user", verifyToken, currentUser);

// VerifyToken gives permission for verified users only
route.delete("/delete-user", verifyToken, deleteUser);

route.post("/logout", logout);

export { route as AuthRoute };
