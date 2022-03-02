import PostListController from '../controllers/post-list';
import PostListModel from '../models/post-list';
import PostListView from '../views/post-list';

new PostListController(new PostListModel(), new PostListView());
