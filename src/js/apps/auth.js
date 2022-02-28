import AuthController from "../controllers/auth";
import AuthModel from "../models/auth";
import AuthView from "../views/auth";

new AuthController(new AuthModel(), new AuthView());

