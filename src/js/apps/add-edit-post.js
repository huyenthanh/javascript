import PostController from '../controllers/post';
import PostModel from '../models/post';
import AddEditPostView from '../views/add-edit-post';

const addEditPost =new PostController(new PostModel(), new AddEditPostView());
addEditPost.getDefaultValues();
