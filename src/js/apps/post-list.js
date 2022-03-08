import PostListController from '../controllers/post-list';
import PostListModel from '../models/post-list';
import PostListView from '../views/post-list';

const posts = new PostListController(new PostListModel(), new PostListView());
posts.getPostList();
posts.callViewHandler();
