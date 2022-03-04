import PostDetailController from '../controllers/post-detail';
import PostModel from '../models/post';
import PostDetailView from '../views/post-detail';

const postDetail = new PostDetailController(new PostModel(), new PostDetailView());
postDetail.getPostValues();
