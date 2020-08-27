import { PostService } from "./post.service";
import { Router } from "express";
import { AuthController } from "../../middleware/authController";


export class PostController {
  public router: Router;
  private postService: PostService = new PostService();;
  public authController: AuthController = new AuthController();

  constructor() {
    this.router = Router()
    this.routes();
  }

  public routes() {
    this.router.get("",this.authController.authenticateJWT, this.postService.getPosts);
    this.router.post("",this.authController.authenticateJWT, this.postService.createPost);
    this.router.put("",this.authController.authenticateJWT, this.postService.updatePost);
    this.router.get("/:postId",this.authController.authenticateJWT, this.postService.getPostById);
    this.router.delete("/:postId",this.authController.authenticateJWT, this.postService.deletePost);
  }
}