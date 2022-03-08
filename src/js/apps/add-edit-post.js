import AddEditPostController from '../controllers/add-edit-post';
import PostModel from '../models/post';
import AddEditPostView from '../views/add-edit-post';

const addEditPost = new AddEditPostController(new PostModel(), new AddEditPostView());
addEditPost.getDefaultValues();
addEditPost.callViewHandler();
