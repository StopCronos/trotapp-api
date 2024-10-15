import { Router} from "express";
import AccountController from "./accountController";
import { AuthenticationController } from "../auth/controller";
import { AuthMiddleware } from "../middlewares/authMiddleware";

const AuthRoutes = Router();

// User registration
AuthRoutes.post("/user", AccountController.save as any);

const controller = new AuthenticationController();

//route revalidation token
AuthRoutes.post('/revalidate-token', [AuthMiddleware.validateJWT] as any, controller.revalidateToken as any);

export default AuthRoutes;