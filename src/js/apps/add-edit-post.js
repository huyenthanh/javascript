import AddEditPostController from '../controllers/add-edit-post';
import AddEditPostModel from '../models/add-edit-post';
import AddEditPostView from '../views/add-edit-post';

const addEditPost = new AddEditPostController(new AddEditPostModel(), new AddEditPostView());
addEditPost.getDefaultValues();
