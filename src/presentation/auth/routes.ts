import { Router} from "express";
// import bcrypt from "bcryptjs";
import AccountController from "./accountController";

const AuthRoutes = Router();


// User registration
AuthRoutes.post("/user", AccountController.save as any);

export default AuthRoutes;