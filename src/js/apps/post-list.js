import PostListController from '../controllers/post-list';
import PostModel from '../models/post';
import PostListView from '../views/post-list';

const posts = new PostListController(new PostModel(), new PostListView());
posts.getPostList();
posts.callViewHandler();
