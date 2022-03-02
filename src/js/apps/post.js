import PostController from '../controllers/post';
import PostModel from '../models/post';
import PostListView from '../views/post-list';

const post = new PostController(new PostModel(), new PostListView());
post.getPostList();
