import AuthController from '../controllers';
import AuthModel from '../models';
import AuthView from '../views';

export const Auth = new AuthController(new AuthModel(), new AuthView());
