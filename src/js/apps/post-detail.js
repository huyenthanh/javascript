import PostDetailController from '../controllers/post-detail';
import PostDetailModel from '../models/post-detail';
import PostDetailView from '../views/post-detail';

const postDetail = new PostDetailController(new PostDetailModel(), new PostDetailView());
postDetail.getPostValues();
