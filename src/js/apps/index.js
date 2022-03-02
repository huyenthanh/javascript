import PostController from '../controllers/post';
import PostModel from '../models/post';
import PostListView from '../views/post-list';

new PostController(new PostModel(), new PostListView());
