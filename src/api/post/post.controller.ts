import { PostService } from "./post.service";


export class PostController{

    private postService: PostService;

    constructor(private app: any) {
      this.postService = new PostService();
      this.routes();
    }
  
    public routes() {
      this.app.route("/api/v1/posts").get(this.postService.getPosts);
  
      this.app.route("/api/v1/posts").post(this.postService.createPost);
  
      this.app.route("/api/v1/posts/:postId").get(this.postService.getPost);
  
      this.app
        .route("/api/v1/posts/:postId")
        .delete(this.postService.deletePost)
        .put(this.postService.updatePost);
    }
}