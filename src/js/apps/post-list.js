import PostController from '../controllers/post-list';
import PostModel from '../models/post';
import PostListView from '../views/post-list';

const posts = new PostController(new PostModel(), new PostListView());
posts.getPostList();
