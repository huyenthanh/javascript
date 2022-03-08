import AuthController from '../controllers/auth';
import AuthModel from '../models/auth';
import AuthView from '../views/auth';

const auth = new AuthController(new AuthModel(), new AuthView());
auth.callViewHandler();
